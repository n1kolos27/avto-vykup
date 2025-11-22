import crypto from 'crypto';
import { logger } from '../../src/lib/logger.js';
/**
 * CSRF токены хранятся в памяти (в production можно использовать Redis)
 */
const csrfTokens = new Map();
/**
 * Очистка истекших токенов каждые 5 минут
 */
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of csrfTokens.entries()) {
        if (value.expiresAt < now) {
            csrfTokens.delete(key);
        }
    }
}, 5 * 60 * 1000);
/**
 * Генерация CSRF токена
 */
export function generateCSRFToken() {
    return crypto.randomBytes(32).toString('hex');
}
/**
 * Получение сессии ID из запроса (используем IP + User-Agent)
 */
function getSessionId(req) {
    const forwardedFor = req.headers['x-forwarded-for'];
    const realIp = req.headers['x-real-ip'];
    const remoteAddress = req.socket.remoteAddress;
    const ip = (forwardedFor || realIp || remoteAddress || 'unknown')
        .toString()
        .split(',')[0]
        .trim();
    const userAgent = req.headers['user-agent'] || 'unknown';
    return `${ip}:${userAgent}`;
}
/**
 * Middleware для генерации CSRF токена
 * Добавляет токен в res.locals.csrfToken
 */
export function csrfTokenMiddleware(req, res, next) {
    const sessionId = getSessionId(req);
    const existingToken = csrfTokens.get(sessionId);
    // Проверяем, не истек ли токен (действителен 1 час)
    if (existingToken && existingToken.expiresAt > Date.now()) {
        res.locals.csrfToken = existingToken.token;
    }
    else {
        // Генерируем новый токен
        const token = generateCSRFToken();
        csrfTokens.set(sessionId, {
            token,
            expiresAt: Date.now() + 60 * 60 * 1000, // 1 час
        });
        res.locals.csrfToken = token;
    }
    next();
}
/**
 * Middleware для проверки CSRF токена
 * Используется для POST, PUT, DELETE запросов
 */
export function csrfProtection(req, res, next) {
    // Пропускаем GET, HEAD, OPTIONS запросы
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        next();
        return;
    }
    const sessionId = getSessionId(req);
    const storedToken = csrfTokens.get(sessionId);
    if (!storedToken || storedToken.expiresAt < Date.now()) {
        logger.warn('CSRF token not found or expired', { sessionId, path: req.path }, 'CSRF');
        res.status(403).json({
            success: false,
            message: 'CSRF token missing or expired. Please refresh the page.',
            code: 'CSRF_TOKEN_INVALID',
        });
        return;
    }
    // Получаем токен из заголовка или тела запроса
    const token = req.headers['x-csrf-token'] || req.body?.csrfToken;
    if (!token || token !== storedToken.token) {
        logger.warn('CSRF token validation failed', {
            sessionId,
            path: req.path,
            hasToken: !!token,
        }, 'CSRF');
        res.status(403).json({
            success: false,
            message: 'Invalid CSRF token. Please refresh the page.',
            code: 'CSRF_TOKEN_INVALID',
        });
        return;
    }
    next();
}
/**
 * Получение CSRF токена для клиента
 */
export function getCSRFToken(req) {
    const sessionId = getSessionId(req);
    const storedToken = csrfTokens.get(sessionId);
    if (storedToken && storedToken.expiresAt > Date.now()) {
        return storedToken.token;
    }
    return null;
}
