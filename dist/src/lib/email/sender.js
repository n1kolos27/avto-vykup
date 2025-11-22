/**
 * Email System - Email Sender
 *
 * Отправка email через Resend
 */
import { TIMEOUTS } from '../config/constants.js';
import { ENV } from '../config/env.js';
import { logger } from '../logger.js';
/**
 * Отправка email через Resend API
 */
export async function sendEmail(data) {
    const startTime = Date.now();
    try {
        const emailServiceKey = ENV.EMAIL_SERVICE_API_KEY;
        // Если нет настроенного email сервиса, логируем и возвращаем success в dev
        if (!emailServiceKey) {
            if (ENV.NODE_ENV === 'development') {
                logger.debug('Email service not configured. Email data:', {
                    to: data.to,
                    subject: data.subject,
                    hasHtml: !!data.html,
                    hasText: !!data.text,
                }, 'email');
                return { success: true };
            }
            return {
                success: false,
                error: 'Email service not configured',
            };
        }
        // Отправка с timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.EMAIL_SEND);
        try {
            const response = await fetch(ENV.EMAIL_SERVICE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${emailServiceKey}`,
                    'User-Agent': 'Top1-Vykup-Auto/1.0',
                },
                body: JSON.stringify({
                    from: ENV.EMAIL_FROM,
                    to: data.to,
                    subject: data.subject,
                    html: data.html,
                    text: data.text || data.html?.replace(/<[^>]*>/g, '') || '',
                }),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                const errorText = await response.text().catch(() => response.statusText);
                throw new Error(`Email service error: ${response.status} ${errorText}`);
            }
            const processingTime = Date.now() - startTime;
            logger.info('Email sent successfully', {
                to: data.to,
                subject: data.subject,
                processingTime,
                timestamp: new Date().toISOString(),
            }, 'email');
            return { success: true };
        }
        catch (fetchError) {
            clearTimeout(timeoutId);
            throw fetchError;
        }
    }
    catch (error) {
        const processingTime = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logger.error('Error sending email', {
            error: errorMessage,
            to: data.to,
            processingTime,
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString(),
        }, 'email');
        return {
            success: false,
            error: errorMessage,
        };
    }
}
