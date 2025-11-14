/**
 * Color Utilities
 * 
 * Утилиты для работы с цветовой системой.
 */

import { colors } from './tokens';

/**
 * Получить цвет из палитры
 */
export function getColor(
  palette: 'primary' | 'gray',
  shade: keyof typeof colors.primary
): string {
  return colors[palette][shade];
}

/**
 * Получить semantic цвет
 */
export function getSemanticColor(
  type: 'success' | 'error' | 'warning' | 'info',
  shade: 50 | 100 | 500 | 600 | 700
): string {
  return colors.semantic[type][shade];
}

/**
 * Color scale для использования в компонентах
 */
export const COLOR = {
  primary: colors.primary,
  gray: colors.gray,
  semantic: colors.semantic,
} as const;

/**
 * Предустановленные цветовые комбинации для разных состояний
 */
export const COLOR_PRESETS = {
  /** Основной акцентный цвет */
  primary: {
    main: COLOR.primary[600],
    light: COLOR.primary[400],
    dark: COLOR.primary[700],
    background: COLOR.primary[50],
    text: COLOR.primary[600],
  },
  /** Успешное действие */
  success: {
    main: COLOR.semantic.success[500],
    light: COLOR.semantic.success[50],
    dark: COLOR.semantic.success[700],
    background: COLOR.semantic.success[50],
    text: COLOR.semantic.success[700],
  },
  /** Ошибка */
  error: {
    main: COLOR.semantic.error[500],
    light: COLOR.semantic.error[50],
    dark: COLOR.semantic.error[700],
    background: COLOR.semantic.error[50],
    text: COLOR.semantic.error[700],
  },
  /** Предупреждение */
  warning: {
    main: COLOR.semantic.warning[500],
    light: COLOR.semantic.warning[50],
    dark: COLOR.semantic.warning[700],
    background: COLOR.semantic.warning[50],
    text: COLOR.semantic.warning[700],
  },
  /** Информация */
  info: {
    main: COLOR.semantic.info[500],
    light: COLOR.semantic.info[50],
    dark: COLOR.semantic.info[700],
    background: COLOR.semantic.info[50],
    text: COLOR.semantic.info[700],
  },
} as const;

