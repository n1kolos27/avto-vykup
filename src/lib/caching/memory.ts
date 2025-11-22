/**
 * In-memory кэш для SSR и других данных
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<unknown>>();

  /**
   * Сохранение значения в кэш
   */
  set<T>(key: string, value: T, ttl: number = 3600000): void {
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });
  }

  /**
   * Получение значения из кэша
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    // Проверяем срок действия
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  /**
   * Удаление значения из кэша
   */
  remove(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Очистка всего кэша
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Очистка истекших записей
   */
  cleanup(): void {
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

