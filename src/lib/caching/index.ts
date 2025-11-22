/**
 * Caching System
 * Экспорт функций кэширования
 */

import { memoryCache } from './memory.js';

export { memoryCache };

export const set = <T>(key: string, value: T, ttl?: number): void => {
  memoryCache.set(key, value, ttl);
};

export const get = <T>(key: string): T | null => {
  return memoryCache.get<T>(key);
};

export const remove = (key: string): void => {
  memoryCache.remove(key);
};

export const clear = (): void => {
  memoryCache.clear();
};

