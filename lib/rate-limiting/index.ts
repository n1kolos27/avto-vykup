/**
 * Rate Limiting System
 * 
 * Единая система rate limiting для защиты API от злоупотреблений.
 * 
 * @module lib/rate-limiting
 */

// Types
export * from './types';

// Memory store (текущая реализация)
export * from './memory';

// Redis store (для будущего использования)
export * from './redis';

// Utilities
export * from './utils';

// Re-export commonly used functions
export {
  rateLimit,
  cleanupRateLimitStore,
  getRateLimitStatus,
  resetRateLimit,
  getAllRateLimitRecords,
} from './memory';

export {
  getClientIP,
  createRateLimitIdentifier,
  formatResetTime,
} from './utils';

