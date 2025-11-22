/**
 * Обработка переменных окружения с валидацией через Zod
 * Безопасная работа как в браузере, так и на сервере
 */
import { z } from 'zod';
// Zod схема для валидации переменных окружения
const envSchema = z.object({
    // Контакты
    PHONE_1: z.string().default('89857520001'),
    PHONE_2: z.string().default('89164980001'),
    EMAIL: z.string().email().default('info@mos-avto-alyans.ru'),
    EMAIL_FROM: z.string().email().default('info@mos-avto-alyans.ru'),
    DOMAIN: z.string().default('mos-avto-alyans.ru'),
    // Email сервис (опционально)
    EMAIL_SERVICE_URL: z.string().url().default('https://api.emailjs.com/api/v1.0/email/send'),
    EMAIL_SERVICE_API_KEY: z.string().default(''),
    EMAIL_SERVICE_ID: z.string().default(''),
    EMAIL_TEMPLATE_ID: z.string().default(''),
    // Аналитика (опционально)
    GOOGLE_ANALYTICS_ID: z.string().default(''),
    YANDEX_METRIKA_ID: z.string().default(''),
    // Окружение
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().transform(Number).pipe(z.number().int().positive()).optional(),
    VITE_PORT: z.string().transform(Number).pipe(z.number().int().positive()).optional(),
});
/**
 * Получение переменных окружения с валидацией
 */
function getProcessEnv() {
    if (typeof process !== 'undefined' && process.env) {
        return process.env;
    }
    return {};
}
/**
 * Валидация и парсинг переменных окружения
 */
function parseEnv() {
    const rawEnv = getProcessEnv();
    try {
        return envSchema.parse(rawEnv);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            const errorDetails = error.errors.map((err) => ({
                path: err.path.join('.'),
                message: err.message,
            }));
            // Логируем ошибки валидации (используем console, так как logger может быть недоступен на этапе инициализации)
            console.error('❌ Ошибка валидации переменных окружения:', errorDetails);
            // В development режиме используем значения по умолчанию
            if (rawEnv.NODE_ENV !== 'production') {
                console.warn('⚠️  Используются значения по умолчанию');
                return envSchema.parse({});
            }
            throw new Error('Неверная конфигурация переменных окружения');
        }
        throw error;
    }
}
export const ENV = parseEnv();
