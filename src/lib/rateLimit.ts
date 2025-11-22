import { Request, Response, NextFunction } from 'express';

export interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

interface RequestWithIP {
  ip?: string;
  socket?: { remoteAddress?: string };
  headers?: Record<string, string | string[] | undefined>;
}

const requestCounts = new Map<string, { count: number; timer: ReturnType<typeof setTimeout> }>();

/**
 * Получение IP адреса клиента из запроса
 */
function getClientIP(req: Request): string {
  const reqWithIP = req as unknown as RequestWithIP & Request;
  return (
    reqWithIP.ip ||
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    'unknown'
  );
}

export function applyRateLimiting(config: RateLimitOptions) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = getClientIP(req);

    if (!requestCounts.has(ip)) {
      const timer = setTimeout(() => {
        requestCounts.delete(ip);
      }, config.windowMs);
      requestCounts.set(ip, { count: 0, timer });
    }

    const client = requestCounts.get(ip);
    if (!client) {
      next();
      return;
    }

    client.count++;

    if (client.count > config.maxRequests) {
      res.status(429).json({ 
        success: false,
        message: 'Слишком много запросов. Попробуйте позже.' 
      });
      return;
    }

    next();
  };
}

export function rateLimit(options: RateLimitOptions) {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction): void => {
    const key = getClientIP(req);
    const now = Date.now();
    const record = requests.get(key);

    if (!record || now > record.resetTime) {
      requests.set(key, {
        count: 1,
        resetTime: now + options.windowMs,
      });
      next();
      return;
    }

    if (record.count >= options.maxRequests) {
      res.status(429).json({
        success: false,
        message: 'Слишком много запросов. Попробуйте позже.',
      });
      return;
    }

    record.count++;
    next();
  };
}
