import { z } from 'zod';
import { VALIDATION, REGEX } from '../config/constants.js';

/**
 * Zod схемы для валидации форм
 * Используются для runtime валидации и генерации TypeScript типов
 */

export const evaluationFormSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Имя должно содержать минимум ${VALIDATION.NAME_MIN_LENGTH} символа`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Имя не должно превышать ${VALIDATION.NAME_MAX_LENGTH} символов`),
  phone: z
    .string()
    .regex(REGEX.PHONE, 'Введите корректный номер телефона')
    .min(VALIDATION.PHONE_MIN_LENGTH, `Телефон должен содержать минимум ${VALIDATION.PHONE_MIN_LENGTH} символов`)
    .max(VALIDATION.PHONE_MAX_LENGTH, `Телефон не должен превышать ${VALIDATION.PHONE_MAX_LENGTH} символов`),
  brand: z
    .string()
    .min(VALIDATION.BRAND_MIN_LENGTH, 'Введите марку автомобиля')
    .max(VALIDATION.BRAND_MAX_LENGTH, `Марка не должна превышать ${VALIDATION.BRAND_MAX_LENGTH} символов`),
  model: z.string().max(VALIDATION.MODEL_MAX_LENGTH).optional(),
  year: z
    .number()
    .int()
    .min(VALIDATION.YEAR_MIN, `Год должен быть не ранее ${VALIDATION.YEAR_MIN}`)
    .max(new Date().getFullYear() + VALIDATION.YEAR_MAX_OFFSET, 'Год не может быть в будущем')
    .optional(),
  mileage: z
    .number()
    .int()
    .min(VALIDATION.MILEAGE_MIN, 'Пробег не может быть отрицательным')
    .max(VALIDATION.MILEAGE_MAX, `Пробег не должен превышать ${VALIDATION.MILEAGE_MAX}`)
    .optional(),
  condition: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Имя должно содержать минимум ${VALIDATION.NAME_MIN_LENGTH} символа`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Имя не должно превышать ${VALIDATION.NAME_MAX_LENGTH} символов`),
  phone: z
    .string()
    .regex(REGEX.PHONE, 'Введите корректный номер телефона')
    .min(VALIDATION.PHONE_MIN_LENGTH, `Телефон должен содержать минимум ${VALIDATION.PHONE_MIN_LENGTH} символов`)
    .max(VALIDATION.PHONE_MAX_LENGTH, `Телефон не должен превышать ${VALIDATION.PHONE_MAX_LENGTH} символов`),
  email: z
    .string()
    .regex(REGEX.EMAIL, 'Введите корректный email')
    .max(VALIDATION.EMAIL_MAX_LENGTH, `Email не должен превышать ${VALIDATION.EMAIL_MAX_LENGTH} символов`)
    .optional(),
  message: z
    .string()
    .min(VALIDATION.MESSAGE_MIN_LENGTH, `Сообщение должно содержать минимум ${VALIDATION.MESSAGE_MIN_LENGTH} символов`)
    .max(VALIDATION.MESSAGE_MAX_LENGTH, `Сообщение не должно превышать ${VALIDATION.MESSAGE_MAX_LENGTH} символов`),
});

export const reviewFormSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Имя должно содержать минимум ${VALIDATION.NAME_MIN_LENGTH} символа`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Имя не должно превышать ${VALIDATION.NAME_MAX_LENGTH} символов`),
  rating: z
    .number()
    .int()
    .min(VALIDATION.RATING_MIN, `Оценка должна быть не менее ${VALIDATION.RATING_MIN}`)
    .max(VALIDATION.RATING_MAX, `Оценка должна быть не более ${VALIDATION.RATING_MAX}`),
  text: z
    .string()
    .min(VALIDATION.REVIEW_TEXT_MIN_LENGTH, `Текст отзыва должен содержать минимум ${VALIDATION.REVIEW_TEXT_MIN_LENGTH} символов`)
    .max(VALIDATION.REVIEW_TEXT_MAX_LENGTH, `Текст отзыва не должен превышать ${VALIDATION.REVIEW_TEXT_MAX_LENGTH} символов`),
  carModel: z.string().max(100).optional(),
  phone: z.string().regex(REGEX.PHONE).optional(),
});

// Экспорт TypeScript типов из zod схем
export type EvaluationFormSchema = z.infer<typeof evaluationFormSchema>;
export type ContactFormSchema = z.infer<typeof contactFormSchema>;
export type ReviewFormSchema = z.infer<typeof reviewFormSchema>;

