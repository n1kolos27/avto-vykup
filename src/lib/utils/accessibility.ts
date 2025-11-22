// Утилиты для accessibility
export function getReducedMotionConfig<T>(withMotion: T, withoutMotion: T): T {
  // В React Native Web можно проверить prefers-reduced-motion
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return withoutMotion;
    }
  }
  return withMotion;
}

