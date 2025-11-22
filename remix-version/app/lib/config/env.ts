/**
 * Обработка переменных окружения
 * Единая точка доступа ко всем переменным окружения
 */

/**
 * Получение переменной окружения с значением по умолчанию
 */
function getEnv(key: string, defaultValue: string): string {
  if (typeof window !== 'undefined') {
    // Клиентская сторона - используем NEXT_PUBLIC_ префикс
    return process.env[`NEXT_PUBLIC_${key}`] || defaultValue;
  }
  // Серверная сторона
  return process.env[`NEXT_PUBLIC_${key}`] || process.env[key] || defaultValue;
}

/**
 * Переменные окружения приложения
 */
export const ENV = {
  // Контакты
  PHONE_1: getEnv('PHONE_1', '89857520001'),
  PHONE_2: getEnv('PHONE_2', '89164980001'),
  EMAIL: getEnv('EMAIL', 'info@mos-avto-alyans.ru'),
  DOMAIN: getEnv('DOMAIN', 'mos-avto-alyans.ru'),

  // Email сервис (опционально)
  EMAIL_SERVICE_URL: getEnv('EMAIL_SERVICE_URL', 'https://api.emailjs.com/api/v1.0/email/send'),
  EMAIL_SERVICE_API_KEY: getEnv('EMAIL_SERVICE_API_KEY', ''),
  EMAIL_SERVICE_ID: getEnv('EMAIL_SERVICE_ID', ''),
  EMAIL_TEMPLATE_ID: getEnv('EMAIL_TEMPLATE_ID', ''),

  // Аналитика (опционально)
  GOOGLE_ANALYTICS_ID: getEnv('GOOGLE_ANALYTICS_ID', ''),
  YANDEX_METRIKA_ID: getEnv('YANDEX_METRIKA_ID', ''),

  // Окружение
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

