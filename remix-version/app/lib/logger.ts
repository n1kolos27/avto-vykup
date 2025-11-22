/**
 * Централизованная система логирования
 * Упрощенная версия для Remix
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = 
      typeof process !== 'undefined' && 
      process.env?.NODE_ENV === 'development';
  }

  private log(level: LogLevel, message: string, data?: Record<string, unknown>, context?: string): void {
    const logMessage = context ? `[${context}] ${message}` : message;

    if (!this.isDevelopment && (level === 'debug' || level === 'info')) {
      return;
    }

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
        break;
    }
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
}

export const logger = new Logger();
