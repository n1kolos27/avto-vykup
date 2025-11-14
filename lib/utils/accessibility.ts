/**
 * Accessibility utilities
 * Утилиты для улучшения доступности сайта
 * Реализует WCAG 2.1 AA рекомендации
 */

/**
 * Hook для определения предпочтения пользователя по уменьшению анимаций
 * Проверяет медиа-запрос prefers-reduced-motion
 * @returns true если пользователь предпочитает уменьшенные анимации
 */
export function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

/**
 * Получить настройки анимации с учетом prefers-reduced-motion
 * @param animationConfig - Конфигурация анимации для обычного режима
 * @param reducedConfig - Конфигурация анимации для режима с уменьшенными анимациями (по умолчанию пустой объект)
 * @returns Конфигурация анимации
 */
export function getReducedMotionConfig<T extends Record<string, unknown>>(
  animationConfig: T,
  reducedConfig: Partial<T> = {}
): T {
  if (typeof window === 'undefined') {
    return animationConfig;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return { ...animationConfig, ...reducedConfig };
  }

  return animationConfig;
}

// Note: useFocusTrap removed - focus trap logic is now implemented directly in components
// This keeps the code simpler and more maintainable
