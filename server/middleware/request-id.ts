import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

/**
 * Middleware для добавления уникального ID к каждому запросу
 * Используется для трейсинга запросов в логах
 */
export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const requestId = randomUUID();
  (req as { requestId?: string }).requestId = requestId;
  (res.locals as { requestId?: string }).requestId = requestId;
  
  // Добавляем request ID в заголовки ответа для отладки
  res.setHeader('X-Request-ID', requestId);
  
  next();
}

/**
 * Получение request ID из запроса
 */
export function getRequestId(req: Request): string {
  return (req as { requestId?: string }).requestId || (req.res?.locals as { requestId?: string })?.requestId || '';
}

