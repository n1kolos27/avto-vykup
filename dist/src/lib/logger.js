/**
 * Централизованная система логирования
 * Заменяет console.log на структурированное логирование
 * Улучшена для production с поддержкой метрик и мониторинга
 */
import { trackError } from './monitoring/error-tracker.js';
class Logger {
    constructor() {
        this.logBuffer = [];
        this.maxBufferSize = 100;
        this.isDevelopment =
            typeof process !== 'undefined' &&
                process.env?.NODE_ENV === 'development';
    }
    log(level, message, data, context) {
        // Получаем request ID из глобального контекста (если доступен)
        let requestId;
        try {
            if (typeof process !== 'undefined' && process.requestId) {
                requestId = process.requestId;
            }
        }
        catch {
            // Игнорируем ошибки доступа к requestId
        }
        const logEntry = {
            level,
            message,
            data,
            context,
            timestamp: new Date().toISOString(),
            requestId,
        };
        // Сохраняем в буфер для мониторинга
        this.logBuffer.push(logEntry);
        if (this.logBuffer.length > this.maxBufferSize) {
            this.logBuffer.shift();
        }
        // В production режиме логируем только ошибки и предупреждения
        if (!this.isDevelopment && (level === 'debug' || level === 'info')) {
            // Но все равно сохраняем в буфер для мониторинга
            return;
        }
        const logMessage = context
            ? `[${context}] ${message}${requestId ? ` [${requestId}]` : ''}`
            : `${message}${requestId ? ` [${requestId}]` : ''}`;
        switch (level) {
            case 'debug':
                if (this.isDevelopment) {
                    console.log(logMessage, data || '');
                }
                break;
            case 'info':
                if (this.isDevelopment) {
                    console.info(logMessage, data || '');
                }
                break;
            case 'warn':
                console.warn(logMessage, data || '');
                break;
            case 'error':
                console.error(logMessage, data || '');
                // Отслеживаем ошибки для мониторинга
                if (data?.error || data?.stack) {
                    const error = data.error instanceof Error
                        ? data.error
                        : new Error(data.error || message);
                    // Определяем уровень критичности на основе контекста
                    const errorLevel = this.determineErrorLevel(data, context);
                    trackError(error, errorLevel, {
                        ...data,
                        context,
                        requestId,
                    });
                }
                break;
        }
    }
    /**
     * Определяет уровень критичности ошибки
     */
    determineErrorLevel(data, context) {
        // Критические ошибки
        if (context === 'SSR' || context === 'Server') {
            return 'critical';
        }
        // Высокий приоритет
        if (data?.statusCode && Number(data.statusCode) >= 500) {
            return 'high';
        }
        // Средний приоритет (по умолчанию)
        return 'medium';
    }
    debug(message, data, context) {
        this.log('debug', message, data, context);
    }
    info(message, data, context) {
        this.log('info', message, data, context);
    }
    warn(message, data, context) {
        this.log('warn', message, data, context);
    }
    error(message, data, context) {
        this.log('error', message, data, context);
    }
    /**
     * Получает последние логи
     */
    getRecentLogs(level, count = 50) {
        let logs = this.logBuffer;
        if (level) {
            logs = logs.filter(l => l.level === level);
        }
        return logs.slice(-count).reverse();
    }
    /**
     * Очищает буфер логов
     */
    clearBuffer() {
        this.logBuffer = [];
    }
}
export const logger = new Logger();
