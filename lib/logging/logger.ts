/**
 * Logging System - Logger
 */

import type { LogLevel, LogEntry, LoggerConfig } from './types';
import { ENV } from '@/lib/config';

const config: LoggerConfig = {
  level: ENV.NODE_ENV === 'production' ? 'info' : 'debug',
  enableConsole: true,
};

const levels: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function shouldLog(level: LogLevel): boolean {
  return levels[level] >= levels[config.level];
}

function formatLog(entry: LogEntry): string {
  return JSON.stringify(entry, null, 2);
}

export function log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error): void {
  if (!shouldLog(level)) return;

  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
    error,
  };

  if (config.enableConsole) {
    const formatted = formatLog(entry);
    if (level === 'error') {
      // eslint-disable-next-line no-console
      console.error(formatted);
    } else if (level === 'warn') {
      // eslint-disable-next-line no-console
      console.warn(formatted);
    } else {
      // eslint-disable-next-line no-console
      console.log(formatted);
    }
  }
}

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => log('debug', message, context),
  info: (message: string, context?: Record<string, unknown>) => log('info', message, context),
  warn: (message: string, context?: Record<string, unknown>) => log('warn', message, context),
  error: (message: string, context?: Record<string, unknown>, error?: Error) => log('error', message, context, error),
};
