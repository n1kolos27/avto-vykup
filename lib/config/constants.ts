/**
 * Production-ready константы приложения
 * Все константы централизованы здесь
 */

import { ENV } from './env';

// Конфигурация приложения
export const APP_CONFIG = {
  SITE_NAME: 'Выкуп авто',
  DOMAIN: ENV.DOMAIN,
  PHONE_1: ENV.PHONE_1,
  PHONE_2: ENV.PHONE_2,
  EMAIL: ENV.EMAIL,
  BASE_URL: ENV.DOMAIN
    ? `https://${ENV.DOMAIN}`
    : 'http://localhost:3000',
} as const;

// Rate limiting конфигурация
export const RATE_LIMIT = {
  EVALUATION: {
    windowMs: 60000, // 1 минута
    maxRequests: 5,
  },
  CONTACT: {
    windowMs: 60000,
    maxRequests: 3,
  },
  REVIEW: {
    windowMs: 60000,
    maxRequests: 2,
  },
} as const;

// Валидация конфигурация
export const VALIDATION = {
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 11,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  BRAND_MIN_LENGTH: 2,
  BRAND_MAX_LENGTH: 50,
  MODEL_MIN_LENGTH: 1,
  MODEL_MAX_LENGTH: 50,
  YEAR_MIN: 1900,
  YEAR_MAX_OFFSET: 1, // текущий год + 1
  MILEAGE_MIN: 0,
  MILEAGE_MAX: 10000000,
  TEXT_MIN_LENGTH: 10,
  TEXT_MAX_LENGTH: 5000,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 5000,
  REVIEW_TEXT_MIN_LENGTH: 10,
  REVIEW_TEXT_MAX_LENGTH: 2000,
  RATING_MIN: 1,
  RATING_MAX: 5,
  EMAIL_MAX_LENGTH: 254,
} as const;

// Состояния автомобиля
export const CAR_CONDITIONS = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  SATISFACTORY: 'satisfactory',
  NEEDS_REPAIR: 'needs_repair',
} as const;

export const CAR_CONDITION_LABELS: Record<string, string> = {
  [CAR_CONDITIONS.EXCELLENT]: 'Отличное',
  [CAR_CONDITIONS.GOOD]: 'Хорошее',
  [CAR_CONDITIONS.SATISFACTORY]: 'Удовлетворительное',
  [CAR_CONDITIONS.NEEDS_REPAIR]: 'Требует ремонта',
} as const;

// HTTP статусы
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Коды ошибок
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  BAD_REQUEST: 'BAD_REQUEST',
} as const;

// Таймауты
export const TIMEOUTS = {
  API_REQUEST: 30000, // 30 секунд
  EMAIL_SEND: 10000, // 10 секунд
  FETCH: 30000, // 30 секунд
} as const;

// Кэширование
export const CACHE = {
  STATIC_MAX_AGE: 31536000, // 1 год
  HTML_MAX_AGE: 3600, // 1 час
  API_MAX_AGE: 0, // без кэша
} as const;

// Регулярные выражения
export const REGEX = {
  PHONE: /^[\d\s\-\+\(\)]+$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  URL: /^https?:\/\/.+/,
} as const;

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  VALIDATION_FAILED: 'Ошибка валидации данных',
  RATE_LIMIT_EXCEEDED: 'Слишком много запросов. Попробуйте позже.',
  INTERNAL_ERROR: 'Внутренняя ошибка сервера',
  NOT_FOUND: 'Ресурс не найден',
  UNAUTHORIZED: 'Требуется авторизация',
  FORBIDDEN: 'Доступ запрещен',
  TIMEOUT: 'Превышено время ожидания',
  NETWORK_ERROR: 'Ошибка сети. Проверьте подключение к интернету.',
  UNKNOWN_ERROR: 'Произошла неизвестная ошибка',
} as const;

// Сообщения об успехе
export const SUCCESS_MESSAGES = {
  EVALUATION_SENT: 'Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
  CONTACT_SENT: 'Сообщение успешно отправлено. Мы ответим вам в ближайшее время.',
  REVIEW_SENT: 'Отзыв успешно отправлен. Спасибо за ваш отзыв!',
} as const;

