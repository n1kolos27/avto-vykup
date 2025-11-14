/**
 * Documentation System
 * 
 * Система автоматической генерации документации.
 * 
 * @module lib/documentation
 */

// Types
export * from './types';

// Generator
export * from './generator';

// Re-export
export { extractJSDoc, generateMarkdownDoc } from './generator';

/**
 * Примечание: Для полной функциональности рекомендуется использовать TypeDoc:
 * 
 * npm install -D typedoc
 * 
 * Конфигурация в typedoc.json:
 * {
 *   "entryPoints": ["lib/**"],
 *   "out": "docs",
 *   "theme": "default"
 * }
 */

