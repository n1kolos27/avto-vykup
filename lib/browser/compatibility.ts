/**
 * Матрица совместимости браузеров
 */

import type { BrowserName, OSName } from './detection';
import type { BrowserFeatures } from './features';

export interface CompatibilityMatrix {
  browser: BrowserName;
  minVersion: number;
  os: OSName[];
  features: Partial<BrowserFeatures>;
  notes?: string;
}

/**
 * Матрица совместимости для основных браузеров
 */
export const COMPATIBILITY_MATRIX: CompatibilityMatrix[] = [
  {
    browser: 'chrome',
    minVersion: 90,
    os: ['windows', 'macos', 'linux', 'android', 'ios'],
    features: {
      webp: true,
      avif: true,
      intersectionObserver: true,
      resizeObserver: true,
      clipboard: true,
      smoothScroll: true,
      cssGrid: true,
      flexbox: true,
      intl: true,
      fetch: true,
      promise: true,
      localStorage: true,
      sessionStorage: true,
      webWorkers: true,
      serviceWorkers: true,
      touchEvents: true,
      passiveListeners: true,
    },
  },
  {
    browser: 'firefox',
    minVersion: 88,
    os: ['windows', 'macos', 'linux', 'android'],
    features: {
      webp: true,
      avif: true,
      intersectionObserver: true,
      resizeObserver: true,
      clipboard: true,
      smoothScroll: true,
      cssGrid: true,
      flexbox: true,
      intl: true,
      fetch: true,
      promise: true,
      localStorage: true,
      sessionStorage: true,
      webWorkers: true,
      serviceWorkers: true,
      touchEvents: true,
      passiveListeners: true,
    },
  },
  {
    browser: 'safari',
    minVersion: 14,
    os: ['macos', 'ios'],
    features: {
      webp: true,
      avif: true,
      intersectionObserver: true,
      resizeObserver: true,
      clipboard: true,
      smoothScroll: true,
      cssGrid: true,
      flexbox: true,
      intl: true,
      fetch: true,
      promise: true,
      localStorage: true,
      sessionStorage: true,
      webWorkers: true,
      serviceWorkers: true,
      touchEvents: true,
      passiveListeners: true,
    },
  },
  {
    browser: 'edge',
    minVersion: 90,
    os: ['windows', 'macos', 'linux', 'android', 'ios'],
    features: {
      webp: true,
      avif: true,
      intersectionObserver: true,
      resizeObserver: true,
      clipboard: true,
      smoothScroll: true,
      cssGrid: true,
      flexbox: true,
      intl: true,
      fetch: true,
      promise: true,
      localStorage: true,
      sessionStorage: true,
      webWorkers: true,
      serviceWorkers: true,
      touchEvents: true,
      passiveListeners: true,
    },
  },
  {
    browser: 'opera',
    minVersion: 75,
    os: ['windows', 'macos', 'linux', 'android'],
    features: {
      webp: true,
      avif: true,
      intersectionObserver: true,
      resizeObserver: true,
      clipboard: true,
      smoothScroll: true,
      cssGrid: true,
      flexbox: true,
      intl: true,
      fetch: true,
      promise: true,
      localStorage: true,
      sessionStorage: true,
      webWorkers: true,
      serviceWorkers: true,
      touchEvents: true,
      passiveListeners: true,
    },
  },
  {
    browser: 'ie',
    minVersion: 11,
    os: ['windows'],
    features: {
      webp: false,
      avif: false,
      intersectionObserver: false,
      resizeObserver: false,
      clipboard: false,
      smoothScroll: false,
      cssGrid: false,
      flexbox: true,
      intl: false,
      fetch: false,
      promise: true,
      localStorage: true,
      sessionStorage: true,
      webWorkers: true,
      serviceWorkers: false,
      touchEvents: false,
      passiveListeners: false,
    },
    notes: 'Internet Explorer не поддерживается. Рекомендуется обновить браузер.',
  },
];

/**
 * Проверка совместимости браузера
 */
export interface CompatibilityCheck {
  isCompatible: boolean;
  isOutdated: boolean;
  missingFeatures: string[];
  recommendations: string[];
}

/**
 * Проверка совместимости текущего браузера
 */
export function checkCompatibility(
  browserName: BrowserName,
  browserVersion: string,
  os: OSName,
  features: BrowserFeatures
): CompatibilityCheck {
  const matrix = COMPATIBILITY_MATRIX.find((m) => m.browser === browserName);

  if (!matrix) {
    return {
      isCompatible: false,
      isOutdated: true,
      missingFeatures: ['unknown_browser'],
      recommendations: ['Используйте современный браузер: Chrome, Firefox, Safari или Edge'],
    };
  }

  const versionNum = parseInt(browserVersion, 10);
  const isOutdated = isNaN(versionNum) || versionNum < matrix.minVersion;

  // Проверка поддержки ОС
  const osSupported = matrix.os.includes(os) || matrix.os.length === 0;

  // Проверка отсутствующих функций
  const missingFeatures: string[] = [];
  const recommendations: string[] = [];

  if (matrix.features.webp && !features.webp) {
    missingFeatures.push('webp');
  }
  if (matrix.features.intersectionObserver && !features.intersectionObserver) {
    missingFeatures.push('intersectionObserver');
    recommendations.push('Установите полифилл для IntersectionObserver');
  }
  if (matrix.features.clipboard && !features.clipboard) {
    missingFeatures.push('clipboard');
  }
  if (matrix.features.cssGrid && !features.cssGrid) {
    missingFeatures.push('cssGrid');
    recommendations.push('Используйте Flexbox как fallback для CSS Grid');
  }
  if (matrix.features.intl && !features.intl) {
    missingFeatures.push('intl');
    recommendations.push('Установите полифилл для Intl API');
  }

  if (isOutdated) {
    recommendations.push(
      `Обновите ${browserName} до версии ${matrix.minVersion} или выше`
    );
  }

  if (!osSupported) {
    recommendations.push(`Ваша ОС может не поддерживаться полностью`);
  }

  if (matrix.notes) {
    recommendations.push(matrix.notes);
  }

  const isCompatible = !isOutdated && osSupported && missingFeatures.length === 0;

  return {
    isCompatible,
    isOutdated,
    missingFeatures,
    recommendations,
  };
}

/**
 * Получение рекомендуемого формата изображения
 */
export function getRecommendedImageFormat(features: BrowserFeatures): 'avif' | 'webp' | 'jpg' {
  if (features.avif) {
    return 'avif';
  }
  if (features.webp) {
    return 'webp';
  }
  return 'jpg';
}
