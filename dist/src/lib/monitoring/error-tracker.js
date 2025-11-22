/**
 * Error Tracking and Monitoring System
 *
 * Система отслеживания и мониторинга ошибок с алертами
 */
import { logger } from '../logger.js';
class ErrorTracker {
    constructor() {
        this.errors = [];
        this.maxErrors = 500;
        this.alertThresholds = {
            critical: 1, // 1 критическая ошибка = алерт
            high: 5, // 5 ошибок за период = алерт
            medium: 10,
            low: 20,
        };
    }
    /**
     * Регистрирует ошибку
     */
    trackError(error, level = 'medium', context) {
        const errorKey = `${error.name}:${error.message}`;
        const existingError = this.errors.find(e => e.error.name === error.name && e.error.message === error.message);
        if (existingError) {
            existingError.count++;
            existingError.timestamp = new Date().toISOString();
        }
        else {
            const alert = {
                level,
                message: error.message,
                error,
                context: context || {},
                timestamp: new Date().toISOString(),
                count: 1,
            };
            this.errors.push(alert);
            // Ограничиваем размер массива
            if (this.errors.length > this.maxErrors) {
                this.errors.shift();
            }
        }
        // Проверяем пороги для алертов
        this.checkAlertThresholds(level);
    }
    /**
     * Проверяет пороги для алертов
     */
    checkAlertThresholds(level) {
        const threshold = this.alertThresholds[level];
        const recentErrors = this.getRecentErrors(level, 60000); // Последняя минута
        if (recentErrors.length >= threshold) {
            this.sendAlert(level, recentErrors);
        }
    }
    /**
     * Получает недавние ошибки
     */
    getRecentErrors(level, periodMs) {
        const since = new Date(Date.now() - periodMs);
        return this.errors.filter(e => e.level === level && new Date(e.timestamp) >= since);
    }
    /**
     * Отправляет алерт
     */
    sendAlert(level, errors) {
        const message = `[${level.toUpperCase()}] Error threshold exceeded: ${errors.length} errors in the last minute`;
        logger.error(message, {
            level,
            count: errors.length,
            errors: errors.map(e => ({
                message: e.message,
                name: e.error.name,
                count: e.count,
            })),
        }, 'ErrorTracker');
        // В production здесь можно добавить отправку в внешние системы мониторинга
        // Например: Sentry, DataDog, CloudWatch и т.д.
    }
    /**
     * Получает статистику ошибок
     */
    getStats(since) {
        const errors = since
            ? this.errors.filter(e => new Date(e.timestamp) >= since)
            : this.errors;
        const byType = {};
        const byLevel = {};
        errors.forEach(error => {
            byType[error.error.name] = (byType[error.error.name] || 0) + error.count;
            byLevel[error.level] = (byLevel[error.level] || 0) + error.count;
        });
        return {
            total: errors.reduce((sum, e) => sum + e.count, 0),
            byType,
            byLevel,
            recent: errors.slice(-10).reverse(), // Последние 10 ошибок
        };
    }
    /**
     * Очищает старые ошибки
     */
    clear(olderThan) {
        if (olderThan) {
            this.errors = this.errors.filter(e => new Date(e.timestamp) >= olderThan);
        }
        else {
            this.errors = [];
        }
    }
}
export const errorTracker = new ErrorTracker();
/**
 * Утилита для отслеживания ошибок
 */
export function trackError(error, level = 'medium', context) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    errorTracker.trackError(errorObj, level, context);
}
