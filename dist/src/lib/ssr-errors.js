/**
 * Типы ошибок SSR
 * Обновлено для совместимости с новой системой мониторинга
 */
/**
 * Создание типизированной ошибки SSR
 */
export function createSSRError(error, url, type = 'UNKNOWN_SSR_ERROR', additionalInfo) {
    const baseError = {
        type,
        message: error instanceof Error ? error.message : String(error),
        url,
        stack: error instanceof Error ? error.stack : undefined,
        originalError: error,
        timestamp: new Date().toISOString(),
        ...additionalInfo,
    };
    // Извлекаем componentStack если это React ошибка
    if (error && typeof error === 'object' && 'componentStack' in error) {
        baseError.componentStack = String(error.componentStack);
    }
    return baseError;
}
/**
 * Классификация ошибок SSR по типу
 */
export function classifySSRError(error, url) {
    if (error instanceof Error) {
        const message = error.message.toLowerCase();
        if (message.includes('render') || message.includes('hydration')) {
            return 'RENDER_ERROR';
        }
        if (message.includes('template') || message.includes('html')) {
            return 'TEMPLATE_ERROR';
        }
        if (message.includes('metadata') || message.includes('meta')) {
            return 'METADATA_ERROR';
        }
    }
    return 'UNKNOWN_SSR_ERROR';
}
/**
 * Форматирование ошибки SSR для логирования
 */
export function formatSSRErrorForLog(error) {
    return {
        type: error.type,
        message: error.message,
        url: error.url,
        timestamp: error.timestamp,
        ...(error.stack && { stack: error.stack }),
        ...(error.componentStack && { componentStack: error.componentStack }),
        ...(error.errorBoundary && { errorBoundary: error.errorBoundary }),
    };
}
