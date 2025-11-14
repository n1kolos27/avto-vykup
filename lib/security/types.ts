/**
 * Security System - Types
 * 
 * Типы для системы безопасности
 */

/**
 * Security headers конфигурация
 */
export interface SecurityHeaders {
  'X-DNS-Prefetch-Control'?: string;
  'Strict-Transport-Security'?: string;
  'X-Frame-Options'?: string;
  'X-Content-Type-Options'?: string;
  'X-XSS-Protection'?: string;
  'Referrer-Policy'?: string;
  'Permissions-Policy'?: string;
  'Content-Security-Policy'?: string;
}

/**
 * CSP (Content Security Policy) директивы
 */
export interface CSPDirectives {
  defaultSrc?: string[];
  scriptSrc?: string[];
  styleSrc?: string[];
  imgSrc?: string[];
  connectSrc?: string[];
  fontSrc?: string[];
  objectSrc?: string[];
  mediaSrc?: string[];
  frameSrc?: string[];
  baseUri?: string[];
  formAction?: string[];
  frameAncestors?: string[];
  upgradeInsecureRequests?: boolean;
}

/**
 * Результат проверки безопасности
 */
export interface SecurityCheckResult {
  safe: boolean;
  threats?: SecurityThreat[];
  recommendations?: string[];
}

/**
 * Угроза безопасности
 */
export interface SecurityThreat {
  type: SecurityThreatType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  recommendation?: string;
}

/**
 * Тип угрозы безопасности
 */
export type SecurityThreatType =
  | 'xss'
  | 'sql_injection'
  | 'csrf'
  | 'path_traversal'
  | 'command_injection'
  | 'unsafe_input'
  | 'rate_limit_exceeded'
  | 'suspicious_activity';

/**
 * Опции санитизации
 */
export interface SanitizeOptions {
  maxLength?: number;
  min?: number;
  max?: number;
  allowHtml?: boolean;
  strict?: boolean;
}

/**
 * Результат санитизации
 */
export interface SanitizeResult<T = string> {
  value: T;
  sanitized: boolean;
  removed?: string[];
}

