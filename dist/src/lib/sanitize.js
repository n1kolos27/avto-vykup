/**
 * Санитизация входных данных для предотвращения XSS атак
 * @param input - Входные данные для санитизации
 * @returns Санитизированные данные
 */
export function sanitizeInput(input) {
    if (typeof input === 'string') {
        return input
            .trim()
            .replace(/[<>]/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+=/gi, '');
    }
    if (Array.isArray(input)) {
        return input.map((item) => sanitizeInput(item));
    }
    if (input && typeof input === 'object' && input !== null) {
        const sanitized = {};
        for (const key in input) {
            if (Object.prototype.hasOwnProperty.call(input, key)) {
                sanitized[key] = sanitizeInput(input[key]);
            }
        }
        return sanitized;
    }
    return input;
}
