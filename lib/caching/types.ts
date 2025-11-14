/**
 * Caching System - Types
 */

export interface CacheEntry<T = unknown> {
  value: T;
  expiresAt: number;
}

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
}

