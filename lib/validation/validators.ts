/**
 * Validation System - Validators
 *
 * Валидаторы для различных типов данных
 */

import type { ValidationError } from './types';
import { VALIDATION } from '@/lib/config';

/**
 * Валидация телефона (российский формат)
 */
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  const digitsOnly = phone.replace(/\D/g, '');
  return (
    digitsOnly.length >= VALIDATION.PHONE_MIN_LENGTH &&
    digitsOnly.length <= VALIDATION.PHONE_MAX_LENGTH
  );
}

/**
 * Валидация email
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) && email.length <= VALIDATION.EMAIL_MAX_LENGTH;
}

/**
 * Валидация года выпуска
 */
export function validateYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  return (
    Number.isInteger(year) &&
    year >= VALIDATION.YEAR_MIN &&
    year <= currentYear + VALIDATION.YEAR_MAX_OFFSET
  );
}

/**
 * Валидация пробега
 */
export function validateMileage(mileage: number): boolean {
  return (
    Number.isInteger(mileage) &&
    mileage >= VALIDATION.MILEAGE_MIN &&
    mileage <= VALIDATION.MILEAGE_MAX
  );
}

/**
 * Валидация рейтинга
 */
export function validateRating(rating: number): boolean {
  return (
    Number.isInteger(rating) &&
    rating >= VALIDATION.RATING_MIN &&
    rating <= VALIDATION.RATING_MAX
  );
}

/**
 * Валидация текста
 */
export function validateText(
  text: string,
  minLength: number = VALIDATION.TEXT_MIN_LENGTH,
  maxLength: number = VALIDATION.TEXT_MAX_LENGTH
): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }
  const trimmed = text.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

/**
 * Валидация имени
 */
export function validateName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  const trimmed = name.trim();
  return (
    trimmed.length >= VALIDATION.NAME_MIN_LENGTH &&
    trimmed.length <= VALIDATION.NAME_MAX_LENGTH
  );
}

/**
 * Валидация марки автомобиля
 */
export function validateBrand(brand: string): boolean {
  if (!brand || typeof brand !== 'string') {
    return false;
  }
  const trimmed = brand.trim();
  return (
    trimmed.length >= VALIDATION.BRAND_MIN_LENGTH &&
    trimmed.length <= VALIDATION.BRAND_MAX_LENGTH
  );
}

/**
 * Валидация модели автомобиля
 */
export function validateModel(model: string): boolean {
  if (!model || typeof model !== 'string') {
    return false;
  }
  const trimmed = model.trim();
  return (
    trimmed.length >= VALIDATION.MODEL_MIN_LENGTH &&
    trimmed.length <= VALIDATION.MODEL_MAX_LENGTH
  );
}

/**
 * Валидация URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Валидация slug
 */
export function validateSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') {
    return false;
  }
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length >= 1 && slug.length <= 100;
}

/**
 * Валидация состояния автомобиля
 */
export function validateCondition(
  condition: string
): condition is 'excellent' | 'good' | 'satisfactory' | 'needs_repair' {
  const validConditions: readonly string[] = ['excellent', 'good', 'satisfactory', 'needs_repair'];

  // Type guard без использования any - проверяем через includes и явное сравнение типов
  if (validConditions.includes(condition)) {
    // Дополнительная проверка для type narrowing
    return (
      condition === 'excellent' ||
      condition === 'good' ||
      condition === 'satisfactory' ||
      condition === 'needs_repair'
    );
  }

  return false;
}

/**
 * Валидация с возвратом ошибки
 */
export function validatePhoneWithError(phone: string): boolean | ValidationError {
  if (validatePhone(phone)) {
    return true;
  }
  return {
    field: 'phone',
    message: 'Укажите корректный номер телефона',
    code: 'INVALID_PHONE',
  };
}

/**
 * Валидация email с возвратом ошибки
 */
export function validateEmailWithError(email: string): boolean | ValidationError {
  if (validateEmail(email)) {
    return true;
  }
  return {
    field: 'email',
    message: 'Укажите корректный email адрес',
    code: 'INVALID_EMAIL',
  };
}

/**
 * Async валидация (например, проверка уникальности)
 */
export async function validateUnique(
  value: string,
  checkFunction: (value: string) => Promise<boolean>,
  fieldName: string
): Promise<boolean | ValidationError> {
  const isUnique = await checkFunction(value);
  if (isUnique) {
    return true;
  }
  return {
    field: fieldName,
    message: `${fieldName} уже используется`,
    code: 'NOT_UNIQUE',
  };
}
