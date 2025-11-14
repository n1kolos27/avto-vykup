/**
 * Documentation System - Types
 * 
 * Типы для системы документации
 */

/**
 * Информация о функции/компоненте для документации
 */
export interface DocumentationItem {
  name: string;
  type: 'function' | 'component' | 'type' | 'interface';
  file: string;
  description?: string;
  params?: Record<string, {
    type: string;
    description: string;
    required?: boolean;
  }>;
  returns?: {
    type: string;
    description: string;
  };
  examples?: string[];
}

/**
 * Конфигурация генерации документации
 */
export interface DocumentationConfig {
  inputDir: string;
  outputDir: string;
  includePatterns: string[];
  excludePatterns: string[];
  format: 'markdown' | 'html' | 'json';
}

