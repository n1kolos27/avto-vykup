const requestCounts = new Map();
/**
 * Получение IP адреса клиента из запроса
 */
function getClientIP(req) {
    const reqWithIP = req;
    return (reqWithIP.ip ||
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.headers['x-real-ip'] ||
        req.socket.remoteAddress ||
        'unknown');
}
export function applyRateLimiting(config) {
    return (req, res, next) => {
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
export function rateLimit(options) {
    const requests = new Map();
    return (req, res, next) => {
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
