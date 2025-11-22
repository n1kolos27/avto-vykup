import { useThemeContext } from './ThemeContext.js';

/**
 * Хук для работы с темой приложения
 * @returns Объект с текущей темой, resolved темой и методами для управления
 * 
 * @example
 * ```tsx
 * const { resolvedTheme, toggleTheme } = useTheme();
 * 
 * return (
 *   <button onClick={toggleTheme}>
 *     Текущая тема: {resolvedTheme}
 *   </button>
 * );
 * ```
 */
export const useTheme = () => {
  return useThemeContext();
};

