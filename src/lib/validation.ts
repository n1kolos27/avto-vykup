import { VALIDATION, REGEX } from './config/constants.js';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface EvaluationFormData {
  name: string;
  phone: string;
  brand: string;
  model?: string;
  year?: number;
  mileage?: number;
  condition?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export interface ReviewFormData {
  name: string;
  rating: number;
  text: string;
  carModel?: string;
}

/**
 * Валидация формы оценки автомобиля
 * 
 * @param data - Данные формы оценки
 * @returns Результат валидации с флагом isValid и объектом errors
 * 
 * @example
 * ```typescript
 * const result = validateEvaluationForm({
 *   name: 'Иван',
 *   phone: '+79991234567',
 *   brand: 'Toyota'
 * });
 * if (!result.isValid) {
 *   console.log(result.errors);
 * }
 * ```
 */
export function validateEvaluationForm(data: EvaluationFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.length < VALIDATION.NAME_MIN_LENGTH) {
    errors.name = `Имя должно содержать минимум ${VALIDATION.NAME_MIN_LENGTH} символа`;
  }

  if (!data.phone || !REGEX.PHONE.test(data.phone)) {
    errors.phone = 'Введите корректный номер телефона';
  }

  if (!data.brand || data.brand.length < VALIDATION.BRAND_MIN_LENGTH) {
    errors.brand = 'Введите марку автомобиля';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Валидация формы обратной связи
 * 
 * @param data - Данные формы обратной связи
 * @returns Результат валидации с флагом isValid и объектом errors
 * 
 * @example
 * ```typescript
 * const result = validateContactForm({
 *   name: 'Иван',
 *   phone: '+79991234567',
 *   message: 'Ваше сообщение'
 * });
 * if (!result.isValid) {
 *   console.log(result.errors);
 * }
 * ```
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.length < VALIDATION.NAME_MIN_LENGTH) {
    errors.name = `Имя должно содержать минимум ${VALIDATION.NAME_MIN_LENGTH} символа`;
  }

  if (!data.phone || !REGEX.PHONE.test(data.phone)) {
    errors.phone = 'Введите корректный номер телефона';
  }

  if (data.email && !REGEX.EMAIL.test(data.email)) {
    errors.email = 'Введите корректный email';
  }

  if (!data.message || data.message.length < VALIDATION.MESSAGE_MIN_LENGTH) {
    errors.message = `Сообщение должно содержать минимум ${VALIDATION.MESSAGE_MIN_LENGTH} символов`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Валидация формы отзыва
 * 
 * @param data - Данные формы отзыва
 * @returns Результат валидации с флагом isValid и объектом errors
 * 
 * @example
 * ```typescript
 * const result = validateReviewForm({
 *   name: 'Иван',
 *   rating: 5,
 *   text: 'Отличный сервис!'
 * });
 * if (!result.isValid) {
 *   console.log(result.errors);
 * }
 * ```
 */
export function validateReviewForm(data: ReviewFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.length < VALIDATION.NAME_MIN_LENGTH) {
    errors.name = `Имя должно содержать минимум ${VALIDATION.NAME_MIN_LENGTH} символа`;
  }

  if (!data.rating || data.rating < VALIDATION.RATING_MIN || data.rating > VALIDATION.RATING_MAX) {
    errors.rating = 'Оценка должна быть от 1 до 5';
  }

  if (!data.text || data.text.length < VALIDATION.REVIEW_TEXT_MIN_LENGTH) {
    errors.text = `Текст отзыва должен содержать минимум ${VALIDATION.REVIEW_TEXT_MIN_LENGTH} символов`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
