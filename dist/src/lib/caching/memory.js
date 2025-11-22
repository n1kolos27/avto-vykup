/**
 * In-memory кэш для SSR и других данных
 */
class MemoryCache {
    constructor() {
        this.cache = new Map();
    }
    /**
     * Сохранение значения в кэш
     */
    set(key, value, ttl = 3600000) {
        const expiresAt = Date.now() + ttl;
        this.cache.set(key, { value, expiresAt });
    }
    /**
     * Получение значения из кэша
     */
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            return null;
        }
        // Проверяем срок действия
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return null;
        }
        return entry.value;
    }
    /**
     * Удаление значения из кэша
     */
    remove(key) {
        this.cache.delete(key);
    }
    /**
     * Очистка всего кэша
     */
    clear() {
        this.cache.clear();
    }
    /**
     * Очистка истекших записей
     */
    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                this.cache.delete(key);
            }
        }
    }
}
export const memoryCache = new MemoryCache();
// Периодическая очистка истекших записей (каждые 5 минут)
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        memoryCache.cleanup();
    }, 5 * 60 * 1000);
}
