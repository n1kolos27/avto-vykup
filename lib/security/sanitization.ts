/**
 * Security System - Sanitization
 * 
 * Функции санитизации входных данных для защиты от XSS и других атак
 */

import type { SanitizeOptions, SanitizeResult } from './types';
import { VALIDATION } from '@/lib/config';

/**
 * Санитизация строки
 */
export function sanitizeString(
  input: string,
  options: SanitizeOptions = {}
): SanitizeResult<string> {
  if (typeof input !== 'string') {
    return { value: '', sanitized: true };
  }

  const {
    maxLength = 1000,
    allowHtml = false,
    strict = true,
  } = options;

  let sanitized = input.trim();
  const removed: string[] = [];

  // Удаляем потенциально опасные символы
  if (strict) {
    const before = sanitized;
    sanitized = sanitized
      .replace(/[<>]/g, '') // Удаляем < и >
      .replace(/javascript:/gi, '') // Удаляем javascript:
      .replace(/on\w+=/gi, ''); // Удаляем обработчики событий
    
    if (before !== sanitized) {
      removed.push('dangerous_characters');
    }
  }

  // Удаляем HTML теги, если не разрешены
  if (!allowHtml) {
    const before = sanitized;
    sanitized = sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<[^>]+>/g, '');
    
    if (before !== sanitized) {
      removed.push('html_tags');
    }
  }

  // Ограничиваем длину
  if (sanitized.length > maxLength) {
    removed.push('truncated');
    sanitized = sanitized.slice(0, maxLength);
  }

  return {
    value: sanitized,
    sanitized: removed.length > 0,
    removed: removed.length > 0 ? removed : undefined,
  };
}

/**
 * Санитизация телефона
 */
export function sanitizePhone(phone: string): SanitizeResult<string> {
  if (typeof phone !== 'string') {
    return { value: '', sanitized: true };
  }

  const before = phone;
  const sanitized = phone.replace(/[^\d\s\-\+\(\)]/g, '').trim();

  return {
    value: sanitized,
    sanitized: before !== sanitized,
    removed: before !== sanitized ? ['non_phone_characters'] : undefined,
  };
}

/**
 * Санитизация email
 */
export function sanitizeEmail(email: string): SanitizeResult<string> {
  if (typeof email !== 'string') {
    return { value: '', sanitized: true };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitized = email.trim().toLowerCase();

  if (!emailRegex.test(sanitized)) {
    return {
      value: '',
      sanitized: true,
      removed: ['invalid_email'],
    };
  }

  const value = sanitized.slice(0, VALIDATION.EMAIL_MAX_LENGTH);

  return {
    value,
    sanitized: email !== value,
    removed: email !== value ? ['truncated'] : undefined,
  };
}

/**
 * Санитизация числа
 */
export function sanitizeNumber(
  input: number | string,
  options: SanitizeOptions = {}
): SanitizeResult<number> {
  const { min = 0, max = Number.MAX_SAFE_INTEGER } = options;
  const num = typeof input === 'string' ? parseFloat(input) : input;

  if (isNaN(num)) {
    return {
      value: min,
      sanitized: true,
      removed: ['invalid_number'],
    };
  }

  const sanitized = Math.max(min, Math.min(max, Math.floor(num)));

  return {
    value: sanitized,
    sanitized: num !== sanitized,
    removed: num !== sanitized ? ['out_of_range'] : undefined,
  };
}

/**
 * Санитизация текста (более мягкая)
 */
export function sanitizeText(
  input: string,
  options: SanitizeOptions = {}
): SanitizeResult<string> {
  if (typeof input !== 'string') {
    return { value: '', sanitized: true };
  }

  const { maxLength = VALIDATION.TEXT_MAX_LENGTH } = options;

  let sanitized = input.trim();
  const removed: string[] = [];

  // Удаляем только опасные теги
  const before = sanitized;
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  if (before !== sanitized) {
    removed.push('dangerous_tags');
  }

  // Ограничиваем длину
  if (sanitized.length > maxLength) {
    removed.push('truncated');
    sanitized = sanitized.slice(0, maxLength);
  }

  return {
    value: sanitized,
    sanitized: removed.length > 0,
    removed: removed.length > 0 ? removed : undefined,
  };
}

/**
 * Санитизация URL
 */
export function sanitizeUrl(url: string): SanitizeResult<string> {
  if (typeof url !== 'string') {
    return { value: '', sanitized: true };
  }

  try {
    const parsed = new URL(url);
    
    // Разрешаем только http и https
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return {
        value: '',
        sanitized: true,
        removed: ['unsafe_protocol'],
      };
    }

    return {
      value: parsed.toString(),
      sanitized: false,
    };
  } catch {
    return {
      value: '',
      sanitized: true,
      removed: ['invalid_url'],
    };
  }
}

/**
 * Санитизация объекта
 */
export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T,
  sanitizers: Partial<Record<keyof T, (value: unknown) => SanitizeResult>>
): T {
  const sanitized = { ...obj };

  for (const [key, value] of Object.entries(obj)) {
    const sanitizer = sanitizers[key as keyof T];
    if (sanitizer) {
      const result = sanitizer(value);
      sanitized[key as keyof T] = result.value as T[keyof T];
    }
  }

  return sanitized;
}

