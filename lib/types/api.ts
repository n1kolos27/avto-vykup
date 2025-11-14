/**
 * Типы для API
 */

// Типы для API ответов
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Типы для ошибок API
export interface ApiError {
  error: string;
  code?: string;
  details?: Record<string, unknown>;
}

// Типы для rate limiting
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

