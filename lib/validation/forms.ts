/**
 * Validation System - Form Validators
 *
 * Валидаторы для форм приложения
 * Обеспечивает безопасную валидацию входных данных
 * Соответствует OWASP рекомендациям
 */

import type {
  EvaluationFormData,
  ContactFormData,
  ReviewFormData,
  ValidationResult,
  ValidationError,
} from '@/lib/types';
import { VALIDATION } from '@/lib/config';
import {
  validatePhone,
  validateEmail,
  validateYear,
  validateMileage,
  validateCondition,
  validateRating,
  validateText,
  validateName,
  validateBrand,
  validateModel,
} from './validators';

/**
 * Полная валидация формы оценки
 */
export function validateEvaluationForm(
  data: Partial<EvaluationFormData>
): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.brand || !validateBrand(data.brand)) {
    errors.push({
      field: 'brand',
      message: 'Укажите корректную марку автомобиля',
      code: 'INVALID_BRAND',
    });
  }

  if (!data.model || !validateModel(data.model)) {
    errors.push({
      field: 'model',
      message: 'Укажите корректную модель автомобиля',
      code: 'INVALID_MODEL',
    });
  }

  if (data.year === undefined || !validateYear(data.year)) {
    errors.push({
      field: 'year',
      message: 'Укажите корректный год выпуска (1900 - текущий год)',
      code: 'INVALID_YEAR',
    });
  }

  if (data.mileage === undefined || !validateMileage(data.mileage)) {
    errors.push({
      field: 'mileage',
      message: 'Укажите корректный пробег (0 - 10,000,000 км)',
      code: 'INVALID_MILEAGE',
    });
  }

  if (!data.condition || !validateCondition(data.condition)) {
    errors.push({
      field: 'condition',
      message: 'Выберите состояние автомобиля',
      code: 'INVALID_CONDITION',
    });
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Укажите корректный номер телефона',
      code: 'INVALID_PHONE',
    });
  }

  if (data.name && !validateName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Имя должно содержать от 2 до 100 символов',
      code: 'INVALID_NAME',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Полная валидация контактной формы
 */
export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.name || !validateName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Укажите ваше имя (от 2 до 100 символов)',
      code: 'INVALID_NAME',
    });
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Укажите корректный номер телефона',
      code: 'INVALID_PHONE',
    });
  }

  if (data.email && !validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Укажите корректный email адрес',
      code: 'INVALID_EMAIL',
    });
  }

  if (!data.message || !validateText(data.message, 10, 5000)) {
    errors.push({
      field: 'message',
      message: 'Сообщение должно содержать от 10 до 5000 символов',
      code: 'INVALID_MESSAGE',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Полная валидация формы отзыва
 */
export function validateReviewForm(data: Partial<ReviewFormData>): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.name || !validateName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Укажите ваше имя (от 2 до 100 символов)',
      code: 'INVALID_NAME',
    });
  }

  if (data.rating === undefined || !validateRating(data.rating)) {
    errors.push({
      field: 'rating',
      message: 'Выберите рейтинг от 1 до 5 звезд',
      code: 'INVALID_RATING',
    });
  }

  const maxReviewLength = VALIDATION.REVIEW_TEXT_MAX_LENGTH;
  if (!data.text || !validateText(data.text, VALIDATION.REVIEW_TEXT_MIN_LENGTH, maxReviewLength)) {
    errors.push({
      field: 'text',
      message: `Текст отзыва должен содержать от ${VALIDATION.REVIEW_TEXT_MIN_LENGTH} до ${maxReviewLength} символов`,
      code: 'INVALID_TEXT',
    });
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Укажите корректный номер телефона',
      code: 'INVALID_PHONE',
    });
  }

  if (data.carModel && !validateModel(data.carModel)) {
    errors.push({
      field: 'carModel',
      message: 'Укажите корректную модель автомобиля',
      code: 'INVALID_MODEL',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
