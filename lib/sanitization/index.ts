/**
 * Sanitization System
 * 
 * Единая система санитизации входных данных.
 * 
 * Примечание: Основная функциональность перенесена в Security System.
 * Этот модуль оставлен для обратной совместимости и реэкспортирует функции из Security System.
 * 
 * @module lib/sanitization
 * @deprecated Используйте lib/security для новых проектов
 */

// Re-export из Security System для обратной совместимости
export {
  sanitizeString,
  sanitizePhone,
  sanitizeEmail,
  sanitizeNumber,
  sanitizeText,
  sanitizeUrl,
  sanitizeObject,
} from '@/lib/security';

// Типы для обратной совместимости
export type { SanitizeOptions, SanitizeResult } from '@/lib/security';

