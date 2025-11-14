/**
 * Typography Utilities
 * 
 * Утилиты для работы с типографической системой.
 */

import { typography } from './tokens';

/**
 * Получить размер шрифта
 */
export function getFontSize(key: keyof typeof typography.fontSize): string {
  return typography.fontSize[key][0];
}

/**
 * Получить line height для размера шрифта
 */
export function getLineHeight(key: keyof typeof typography.fontSize): string {
  const config = typography.fontSize[key];
  return typeof config === 'string' ? config : config[1]?.lineHeight || '1.5';
}

/**
 * Typography scale для использования в компонентах
 */
export const TYPOGRAPHY = {
  fontSize: typography.fontSize,
  fontWeight: typography.fontWeight,
  letterSpacing: typography.letterSpacing,
  lineHeight: typography.lineHeight,
  fontFamily: typography.fontFamily,
} as const;

/**
 * Предустановленные типографические стили для разных типов контента
 */
export const TYPOGRAPHY_PRESETS = {
  /** Заголовок страницы (H1) */
  pageTitle: {
    fontSize: TYPOGRAPHY.fontSize['4xl'][0],
    lineHeight: TYPOGRAPHY.fontSize['4xl'][1].lineHeight,
    fontWeight: TYPOGRAPHY.fontWeight.extrabold,
    letterSpacing: TYPOGRAPHY.letterSpacing.tight,
  },
  /** Заголовок секции (H2) */
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize['3xl'][0],
    lineHeight: TYPOGRAPHY.fontSize['3xl'][1].lineHeight,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    letterSpacing: TYPOGRAPHY.letterSpacing.tight,
  },
  /** Заголовок подсекции (H3) */
  subsectionTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'][0],
    lineHeight: TYPOGRAPHY.fontSize['2xl'][1].lineHeight,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    letterSpacing: TYPOGRAPHY.letterSpacing.normal,
  },
  /** Основной текст */
  body: {
    fontSize: TYPOGRAPHY.fontSize.base[0],
    lineHeight: TYPOGRAPHY.fontSize.base[1].lineHeight,
    fontWeight: TYPOGRAPHY.fontWeight.normal,
    letterSpacing: TYPOGRAPHY.letterSpacing.normal,
  },
  /** Крупный текст */
  bodyLarge: {
    fontSize: TYPOGRAPHY.fontSize.lg[0],
    lineHeight: TYPOGRAPHY.fontSize.lg[1].lineHeight,
    fontWeight: TYPOGRAPHY.fontWeight.normal,
    letterSpacing: TYPOGRAPHY.letterSpacing.normal,
  },
  /** Мелкий текст */
  bodySmall: {
    fontSize: TYPOGRAPHY.fontSize.sm[0],
    lineHeight: TYPOGRAPHY.fontSize.sm[1].lineHeight,
    fontWeight: TYPOGRAPHY.fontWeight.normal,
    letterSpacing: TYPOGRAPHY.letterSpacing.normal,
  },
  /** Текст кнопки */
  button: {
    fontSize: TYPOGRAPHY.fontSize.base[0],
    lineHeight: TYPOGRAPHY.fontSize.base[1].lineHeight,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    letterSpacing: TYPOGRAPHY.letterSpacing.normal,
  },
  /** Текст метки */
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm[0],
    lineHeight: TYPOGRAPHY.fontSize.sm[1].lineHeight,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    letterSpacing: TYPOGRAPHY.letterSpacing.normal,
  },
} as const;

