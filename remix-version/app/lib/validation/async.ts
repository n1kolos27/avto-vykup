/**
 * Validation System - Async Validators
 * 
 * Асинхронные валидаторы для проверок, требующих внешних запросов
 */

import type { ValidationError, ValidationContext } from './types';

/**
 * Async валидация с задержкой (для демонстрации)
 */
export async function validateAsync(
  value: string,
  validator: (value: string) => Promise<boolean>,
  errorMessage: string,
  fieldName: string
): Promise<boolean | ValidationError> {
  const isValid = await validator(value);
  if (isValid) {
    return true;
  }
  return {
    field: fieldName,
    message: errorMessage,
    code: 'ASYNC_VALIDATION_FAILED',
  };
}

/**
 * Валидация с проверкой на сервере (например, проверка уникальности email)
 */
export async function validateUniqueEmail(
  email: string,
  checkFunction: (email: string) => Promise<boolean>
): Promise<boolean | ValidationError> {
  return validateAsync(
    email,
    checkFunction,
    'Email уже используется',
    'email'
  );
}

/**
 * Валидация с проверкой существования (например, проверка существования записи)
 */
export async function validateExists(
  value: string,
  checkFunction: (value: string) => Promise<boolean>,
  resourceName: string,
  fieldName: string
): Promise<boolean | ValidationError> {
  const exists = await checkFunction(value);
  if (exists) {
    return true;
  }
  return {
    field: fieldName,
    message: `${resourceName} не найден`,
    code: 'NOT_FOUND',
  };
}

/**
 * Комплексная async валидация формы
 */
export async function validateFormAsync<T extends Record<string, unknown>>(
  data: T,
  validators: Record<
    keyof T,
    (value: T[keyof T], context?: ValidationContext) => Promise<boolean | ValidationError>
  >,
  context?: ValidationContext
): Promise<{ isValid: boolean; errors: ValidationError[] }> {
  const errors: ValidationError[] = [];

  for (const [field, value] of Object.entries(data)) {
    const validator = validators[field as keyof T];
    if (validator) {
      const result = await validator(value as T[keyof T], context);
      if (typeof result === 'object' && 'field' in result) {
        errors.push(result);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

