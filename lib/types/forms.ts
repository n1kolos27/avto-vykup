/**
 * Типы для форм приложения
 */

// Типы для формы оценки
export interface EvaluationFormData {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  condition: 'excellent' | 'good' | 'satisfactory' | 'needs_repair';
  phone: string;
  name?: string;
}

// Типы для контактной формы
export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

// Типы для отзыва
export interface ReviewFormData {
  name: string;
  rating: number;
  text: string;
  carModel?: string;
  phone?: string;
}

// Типы для ошибок валидации форм
export interface FormValidationError {
  field: keyof EvaluationFormData | keyof ContactFormData | keyof ReviewFormData;
  message: string;
}

