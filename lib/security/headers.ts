/**
 * Security System - Security Headers
 * 
 * Генерация и управление security headers
 */

import type { SecurityHeaders, CSPDirectives } from './types';

/**
 * Стандартные security headers
 */
export function getDefaultSecurityHeaders(): SecurityHeaders {
  return {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

/**
 * Генерация CSP (Content Security Policy) строки
 */
export function generateCSP(directives: CSPDirectives): string {
  const parts: string[] = [];

  if (directives.defaultSrc) {
    parts.push(`default-src ${directives.defaultSrc.join(' ')}`);
  }
  if (directives.scriptSrc) {
    parts.push(`script-src ${directives.scriptSrc.join(' ')}`);
  }
  if (directives.styleSrc) {
    parts.push(`style-src ${directives.styleSrc.join(' ')}`);
  }
  if (directives.imgSrc) {
    parts.push(`img-src ${directives.imgSrc.join(' ')}`);
  }
  if (directives.connectSrc) {
    parts.push(`connect-src ${directives.connectSrc.join(' ')}`);
  }
  if (directives.fontSrc) {
    parts.push(`font-src ${directives.fontSrc.join(' ')}`);
  }
  if (directives.objectSrc) {
    parts.push(`object-src ${directives.objectSrc.join(' ')}`);
  }
  if (directives.mediaSrc) {
    parts.push(`media-src ${directives.mediaSrc.join(' ')}`);
  }
  if (directives.frameSrc) {
    parts.push(`frame-src ${directives.frameSrc.join(' ')}`);
  }
  if (directives.baseUri) {
    parts.push(`base-uri ${directives.baseUri.join(' ')}`);
  }
  if (directives.formAction) {
    parts.push(`form-action ${directives.formAction.join(' ')}`);
  }
  if (directives.frameAncestors) {
    parts.push(`frame-ancestors ${directives.frameAncestors.join(' ')}`);
  }
  if (directives.upgradeInsecureRequests) {
    parts.push('upgrade-insecure-requests');
  }

  return parts.join('; ');
}

/**
 * CSP для API routes
 */
export function getAPICSP(): string {
  return generateCSP({
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
  });
}

/**
 * CSP для обычных страниц
 */
export function getPageCSP(): string {
  return generateCSP({
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'", // Для Next.js в dev режиме
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://mc.yandex.ru',
    ],
    styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    imgSrc: [
      "'self'",
      'data:',
      'https:',
      'https://www.google-analytics.com',
      'https://mc.yandex.ru',
    ],
    connectSrc: [
      "'self'",
      'https://www.google-analytics.com',
      'https://mc.yandex.ru',
      'https://api.emailjs.com',
    ],
    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    frameSrc: ["'self'"],
    upgradeInsecureRequests: true,
  });
}

/**
 * Применение security headers к Response
 */
export function applySecurityHeaders(
  response: Response,
  customHeaders?: Partial<SecurityHeaders>
): Response {
  const headers = { ...getDefaultSecurityHeaders(), ...customHeaders };

  Object.entries(headers).forEach(([key, value]) => {
    if (value) {
      response.headers.set(key, value);
    }
  });

  return response;
}

