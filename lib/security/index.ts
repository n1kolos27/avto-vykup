/**
 * Security System
 * 
 * Единая система безопасности для всего приложения.
 * Объединяет санитизацию, валидацию, rate limiting и threat detection.
 * 
 * @module lib/security
 */

// Types
export * from './types';

// Sanitization
export * from './sanitization';

// Security Headers
export * from './headers';

// Threat Detection
export * from './threat-detection';

// Re-export commonly used functions
export {
  sanitizeString,
  sanitizePhone,
  sanitizeEmail,
  sanitizeNumber,
  sanitizeText,
  sanitizeUrl,
  sanitizeObject,
} from './sanitization';

export {
  getDefaultSecurityHeaders,
  generateCSP,
  getAPICSP,
  getPageCSP,
  applySecurityHeaders,
} from './headers';

export {
  detectXSS,
  detectSQLInjection,
  detectPathTraversal,
  detectCommandInjection,
  checkSecurity,
} from './threat-detection';

