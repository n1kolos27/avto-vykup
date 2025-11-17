/**
 * Error Handling System - Retry Logic
 *
 * Логика повторных попыток для операций
 */

// AppError не используется, удален импорт
import { isExpectedError } from './handlers';

/**
 * Опции для retry операции
 */
export interface RetryOptions {
  /** Максимальное количество попыток */
  maxRetries?: number;
  /** Базовая задержка между попытками (мс) */
  delay?: number;
  /** Использовать ли exponential backoff */
  exponentialBackoff?: boolean;
  /** Максимальная задержка (мс) */
  maxDelay?: number;
  /** Функция для проверки, стоит ли повторять */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
}

/**
 * Результат retry операции
 */
export interface RetryResult<T> {
  success: boolean;
  data?: T;
  error?: unknown;
  attempts: number;
}

/**
 * Retry логика для операций
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delay = 1000,
    exponentialBackoff = true,
    maxDelay = 10000,
    shouldRetry,
  } = options;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {

    try {
      const result = await operation();
      return result;
    } catch (error) {
      lastError = error;

      // Проверяем, стоит ли повторять
      if (shouldRetry && !shouldRetry(error, attempt)) {
        throw error;
      }

      // Не повторяем для клиентских ошибок (4xx)
      if (isExpectedError(error)) {
        throw error;
      }

      // Если это последняя попытка, выбрасываем ошибку
      if (attempt === maxRetries) {
        break;
      }

      // Вычисляем задержку
      const currentDelay = exponentialBackoff
        ? Math.min(delay * Math.pow(2, attempt - 1), maxDelay)
        : delay;

      // Ждем перед следующей попыткой
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
    }
  }

  throw lastError;
}

/**
 * Retry с возвратом результата (не выбрасывает исключение)
 */
export async function retryOperationSafe<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<RetryResult<T>> {
  try {
    const data = await retryOperation(operation, options);
    return {
      success: true,
      data,
      attempts: options.maxRetries || 3,
    };
  } catch (error) {
    return {
      success: false,
      error,
      attempts: options.maxRetries || 3,
    };
  }
}

/**
 * Retry с таймаутом
 */
export async function retryOperationWithTimeout<T>(
  operation: () => Promise<T>,
  timeout: number,
  options: RetryOptions = {}
): Promise<T> {
  return Promise.race([
    retryOperation(operation, options),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Operation timeout')), timeout)
    ),
  ]);
}
