/**
 * Spacing Utilities
 * 
 * Утилиты для работы со spacing системой.
 * Все значения основаны на базовой единице 4px.
 */

import { spacing } from './tokens';

/**
 * Получить spacing значение по ключу
 */
export function getSpacing(key: keyof typeof spacing): string {
  return spacing[key];
}

/**
 * Spacing scale для использования в компонентах
 */
export const SPACING = {
  /** 0px */
  NONE: spacing[0],
  /** 4px */
  XS: spacing[1],
  /** 8px */
  SM: spacing[2],
  /** 12px */
  MD: spacing[3],
  /** 16px */
  BASE: spacing[4],
  /** 20px */
  LG: spacing[5],
  /** 24px */
  XL: spacing[6],
  /** 32px */
  '2XL': spacing[8],
  /** 40px */
  '3XL': spacing[10],
  /** 48px */
  '4XL': spacing[12],
  /** 64px */
  '5XL': spacing[16],
  /** 80px */
  '6XL': spacing[20],
  /** 96px */
  '7XL': spacing[24],
  /** 128px */
  '8XL': spacing[32],
} as const;

/**
 * Предустановленные spacing комбинации для часто используемых паттернов
 */
export const SPACING_PRESETS = {
  /** Компактный padding для маленьких элементов */
  compact: {
    padding: SPACING.SM, // 8px
    gap: SPACING.XS,     // 4px
  },
  /** Стандартный padding для большинства элементов */
  standard: {
    padding: SPACING.BASE, // 16px
    gap: SPACING.MD,       // 12px
  },
  /** Увеличенный padding для больших элементов */
  comfortable: {
    padding: SPACING.XL,  // 24px
    gap: SPACING.BASE,     // 16px
  },
  /** Большой padding для секций */
  spacious: {
    padding: SPACING['2XL'], // 32px
    gap: SPACING.XL,         // 24px
  },
} as const;

