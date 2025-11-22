/**
 * Error Handling System
 *
 * Простая система обработки ошибок для обратной совместимости
 */
import { logger } from './logger.js';
/**
 * Создает ошибку приложения с указанным сообщением, кодом и статусом
 *
 * @param message - Текстовое сообщение об ошибке
 * @param code - Код ошибки для идентификации типа (опционально)
 * @param statusCode - HTTP статус код (по умолчанию 500)
 * @returns Объект ошибки с дополнительными полями
 *
 * @example
 * ```typescript
 * const error = createError('Validation failed', 'VALIDATION_ERROR', 400);
 * throw error;
 * ```
 */
export function createError(message, code, statusCode = 500) {
    const error = new Error(message);
    error.code = code;
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
}
/**
 * Обрабатывает неизвестную ошибку и возвращает структурированный ответ
 *
 * @param error - Ошибка любого типа
 * @returns Объект с сообщением об ошибке и HTTP статус кодом
 *
 * @example
 * ```typescript
 * try {
 *   // код
 * } catch (error) {
 *   const { message, statusCode } = handleApiError(error);
 *   res.status(statusCode).json({ error: message });
 * }
 * ```
 */
export function handleApiError(error) {
    if (error instanceof Error) {
        const appError = error;
        return {
            message: appError.message || 'Internal server error',
            statusCode: appError.statusCode || 500,
        };
    }
    return {
        message: 'Internal server error',
        statusCode: 500,
    };
}
export function logError(error, context) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error('Error occurred', {
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
    }, context || 'ErrorHandler');
}
