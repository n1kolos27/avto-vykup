import { Request, Response, Router } from 'express';
import { applyRateLimiting } from '../../src/lib/rateLimit.js';
import { sanitizeInput } from '../../src/lib/sanitize.js';
import { validateEvaluationForm, validateContactForm, validateReviewForm } from '../../src/lib/validation.js';
import { sendEmail } from '../../src/lib/email/sender.js';
import { formatEvaluationEmail, formatContactEmail, formatReviewEmail } from '../../src/lib/email/templates.js';
import { RATE_LIMIT, APP_CONFIG, ENV } from '../../src/lib/config/index.js';
import { asyncHandler, createError } from '../middleware/error-handler.js';
import { logger } from '../../src/lib/logger.js';
import { ERROR_CODES, HTTP_STATUS, SUCCESS_MESSAGES } from '../../src/lib/config/constants.js';
import type { EvaluationRequest, ContactRequest, ReviewRequest } from '../../src/lib/types/api.js';

const router = Router();

/**
 * Получение IP адреса клиента
 */
function getClientIP(req: Request): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    'unknown'
  );
}

// API: Оценка автомобиля
router.post(
  '/evaluation',
  applyRateLimiting(RATE_LIMIT.EVALUATION),
  asyncHandler(async (req: Request, res: Response) => {
    const startTime = Date.now();
    const clientIP = getClientIP(req);
    const body = req.body as EvaluationRequest;

    const sanitized = sanitizeInput(body) as unknown as EvaluationRequest;
    const validation = validateEvaluationForm(sanitized);

    if (!validation.isValid) {
      const error = createError(
        Object.values(validation.errors)[0] || 'Ошибка валидации данных',
        ERROR_CODES.VALIDATION_ERROR,
        HTTP_STATUS.BAD_REQUEST
      );
      (error as { errors?: Record<string, string> }).errors = validation.errors;
      throw error;
    }

    // Формируем email
    const emailData = formatEvaluationEmail({
      name: sanitized.name,
      phone: sanitized.phone,
      brand: sanitized.brand,
      model: sanitized.model || 'Не указано',
      year: sanitized.year || new Date().getFullYear(),
      mileage: sanitized.mileage || 0,
      condition: (sanitized.condition as 'excellent' | 'good' | 'satisfactory' | 'needs_repair') || 'satisfactory',
    });

    // Отправляем email
    const recipientEmail = APP_CONFIG.EMAIL;
    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    // Логирование для мониторинга
    const processingTime = Date.now() - startTime;
    logger.info('Evaluation request processed', {
      ip: clientIP,
      processingTime,
      success: emailResult.success,
      brand: sanitized.brand,
    }, 'API');

    // Записываем бизнес-метрику
    const { businessMetrics } = await import('../../src/lib/monitoring/business-metrics.js');
    businessMetrics.trackEvaluationCompleted({
      processingTime,
      brand: sanitized.brand,
    });

    if (!emailResult.success) {
      logger.error('Failed to send email', {
        error: emailResult.error,
        ip: clientIP,
      });

      // В production режиме возвращаем ошибку
      if (ENV.NODE_ENV === 'production') {
        throw createError(
          'Ошибка при отправке заявки. Попробуйте позже или свяжитесь с нами по телефону.',
          ERROR_CODES.INTERNAL_SERVER_ERROR,
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
      }

      // В dev режиме логируем, но возвращаем success
      logger.warn('Email service not configured, but returning success in dev mode');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.EVALUATION_SENT,
    });
  })
);

// API: Контакты
router.post(
  '/contact',
  applyRateLimiting(RATE_LIMIT.CONTACT),
  asyncHandler(async (req: Request, res: Response) => {
    const startTime = Date.now();
    const clientIP = getClientIP(req);
    const body = req.body as ContactRequest;

    const sanitized = sanitizeInput(body) as unknown as ContactRequest;
    const validation = validateContactForm(sanitized);

    if (!validation.isValid) {
      const error = createError(
        Object.values(validation.errors)[0] || 'Ошибка валидации данных',
        ERROR_CODES.VALIDATION_ERROR,
        HTTP_STATUS.BAD_REQUEST
      );
      (error as { errors?: Record<string, string> }).errors = validation.errors;
      throw error;
    }

    // Проверка минимальной длины сообщения
    if (!sanitized.message || sanitized.message.length < 10) {
      throw createError(
        'Сообщение слишком короткое (минимум 10 символов)',
        ERROR_CODES.VALIDATION_ERROR,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Формируем email
    const emailData = formatContactEmail({
      name: sanitized.name,
      phone: sanitized.phone,
      email: sanitized.email,
      message: sanitized.message,
    });

    // Отправляем email
    const recipientEmail = APP_CONFIG.EMAIL;
    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    // Логирование для мониторинга
    const processingTime = Date.now() - startTime;
    logger.info('Contact request processed', {
      ip: clientIP,
      processingTime,
      success: emailResult.success,
    });

    if (!emailResult.success) {
      logger.error('Failed to send email', {
        error: emailResult.error,
        ip: clientIP,
      });

      // В production режиме возвращаем ошибку
      if (ENV.NODE_ENV === 'production') {
        throw createError(
          'Ошибка при отправке сообщения. Попробуйте позже или свяжитесь с нами по телефону.',
          ERROR_CODES.INTERNAL_SERVER_ERROR,
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
      }

      // В dev режиме логируем, но возвращаем success
      logger.warn('Email service not configured, but returning success in dev mode');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.CONTACT_SENT,
    });
  })
);

// API: Отзыв
router.post(
  '/review',
  applyRateLimiting(RATE_LIMIT.REVIEW),
  asyncHandler(async (req: Request, res: Response) => {
    const startTime = Date.now();
    const clientIP = getClientIP(req);
    const body = req.body as ReviewRequest;

    const sanitized = sanitizeInput(body) as unknown as ReviewRequest;
    const validation = validateReviewForm(sanitized);

    if (!validation.isValid) {
      const error = createError(
        Object.values(validation.errors)[0] || 'Ошибка валидации данных',
        ERROR_CODES.VALIDATION_ERROR,
        HTTP_STATUS.BAD_REQUEST
      );
      (error as { errors?: Record<string, string> }).errors = validation.errors;
      throw error;
    }

    // Проверка минимальной длины отзыва
    if (!sanitized.text || sanitized.text.length < 10) {
      throw createError(
        'Отзыв слишком короткий (минимум 10 символов)',
        ERROR_CODES.VALIDATION_ERROR,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Формируем email
    const emailData = formatReviewEmail({
      name: sanitized.name,
      rating: sanitized.rating,
      text: sanitized.text,
      carModel: sanitized.carModel,
      phone: sanitized.phone,
    });

    // Отправляем email (опционально, для модерации)
    const recipientEmail = APP_CONFIG.EMAIL;
    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    // Логирование для мониторинга
    const processingTime = Date.now() - startTime;
    logger.info('Review request processed', {
      ip: clientIP,
      processingTime,
      success: emailResult.success,
      rating: sanitized.rating,
    });

    if (!emailResult.success) {
      logger.error('Failed to send email', {
        error: emailResult.error,
        ip: clientIP,
      });

      // В production режиме возвращаем ошибку
      if (ENV.NODE_ENV === 'production') {
        throw createError(
          'Ошибка при отправке отзыва. Попробуйте позже или свяжитесь с нами по телефону.',
          ERROR_CODES.INTERNAL_SERVER_ERROR,
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
      }

      // В dev режиме логируем, но возвращаем success
      logger.warn('Email service not configured, but returning success in dev mode');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.REVIEW_SENT,
    });
  })
);

export default router;
