/**
 * Caching System
 * Экспорт функций кэширования
 */
import { memoryCache } from './memory.js';
export { memoryCache };
export const set = (key, value, ttl) => {
    memoryCache.set(key, value, ttl);
};
export const get = (key) => {
    return memoryCache.get(key);
};
export const remove = (key) => {
    memoryCache.remove(key);
};
export const clear = () => {
    memoryCache.clear();
};
