/**
 * Rate Limiting System - Types
 * 
 * Типы для системы rate limiting
 */

/**
 * Опции rate limiting
 */
export interface RateLimitOptions {
  /** Время окна в миллисекундах */
  windowMs: number;
  /** Максимальное количество запросов */
  maxRequests: number;
}

/**
 * Результат проверки rate limit
 */
export interface RateLimitResult {
  /** Разрешено ли выполнение запроса */
  allowed: boolean;
  /** Оставшееся количество запросов */
  remaining: number;
  /** Время сброса лимита (timestamp) */
  resetTime: number;
  /** Общее количество разрешенных запросов */
  limit?: number;
}

/**
 * Хранилище для rate limiting
 */
export interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

/**
 * Конфигурация Redis для rate limiting (для будущего использования)
 */
export interface RedisRateLimitConfig {
  enabled: boolean;
  host?: string;
  port?: number;
  password?: string;
  db?: number;
}

