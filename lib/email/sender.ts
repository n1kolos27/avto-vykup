/**
 * Email System - Email Sender
 *
 * Отправка email через различные сервисы
 */

import type { EmailData, EmailResult } from '@/lib/types';
import { TIMEOUTS, ENV } from '@/lib/config';

/**
 * Отправка email
 */
export async function sendEmail(data: EmailData): Promise<EmailResult> {
  const startTime = Date.now();

  try {
    const emailService = ENV.EMAIL_SERVICE_URL;
    const emailServiceKey = ENV.EMAIL_SERVICE_API_KEY;

    // Если нет настроенного email сервиса, логируем и возвращаем success в dev
    if (!emailServiceKey) {
      if (ENV.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Email service not configured. Email data:', {
          to: data.to,
          subject: data.subject,
          hasHtml: !!data.html,
          hasText: !!data.text,
        });
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
      const response = await fetch(emailService, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Top1-Vykup-Auto/1.0',
        },
        body: JSON.stringify({
          service_id: ENV.EMAIL_SERVICE_ID,
          template_id: ENV.EMAIL_TEMPLATE_ID,
          user_id: emailServiceKey,
          template_params: {
            to_email: data.to,
            subject: data.subject,
            message: data.html,
            text_message: data.text || data.html?.replace(/<[^>]*>/g, '') || '',
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Email service error: ${response.status} ${errorText}`);
      }

      const processingTime = Date.now() - startTime;

      if (ENV.NODE_ENV === 'production') {
        // eslint-disable-next-line no-console
        console.log('Email sent successfully', {
          to: data.to,
          subject: data.subject,
          processingTime,
          timestamp: new Date().toISOString(),
        });
      }

      return { success: true };
    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }
  } catch (error) {
    const processingTime = Date.now() - startTime;

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    console.error('Error sending email:', {
      error: errorMessage,
      to: data.to,
      processingTime,
      timestamp: new Date().toISOString(),
    });

    return {
      success: false,
      error: errorMessage,
    };
  }
}
