/**
 * Validation System - Types
 * 
 * Типы для системы валидации
 */

/**
 * Результат валидации
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Ошибка валидации
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Правило валидации
 */
export interface ValidationRule<T = unknown> {
  validate: (value: T, context?: ValidationContext) => boolean | Promise<boolean>;
  message: string;
  code?: string;
}

/**
 * Контекст валидации
 */
export interface ValidationContext {
  /** Все данные формы */
  formData?: Record<string, unknown>;
  /** Дополнительные параметры */
  params?: Record<string, unknown>;
}

/**
 * Опции валидации
 */
export interface ValidationOptions {
  /** Остановить валидацию при первой ошибке */
  stopOnFirstError?: boolean;
  /** Валидировать только заполненные поля */
  validateOnlyFilled?: boolean;
  /** Дополнительный контекст */
  context?: ValidationContext;
}

/**
 * Async валидатор
 */
export type AsyncValidator<T = unknown> = (
  value: T,
  context?: ValidationContext
) => Promise<boolean | ValidationError>;

/**
 * Sync валидатор
 */
export type SyncValidator<T = unknown> = (
  value: T,
  context?: ValidationContext
) => boolean | ValidationError;

/**
 * Валидатор (может быть sync или async)
 */
export type Validator<T = unknown> = SyncValidator<T> | AsyncValidator<T>;

