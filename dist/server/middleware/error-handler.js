import { handleApiError, createError } from '../../src/lib/error-handler.js';
import { logger } from '../../src/lib/logger.js';
import { ENV } from '../../src/lib/config/env.js';
import { ERROR_CODES, HTTP_STATUS } from '../../src/lib/config/constants.js';
import { getRequestId } from './request-id.js';
// Реэкспорт createError для использования в роутах
export { createError };
/**
 * Express error handling middleware
 * Централизованная обработка ошибок для всех API routes
 */
export function errorHandler(error, req, res, next) {
    // Если ответ уже отправлен, передаем ошибку стандартному Express обработчику
    if (res.headersSent) {
        next(error);
        return;
    }
    // Обрабатываем ошибку через централизованную систему
    const { message, statusCode } = handleApiError(error);
    const appError = error;
    // Логируем ошибку с контекстом
    const requestId = getRequestId(req);
    const logContext = {
        method: req.method,
        path: req.path,
        ip: req.ip || req.socket.remoteAddress,
        statusCode,
        errorCode: appError.code,
        requestId,
        timestamp: new Date().toISOString(),
    };
    if (statusCode >= 500) {
        logger.error('API Error', {
            ...logContext,
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
    }
    else {
        logger.warn('API Client Error', {
            ...logContext,
            error: message,
        });
    }
    // Формируем ответ
    const response = {
        success: false,
        error: message,
    };
    // Добавляем код ошибки, если есть
    if (appError.code) {
        response.code = appError.code;
    }
    // Добавляем детали ошибок валидации
    if (statusCode === HTTP_STATUS.BAD_REQUEST && appError.code === ERROR_CODES.VALIDATION_ERROR) {
        // Если ошибка содержит детали валидации, добавляем их
        if (error && typeof error === 'object' && 'errors' in error) {
            response.errors = error.errors;
        }
    }
    // В production режиме скрываем детали внутренних ошибок
    const finalMessage = statusCode >= 500 && ENV.NODE_ENV === 'production'
        ? 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
        : message;
    res.status(statusCode).json({
        ...response,
        error: finalMessage,
    });
}
/**
 * Middleware для обработки 404 ошибок
 */
export function notFoundHandler(req, res, next) {
    const error = createError(`Route ${req.method} ${req.path} not found`, ERROR_CODES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    next(error);
}
/**
 * Wrapper для async route handlers
 * Автоматически обрабатывает ошибки в async функциях
 */
export function asyncHandler(fn) {
    return (req, res, next) => {
        // Параметры используются в fn(req, res, next)
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
