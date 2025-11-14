/**
 * Error Handling System - Handlers
 * 
 * Обработчики ошибок для разных контекстов
 */

import type { AppError, ErrorHandlingResult, ErrorContext } from './types';
import { logError, logCriticalError } from './logger';
import { classifyError } from './errors';
import { ENV } from '@/lib/config';

/**
 * Обработка ошибок API
 */
export function handleApiError(error: unknown): ErrorHandlingResult {
  logError(error);

  if (error instanceof Error) {
    const appError = error as AppError;
    
    // Если это наша структурированная ошибка
    if (appError.statusCode && appError.code) {
      const classification = classifyError(appError);
      
      return {
        message: appError.message,
        statusCode: appError.statusCode,
        code: appError.code,
        severity: classification.severity,
        category: classification.category,
        retryable: classification.retryable,
      };
    }

    // Обработка известных типов ошибок по сообщению
    if (error.message.includes('validation') || error.message.includes('валидация')) {
      return {
        message: 'Ошибка валидации данных',
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        severity: 'low',
        category: 'validation',
        retryable: false,
      };
    }

    if (error.message.includes('rate limit') || error.message.includes('лимит')) {
      return {
        message: 'Превышен лимит запросов',
        statusCode: 429,
        code: 'RATE_LIMIT_EXCEEDED',
        severity: 'medium',
        category: 'rate_limit',
        retryable: true,
      };
    }

    if (error.message.includes('not found') || error.message.includes('не найден')) {
      return {
        message: 'Ресурс не найден',
        statusCode: 404,
        code: 'NOT_FOUND',
        severity: 'low',
        category: 'not_found',
        retryable: false,
      };
    }
  }

  // Общая ошибка сервера
  return {
    message:
      ENV.NODE_ENV === 'production'
        ? 'Внутренняя ошибка сервера'
        : error instanceof Error
        ? error.message
        : 'Неизвестная ошибка',
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
    severity: 'high',
    category: 'server_error',
    retryable: true,
  };
}

/**
 * Безопасное форматирование ошибки для клиента
 */
export function formatErrorForClient(error: unknown): string {
  if (error instanceof Error) {
    const appError = error as AppError;
    
    // В production не раскрываем детали критических ошибок
    if (ENV.NODE_ENV === 'production') {
      // Для клиентских ошибок (4xx) показываем сообщение
      if (appError.statusCode && appError.statusCode >= 400 && appError.statusCode < 500) {
        return appError.message;
      }
      
      // Для серверных ошибок (5xx) показываем общее сообщение
      return 'Произошла ошибка. Пожалуйста, попробуйте позже.';
    }
    
    // В dev режиме показываем полную информацию
    return appError.message;
  }

  return 'Произошла неизвестная ошибка';
}

/**
 * Проверка, является ли ошибка ожидаемой (не критической)
 */
export function isExpectedError(error: unknown): boolean {
  if (error instanceof Error) {
    const appError = error as AppError;
    return (
      appError.statusCode !== undefined &&
      appError.statusCode >= 400 &&
      appError.statusCode < 500
    );
  }
  return false;
}

/**
 * Проверка, является ли ошибка критической
 */
export function isCriticalError(error: unknown): boolean {
  if (error instanceof Error) {
    const appError = error as AppError;
    const classification = classifyError(appError);
    return classification.severity === 'critical';
  }
  return false;
}

/**
 * Обработка критической ошибки
 */
export function handleCriticalError(error: unknown, context?: Record<string, unknown>): void {
  // Преобразуем Record<string, unknown> в ErrorContext если context передан
  const errorContext: ErrorContext | undefined = context
    ? {
        metadata: context,
      }
    : undefined;
  
  logCriticalError(error, errorContext);
  
  // Здесь можно добавить отправку уведомлений, алертов и т.д.
  if (ENV.NODE_ENV === 'production') {
    // Отправка алерта администраторам
    // sendAlertToAdmins(error, context);
  }
}

/**
 * Обработка ошибки формы
 */
export function handleFormError(error: unknown): {
  message: string;
  field?: string;
} {
  if (error instanceof Error) {
    const appError = error as AppError;
    
    // Извлекаем информацию о поле из details
    const field = appError.details?.field as string | undefined;
    
    return {
      message: formatErrorForClient(error),
      field,
    };
  }

  return {
    message: 'Произошла ошибка при отправке формы',
  };
}

