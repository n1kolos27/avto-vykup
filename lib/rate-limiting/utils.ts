/**
 * Rate Limiting System - Utilities
 * 
 * Утилиты для работы с rate limiting
 */

import type { NextRequest } from 'next/server';

/**
 * Получение IP адреса из запроса
 */
export function getClientIP(request: NextRequest | { headers: Headers }): string {
  const headers = 'headers' in request ? request.headers : (request as NextRequest).headers;
  
  // Пробуем получить IP из заголовков
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Пробуем получить из NextRequest
  if ('ip' in request && request.ip) {
    return request.ip;
  }

  // Fallback
  return 'unknown';
}

/**
 * Создание идентификатора для rate limiting
 */
export function createRateLimitIdentifier(
  prefix: string,
  identifier: string
): string {
  return `${prefix}:${identifier}`;
}

/**
 * Форматирование времени до сброса лимита
 */
export function formatResetTime(resetTime: number): string {
  const seconds = Math.ceil((resetTime - Date.now()) / 1000);
  if (seconds <= 0) {
    return 'now';
  }
  if (seconds < 60) {
    return `${seconds} секунд`;
  }
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} минут`;
}

