/**
 * Caching System - Memory Cache
 */

import type { CacheEntry, CacheOptions } from './types';

const cache = new Map<string, CacheEntry>();

export function set<T>(key: string, value: T, options: CacheOptions = {}): void {
  const ttl = options.ttl || 3600000; // 1 hour default
  cache.set(key, {
    value,
    expiresAt: Date.now() + ttl,
  });
}

export function get<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  
  return entry.value as T;
}

export function remove(key: string): void {
  cache.delete(key);
}

export function clear(): void {
  cache.clear();
}

export function cleanup(): void {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (now > entry.expiresAt) {
      cache.delete(key);
    }
  }
}

