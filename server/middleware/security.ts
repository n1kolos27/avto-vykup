import { Request, Response, NextFunction } from 'express';
import { applyRateLimiting } from '../../src/lib/rateLimit.js';
import crypto from 'crypto';

/**
 * Глобальный rate limiting middleware
 * Применяется ко всем запросам для защиты от DDoS
 */
export const globalRateLimit = applyRateLimiting({
  windowMs: 60000, // 1 минута
  maxRequests: 100, // 100 запросов в минуту
});

/**
 * Генерация nonce для CSP
 */
export function generateNonce(): string {
  return crypto.randomBytes(16).toString('base64');
}

/**
 * Middleware для добавления nonce к запросу
 */
export function nonceMiddleware(req: Request, res: Response, next: NextFunction): void {
  const nonce = generateNonce();
  (req as { nonce?: string }).nonce = nonce;
  (res.locals as { nonce?: string }).nonce = nonce;
  next();
}

/**
 * Получение nonce из запроса
 */
export function getNonce(req: Request): string {
  return (req as { nonce?: string }).nonce || (req.res?.locals as { nonce?: string })?.nonce || '';
}

