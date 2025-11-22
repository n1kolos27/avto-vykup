/**
 * Централизованная система логирования
 * Заменяет console.log на структурированное логирование
 * Улучшена для production с поддержкой метрик и мониторинга
 */

import { errorTracker, trackError } from './monitoring/error-tracker.js';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  context?: string;
  timestamp: string;
  requestId?: string;
}

class Logger {
  private isDevelopment: boolean;
  private logBuffer: LogEntry[] = [];
  private readonly maxBufferSize = 100;

  constructor() {
    this.isDevelopment = 
      typeof process !== 'undefined' && 
      process.env?.NODE_ENV === 'development';
  }

  private log(level: LogLevel, message: string, data?: Record<string, unknown>, context?: string): void {
    // Получаем request ID из глобального контекста (если доступен)
    let requestId: string | undefined;
    try {
      if (typeof process !== 'undefined' && (process as { requestId?: string }).requestId) {
        requestId = (process as { requestId?: string }).requestId;
      }
    } catch {
      // Игнорируем ошибки доступа к requestId
    }

    const logEntry: LogEntry = {
      level,
      message,
      data,
      context,
      timestamp: new Date().toISOString(),
      requestId,
    };

    // Сохраняем в буфер для мониторинга
    this.logBuffer.push(logEntry);
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer.shift();
    }

    // В production режиме логируем только ошибки и предупреждения
    if (!this.isDevelopment && (level === 'debug' || level === 'info')) {
      // Но все равно сохраняем в буфер для мониторинга
      return;
    }

    const logMessage = context 
      ? `[${context}] ${message}${requestId ? ` [${requestId}]` : ''}` 
      : `${message}${requestId ? ` [${requestId}]` : ''}`;

    switch (level) {
      case 'debug':
        if (this.isDevelopment) {
          console.log(logMessage, data || '');
        }
        break;
      case 'info':
        if (this.isDevelopment) {
          console.info(logMessage, data || '');
        }
        break;
      case 'warn':
        console.warn(logMessage, data || '');
        break;
      case 'error':
        console.error(logMessage, data || '');
        
        // Отслеживаем ошибки для мониторинга
        if (data?.error || data?.stack) {
          const error = data.error instanceof Error 
            ? data.error 
            : new Error(data.error as string || message);
          
          // Определяем уровень критичности на основе контекста
          const errorLevel = this.determineErrorLevel(data, context);
          trackError(error, errorLevel, {
            ...data,
            context,
            requestId,
          });
        }
        break;
    }
  }

  /**
   * Определяет уровень критичности ошибки
   */
  private determineErrorLevel(
    data?: Record<string, unknown>,
    context?: string
  ): 'critical' | 'high' | 'medium' | 'low' {
    // Критические ошибки
    if (context === 'SSR' || context === 'Server') {
      return 'critical';
    }

    // Высокий приоритет
    if (data?.statusCode && Number(data.statusCode) >= 500) {
      return 'high';
    }

    // Средний приоритет (по умолчанию)
    return 'medium';
  }

  debug(message: string, data?: Record<string, unknown>, context?: string): void {
    this.log('debug', message, data, context);
  }

  info(message: string, data?: Record<string, unknown>, context?: string): void {
    this.log('info', message, data, context);
  }

  warn(message: string, data?: Record<string, unknown>, context?: string): void {
    this.log('warn', message, data, context);
  }

  error(message: string, data?: Record<string, unknown>, context?: string): void {
    this.log('error', message, data, context);
  }

  /**
   * Получает последние логи
   */
  getRecentLogs(level?: LogLevel, count = 50): LogEntry[] {
    let logs = this.logBuffer;
    
    if (level) {
      logs = logs.filter(l => l.level === level);
    }
    
    return logs.slice(-count).reverse();
  }

  /**
   * Очищает буфер логов
   */
  clearBuffer(): void {
    this.logBuffer = [];
  }
}

export const logger = new Logger();

