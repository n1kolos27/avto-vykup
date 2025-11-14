/**
 * Error Handling System - Types
 * 
 * Типы для системы обработки ошибок
 */

/**
 * Структурированная ошибка приложения
 */
export interface AppError extends Error {
  /** Код ошибки для идентификации типа */
  code?: string;
  /** HTTP статус код */
  statusCode?: number;
  /** Дополнительные детали ошибки */
  details?: Record<string, unknown>;
  /** Контекст, в котором произошла ошибка */
  context?: ErrorContext;
  /** Время возникновения ошибки */
  timestamp?: string;
  /** Уникальный идентификатор ошибки */
  id?: string;
}

/**
 * Контекст ошибки
 */
export interface ErrorContext {
  /** Идентификатор пользователя (если доступен) */
  userId?: string;
  /** IP адрес клиента */
  ip?: string;
  /** URL, на котором произошла ошибка */
  url?: string;
  /** User Agent */
  userAgent?: string;
  /** Дополнительные метаданные */
  metadata?: Record<string, unknown>;
}

/**
 * Уровень серьезности ошибки
 */
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Категория ошибки
 */
export type ErrorCategory =
  | 'validation'
  | 'authentication'
  | 'authorization'
  | 'not_found'
  | 'rate_limit'
  | 'server_error'
  | 'network_error'
  | 'database_error'
  | 'external_service_error'
  | 'unknown';

/**
 * Классифицированная ошибка
 */
export interface ClassifiedError extends AppError {
  severity: ErrorSeverity;
  category: ErrorCategory;
  retryable: boolean;
}

/**
 * Результат обработки ошибки
 */
export interface ErrorHandlingResult {
  message: string;
  statusCode: number;
  code?: string;
  severity?: ErrorSeverity;
  category?: ErrorCategory;
  retryable?: boolean;
}

/**
 * Конфигурация для мониторинга ошибок
 */
export interface ErrorMonitoringConfig {
  /** Включен ли мониторинг */
  enabled: boolean;
  /** DSN для Sentry (если используется) */
  sentryDsn?: string;
  /** Окружение (development, production) */
  environment: string;
  /** Версия приложения */
  release?: string;
  /** Отслеживать ли только критические ошибки */
  trackOnlyCritical?: boolean;
}

