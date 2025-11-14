/**
 * Error Handling System
 * 
 * Единая система обработки ошибок для всего приложения.
 * 
 * @module lib/error-handling
 */

// Types
export * from './types';

// Error creation
export * from './errors';

// Error logging
export * from './logger';

// Error handlers
export * from './handlers';

// API Error class
export { ApiError } from './api-error';

// Retry logic
export * from './retry';

// Re-export commonly used functions with shorter names
export {
  createError,
  createValidationError,
  createAuthenticationError,
  createAuthorizationError,
  createNotFoundError,
  createRateLimitError,
  createServerError,
  createExternalServiceError,
  classifyError,
} from './errors';

export {
  logError,
  logCriticalError,
  logWarning,
} from './logger';

export {
  handleApiError,
  formatErrorForClient,
  isExpectedError,
  isCriticalError,
  handleCriticalError,
  handleFormError,
} from './handlers';

export {
  retryOperation,
  retryOperationSafe,
  retryOperationWithTimeout,
} from './retry';

