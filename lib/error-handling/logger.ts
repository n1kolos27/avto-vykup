/**
 * Error Handling System - Logger
 *
 * Структурированное логирование ошибок
 */

import type { AppError, ErrorContext, ErrorMonitoringConfig } from './types';
import { ENV } from '@/lib/config';

/**
 * Конфигурация мониторинга ошибок
 */
export const monitoringConfig: ErrorMonitoringConfig = {
  enabled: ENV.NODE_ENV === 'production',
  environment: ENV.NODE_ENV,
  trackOnlyCritical: false,
};

/**
 * Информация об ошибке для логирования
 */
export interface ErrorLogInfo {
  message: string;
  stack?: string;
  code?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
  context?: ErrorContext;
  timestamp: string;
  id?: string;
  severity?: string;
  category?: string;
  retryable?: boolean;
}

/**
 * Логирование ошибки с контекстом
 */
export function logError(
  error: unknown,
  context?: ErrorContext,
  additionalInfo?: Record<string, unknown>
): void {
  const errorInfo = buildErrorLogInfo(error, context, additionalInfo);

  if (ENV.NODE_ENV === 'production') {
    // В production логируем структурированно (JSON)
    console.error('Application error:', JSON.stringify(errorInfo, null, 2));

    // Здесь можно добавить отправку в Sentry или другой мониторинг
    if (monitoringConfig.enabled) {
      sendToMonitoring(errorInfo);
    }
  } else {
    // В dev режиме выводим полную информацию
    console.error('Application error:', errorInfo);
  }
}

/**
 * Построение информации об ошибке для логирования
 */
function buildErrorLogInfo(
  error: unknown,
  context?: ErrorContext,
  additionalInfo?: Record<string, unknown>
): ErrorLogInfo {
  const appError = error as AppError;

  return {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    code: appError?.code,
    statusCode: appError?.statusCode,
    details: appError?.details,
    context: context || appError?.context,
    timestamp: new Date().toISOString(),
    id: appError?.id,
    severity: additionalInfo?.severity as string,
    category: additionalInfo?.category as string,
    retryable: additionalInfo?.retryable as boolean,
    ...additionalInfo,
  };
}

/**
 * Отправка ошибки в систему мониторинга (Sentry-ready)
 */
function sendToMonitoring(_errorInfo: ErrorLogInfo): void {
  // Готовность к интеграции с Sentry
  // if (monitoringConfig.sentryDsn) {
  //   Sentry.captureException(errorInfo);
  // }

  // В будущем здесь будет интеграция с Sentry, LogRocket и т.д.
  // Пока просто логируем структурированно
}

/**
 * Логирование критической ошибки
 */
export function logCriticalError(
  error: unknown,
  context?: ErrorContext
): void {
  const errorInfo = buildErrorLogInfo(error, context, {
    severity: 'critical',
  });

  console.error('CRITICAL ERROR:', JSON.stringify(errorInfo, null, 2));

  if (monitoringConfig.enabled) {
    sendToMonitoring(errorInfo);
  }
}

/**
 * Логирование предупреждения
 */
export function logWarning(
  message: string,
  context?: ErrorContext,
  details?: Record<string, unknown>
): void {
  const warningInfo = {
    level: 'warning',
    message,
    context,
    details,
    timestamp: new Date().toISOString(),
  };

  if (ENV.NODE_ENV === 'production') {
    console.warn('Application warning:', JSON.stringify(warningInfo, null, 2));
  } else {
    console.warn('Application warning:', warningInfo);
  }
}
