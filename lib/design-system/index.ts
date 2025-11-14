/**
 * Design System
 * 
 * Главный экспорт всех дизайн-токенов и утилит.
 * Единая точка входа для использования Design System в проекте.
 */

// Токены
export * from './tokens';

// Утилиты
export * from './spacing';
export * from './typography';
export * from './colors';

// Реэкспорт для удобства
export { designTokens } from './tokens';
export { SPACING, SPACING_PRESETS } from './spacing';
export { TYPOGRAPHY, TYPOGRAPHY_PRESETS } from './typography';
export { COLOR, COLOR_PRESETS } from './colors';

