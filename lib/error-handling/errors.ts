/**
 * Error Handling System - Error Creation
 * 
 * Функции для создания структурированных ошибок
 */

import type { AppError, ErrorContext, ErrorCategory, ErrorSeverity } from './types';
import { ENV } from '@/lib/config';

/**
 * Создание структурированной ошибки
 */
export function createError(
  message: string,
  code?: string,
  statusCode = 500,
  details?: Record<string, unknown>,
  context?: ErrorContext
): AppError {
  const error = new Error(message) as AppError;
  error.code = code;
  error.statusCode = statusCode;
  error.details = details;
  error.context = context;
  error.timestamp = new Date().toISOString();
  error.id = generateErrorId();

  return error;
}

/**
 * Создание ошибки валидации
 */
export function createValidationError(
  message: string,
  field?: string,
  details?: Record<string, unknown>
): AppError {
  return createError(
    message,
    'VALIDATION_ERROR',
    400,
    {
      field,
      ...details,
    }
  );
}

/**
 * Создание ошибки аутентификации
 */
export function createAuthenticationError(
  message = 'Требуется аутентификация',
  details?: Record<string, unknown>
): AppError {
  return createError(
    message,
    'AUTHENTICATION_ERROR',
    401,
    details
  );
}

/**
 * Создание ошибки авторизации
 */
export function createAuthorizationError(
  message = 'Доступ запрещен',
  details?: Record<string, unknown>
): AppError {
  return createError(
    message,
    'AUTHORIZATION_ERROR',
    403,
    details
  );
}

/**
 * Создание ошибки "не найдено"
 */
export function createNotFoundError(
  resource: string,
  details?: Record<string, unknown>
): AppError {
  return createError(
    `${resource} не найден`,
    'NOT_FOUND',
    404,
    { resource, ...details }
  );
}

/**
 * Создание ошибки rate limit
 */
export function createRateLimitError(
  message = 'Превышен лимит запросов',
  retryAfter?: number,
  details?: Record<string, unknown>
): AppError {
  return createError(
    message,
    'RATE_LIMIT_EXCEEDED',
    429,
    {
      retryAfter,
      ...details,
    }
  );
}

/**
 * Создание ошибки сервера
 */
export function createServerError(
  message = 'Внутренняя ошибка сервера',
  details?: Record<string, unknown>
): AppError {
  return createError(
    message,
    'INTERNAL_SERVER_ERROR',
    500,
    details
  );
}

/**
 * Создание ошибки внешнего сервиса
 */
export function createExternalServiceError(
  service: string,
  message: string,
  details?: Record<string, unknown>
): AppError {
  return createError(
    `Ошибка внешнего сервиса ${service}: ${message}`,
    'EXTERNAL_SERVICE_ERROR',
    502,
    {
      service,
      ...details,
    }
  );
}

/**
 * Генерация уникального ID для ошибки
 */
function generateErrorId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Классификация ошибки по категории и серьезности
 */
export function classifyError(error: AppError): {
  category: ErrorCategory;
  severity: ErrorSeverity;
  retryable: boolean;
} {
  const statusCode = error.statusCode || 500;
  const code = error.code || '';

  // Определяем категорию
  let category: ErrorCategory = 'unknown';
  if (code.includes('VALIDATION')) category = 'validation';
  else if (code.includes('AUTHENTICATION')) category = 'authentication';
  else if (code.includes('AUTHORIZATION')) category = 'authorization';
  else if (code.includes('NOT_FOUND')) category = 'not_found';
  else if (code.includes('RATE_LIMIT')) category = 'rate_limit';
  else if (code.includes('EXTERNAL_SERVICE')) category = 'external_service_error';
  else if (statusCode >= 500) category = 'server_error';
  else if (statusCode === 408 || statusCode === 504) category = 'network_error';

  // Определяем серьезность
  let severity: ErrorSeverity = 'medium';
  if (statusCode >= 500) severity = 'high';
  if (statusCode === 503 || statusCode === 504) severity = 'critical';
  if (statusCode >= 400 && statusCode < 500) severity = 'low';
  if (statusCode === 401 || statusCode === 403) severity = 'medium';

  // Определяем, можно ли повторить запрос
  const retryable = 
    statusCode >= 500 || 
    statusCode === 408 || 
    statusCode === 429 ||
    category === 'network_error' ||
    category === 'external_service_error';

  return { category, severity, retryable };
}

