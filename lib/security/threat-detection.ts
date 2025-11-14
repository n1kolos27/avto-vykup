/**
 * Security System - Threat Detection
 * 
 * Обнаружение угроз безопасности
 */

import type { SecurityCheckResult, SecurityThreat } from './types';

/**
 * Проверка на XSS атаки
 */
export function detectXSS(input: string): SecurityThreat | null {
  const xssPatterns = [
    /<script[^>]*>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe[^>]*>/i,
    /<object[^>]*>/i,
    /<embed[^>]*>/i,
    /expression\s*\(/i,
    /vbscript:/i,
    /data:text\/html/i,
  ];

  for (const pattern of xssPatterns) {
    if (pattern.test(input)) {
      return {
        type: 'xss',
        severity: 'high',
        message: 'Обнаружена потенциальная XSS атака',
        recommendation: 'Входные данные содержат опасные паттерны. Требуется санитизация.',
      };
    }
  }

  return null;
}

/**
 * Проверка на SQL injection
 */
export function detectSQLInjection(input: string): SecurityThreat | null {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /('|(\\')|(;)|(\\;)|(\|)|(\\|)|(&)|(\\&)|(\+)|(\\+)|(-)|(\\-)|(\*)|(\\*)|(%)|(\\%)|(\()|(\\)|(\[)|(\\\[)|(\])|(\\\]))/,
    /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
    /(\b(OR|AND)\s+['"]\w+['"]\s*=\s*['"]\w+['"])/i,
    /(UNION\s+SELECT)/i,
  ];

  for (const pattern of sqlPatterns) {
    if (pattern.test(input)) {
      return {
        type: 'sql_injection',
        severity: 'critical',
        message: 'Обнаружена потенциальная SQL injection атака',
        recommendation: 'Входные данные содержат SQL команды. Требуется валидация и санитизация.',
      };
    }
  }

  return null;
}

/**
 * Проверка на path traversal
 */
export function detectPathTraversal(input: string): SecurityThreat | null {
  const pathTraversalPatterns = [
    /\.\.\//,
    /\.\.\\/,
    /\.\.%2f/i,
    /\.\.%5c/i,
    /\.\.%252f/i,
    /\.\.%255c/i,
  ];

  for (const pattern of pathTraversalPatterns) {
    if (pattern.test(input)) {
      return {
        type: 'path_traversal',
        severity: 'high',
        message: 'Обнаружена потенциальная path traversal атака',
        recommendation: 'Входные данные содержат попытку выхода за пределы директории.',
      };
    }
  }

  return null;
}

/**
 * Проверка на command injection
 */
export function detectCommandInjection(input: string): SecurityThreat | null {
  const commandPatterns = [
    /[;&|`$(){}[\]]/,
    /\b(cat|ls|pwd|whoami|id|uname|ps|kill|rm|mv|cp|chmod|chown)\b/i,
    /\|\s*\w+/,
    /;\s*\w+/,
    /\$\s*\(/,
    /`\s*\w+/,
  ];

  for (const pattern of commandPatterns) {
    if (pattern.test(input)) {
      return {
        type: 'command_injection',
        severity: 'critical',
        message: 'Обнаружена потенциальная command injection атака',
        recommendation: 'Входные данные содержат команды системы. Требуется строгая валидация.',
      };
    }
  }

  return null;
}

/**
 * Комплексная проверка безопасности входных данных
 */
export function checkSecurity(input: string): SecurityCheckResult {
  const threats: SecurityThreat[] = [];

  // Проверяем все типы угроз
  const xssThreat = detectXSS(input);
  if (xssThreat) threats.push(xssThreat);

  const sqlThreat = detectSQLInjection(input);
  if (sqlThreat) threats.push(sqlThreat);

  const pathThreat = detectPathTraversal(input);
  if (pathThreat) threats.push(pathThreat);

  const commandThreat = detectCommandInjection(input);
  if (commandThreat) threats.push(commandThreat);

  // Генерируем рекомендации
  const recommendations: string[] = [];
  if (threats.length > 0) {
    recommendations.push('Требуется санитизация входных данных');
    recommendations.push('Рекомендуется использовать валидацию на стороне сервера');
  }

  return {
    safe: threats.length === 0,
    threats: threats.length > 0 ? threats : undefined,
    recommendations: recommendations.length > 0 ? recommendations : undefined,
  };
}

