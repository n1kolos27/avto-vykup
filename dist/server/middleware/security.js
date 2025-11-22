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
export function generateNonce() {
    return crypto.randomBytes(16).toString('base64');
}
/**
 * Middleware для добавления nonce к запросу
 */
export function nonceMiddleware(req, res, next) {
    const nonce = generateNonce();
    req.nonce = nonce;
    res.locals.nonce = nonce;
    next();
}
/**
 * Получение nonce из запроса
 */
export function getNonce(req) {
    return req.nonce || req.res?.locals?.nonce || '';
}
