import { useThemeContext } from './ThemeContext';

/**
 * Хук для работы с темой приложения
 */
export const useTheme = () => {
  return useThemeContext();
};
