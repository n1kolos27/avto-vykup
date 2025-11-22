/**
 * Типы ошибок SSR
 * Обновлено для совместимости с новой системой мониторинга
 */

export type SSRErrorType =
  | 'RENDER_ERROR'
  | 'HTML_GENERATION_ERROR'
  | 'ROUTE_HANDLER_ERROR'
  | 'TEMPLATE_ERROR'
  | 'METADATA_ERROR'
  | 'UNKNOWN_SSR_ERROR';

export interface SSRError {
  message: string;
  stack?: string;
  url: string;
  type: SSRErrorType;
  originalError: unknown;
  context?: Record<string, unknown>;
  timestamp?: string;
  componentStack?: string;
  errorBoundary?: string;
}

/**
 * Создание типизированной ошибки SSR
 */
export function createSSRError(
  error: unknown,
  url: string,
  type: SSRError['type'] = 'UNKNOWN_SSR_ERROR',
  additionalInfo?: Record<string, unknown>
): SSRError {
  const baseError: SSRError = {
    type,
    message: error instanceof Error ? error.message : String(error),
    url,
    stack: error instanceof Error ? error.stack : undefined,
    originalError: error,
    timestamp: new Date().toISOString(),
    ...additionalInfo,
  };

  // Извлекаем componentStack если это React ошибка
  if (error && typeof error === 'object' && 'componentStack' in error) {
    baseError.componentStack = String((error as { componentStack?: string }).componentStack);
  }

  return baseError;
}

/**
 * Классификация ошибок SSR по типу
 */
export function classifySSRError(error: unknown, url: string): SSRError['type'] {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('render') || message.includes('hydration')) {
      return 'RENDER_ERROR';
    }
    
    if (message.includes('template') || message.includes('html')) {
      return 'TEMPLATE_ERROR';
    }
    
    if (message.includes('metadata') || message.includes('meta')) {
      return 'METADATA_ERROR';
    }
  }
  
  return 'UNKNOWN_SSR_ERROR';
}

/**
 * Форматирование ошибки SSR для логирования
 */
export function formatSSRErrorForLog(error: SSRError): Record<string, unknown> {
  return {
    type: error.type,
    message: error.message,
    url: error.url,
    timestamp: error.timestamp,
    ...(error.stack && { stack: error.stack }),
    ...(error.componentStack && { componentStack: error.componentStack }),
    ...(error.errorBoundary && { errorBoundary: error.errorBoundary }),
  };
}

