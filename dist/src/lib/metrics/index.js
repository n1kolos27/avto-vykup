/**
 * Performance Metrics System
 *
 * Система сбора и отслеживания метрик производительности
 */
import { logger } from '../logger.js';
class MetricsCollector {
    constructor() {
        this.performanceMetrics = [];
        this.businessMetrics = [];
        this.maxMetrics = 1000; // Лимит метрик в памяти
    }
    /**
     * Записывает метрику производительности
     */
    recordPerformance(metric) {
        const fullMetric = {
            ...metric,
            timestamp: new Date().toISOString(),
        };
        this.performanceMetrics.push(fullMetric);
        // Ограничиваем размер массива
        if (this.performanceMetrics.length > this.maxMetrics) {
            this.performanceMetrics.shift();
        }
        // Логируем важные метрики
        if (metric.value > 1000 && metric.unit === 'ms') {
            logger.warn('Slow performance metric', {
                name: metric.name,
                value: metric.value,
                unit: metric.unit,
                ...metric.context,
            }, 'Metrics');
        }
    }
    /**
     * Записывает бизнес-метрику
     */
    recordBusiness(metric) {
        const fullMetric = {
            ...metric,
            timestamp: new Date().toISOString(),
        };
        this.businessMetrics.push(fullMetric);
        // Ограничиваем размер массива
        if (this.businessMetrics.length > this.maxMetrics) {
            this.businessMetrics.shift();
        }
        // Логируем бизнес-метрики
        logger.info('Business metric', {
            event: metric.event,
            value: metric.value,
            ...metric.metadata,
        }, 'Metrics');
    }
    /**
     * Получает метрики производительности за период
     */
    getPerformanceMetrics(name, since) {
        let metrics = this.performanceMetrics;
        if (name) {
            metrics = metrics.filter(m => m.name === name);
        }
        if (since) {
            metrics = metrics.filter(m => new Date(m.timestamp) >= since);
        }
        return metrics;
    }
    /**
     * Получает бизнес-метрики за период
     */
    getBusinessMetrics(event, since) {
        let metrics = this.businessMetrics;
        if (event) {
            metrics = metrics.filter(m => m.event === event);
        }
        if (since) {
            metrics = metrics.filter(m => new Date(m.timestamp) >= since);
        }
        return metrics;
    }
    /**
     * Вычисляет статистику для метрики производительности
     */
    getPerformanceStats(name, since) {
        const metrics = this.getPerformanceMetrics(name, since);
        if (metrics.length === 0) {
            return null;
        }
        const values = metrics.map(m => m.value).sort((a, b) => a - b);
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / values.length;
        const min = values[0];
        const max = values[values.length - 1];
        const p95Index = Math.floor(values.length * 0.95);
        const p99Index = Math.floor(values.length * 0.99);
        return {
            count: values.length,
            avg: Math.round(avg * 100) / 100,
            min,
            max,
            p95: values[p95Index] || max,
            p99: values[p99Index] || max,
        };
    }
    /**
     * Очищает старые метрики
     */
    clear(olderThan) {
        if (olderThan) {
            this.performanceMetrics = this.performanceMetrics.filter(m => new Date(m.timestamp) >= olderThan);
            this.businessMetrics = this.businessMetrics.filter(m => new Date(m.timestamp) >= olderThan);
        }
        else {
            this.performanceMetrics = [];
            this.businessMetrics = [];
        }
    }
}
export const metrics = new MetricsCollector();
/**
 * Утилита для измерения времени выполнения функции
 */
export async function measureTime(name, fn, context) {
    const startTime = Date.now();
    try {
        const result = await fn();
        const duration = Date.now() - startTime;
        metrics.recordPerformance({
            name,
            value: duration,
            unit: 'ms',
            context,
        });
        return result;
    }
    catch (error) {
        const duration = Date.now() - startTime;
        metrics.recordPerformance({
            name,
            value: duration,
            unit: 'ms',
            context: {
                ...context,
                error: error instanceof Error ? error.message : String(error),
            },
        });
        throw error;
    }
}
/**
 * Утилита для измерения времени выполнения синхронной функции
 */
export function measureTimeSync(name, fn, context) {
    const startTime = Date.now();
    try {
        const result = fn();
        const duration = Date.now() - startTime;
        metrics.recordPerformance({
            name,
            value: duration,
            unit: 'ms',
            context,
        });
        return result;
    }
    catch (error) {
        const duration = Date.now() - startTime;
        metrics.recordPerformance({
            name,
            value: duration,
            unit: 'ms',
            context: {
                ...context,
                error: error instanceof Error ? error.message : String(error),
            },
        });
        throw error;
    }
}
