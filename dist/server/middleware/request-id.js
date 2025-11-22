import { randomUUID } from 'crypto';
/**
 * Middleware для добавления уникального ID к каждому запросу
 * Используется для трейсинга запросов в логах
 */
export function requestIdMiddleware(req, res, next) {
    const requestId = randomUUID();
    req.requestId = requestId;
    res.locals.requestId = requestId;
    // Добавляем request ID в заголовки ответа для отладки
    res.setHeader('X-Request-ID', requestId);
    next();
}
/**
 * Получение request ID из запроса
 */
export function getRequestId(req) {
    return req.requestId || req.res?.locals?.requestId || '';
}
