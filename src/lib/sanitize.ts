type SanitizablePrimitive = string | number | boolean | null | undefined;

/**
 * Санитизация входных данных для предотвращения XSS атак
 * @param input - Входные данные для санитизации
 * @returns Санитизированные данные
 */
export function sanitizeInput<T>(input: T): T {
  if (typeof input === 'string') {
    return input
      .trim()
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '') as T;
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeInput(item)) as T;
  }

  if (input && typeof input === 'object' && input !== null) {
    const sanitized = {} as Record<string, unknown>;
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        sanitized[key] = sanitizeInput((input as Record<string, unknown>)[key]);
      }
    }
    return sanitized as T;
  }

  return input;
}
