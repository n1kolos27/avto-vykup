/**
 * Rate Limiting System - Memory Store
 * 
 * In-memory хранилище для rate limiting
 * В production рекомендуется использовать Redis
 */

import type { RateLimitStore, RateLimitOptions, RateLimitResult } from './types';

/**
 * In-memory хранилище
 */
const store: RateLimitStore = {};

/**
 * Rate limiting с использованием in-memory хранилища
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions = { windowMs: 60000, maxRequests: 10 }
): RateLimitResult {
  const now = Date.now();
  const record = store[identifier];

  // Если записи нет или окно истекло, создаем новую
  if (!record || now > record.resetTime) {
    store[identifier] = {
      count: 1,
      resetTime: now + options.windowMs,
    };
    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      resetTime: now + options.windowMs,
      limit: options.maxRequests,
    };
  }

  // Если лимит превышен
  if (record.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      limit: options.maxRequests,
    };
  }

  // Увеличиваем счетчик
  record.count++;
  return {
    allowed: true,
    remaining: options.maxRequests - record.count,
    resetTime: record.resetTime,
    limit: options.maxRequests,
  };
}

/**
 * Очистка старых записей
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}

/**
 * Получение текущего состояния для идентификатора
 */
export function getRateLimitStatus(identifier: string): RateLimitResult | null {
  const record = store[identifier];
  if (!record) {
    return null;
  }

  const now = Date.now();
  if (now > record.resetTime) {
    return null;
  }

  // Нужно знать лимит, но мы его не храним
  // Возвращаем базовую информацию
  return {
    allowed: true,
    remaining: 0, // Не можем определить без опций
    resetTime: record.resetTime,
  };
}

/**
 * Сброс лимита для идентификатора
 */
export function resetRateLimit(identifier: string): void {
  delete store[identifier];
}

/**
 * Получение всех активных записей (для мониторинга)
 */
export function getAllRateLimitRecords(): Record<string, { count: number; resetTime: number }> {
  return { ...store };
}

