/**
 * Проверка поддержки функций браузера
 */

/**
 * Проверка поддержки WebP
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch {
    return false;
  }
}

/**
 * Проверка поддержки AVIF
 */
export function supportsAVIF(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  } catch {
    return false;
  }
}

/**
 * Проверка поддержки IntersectionObserver
 */
export function supportsIntersectionObserver(): boolean {
  return typeof window !== 'undefined' && 'IntersectionObserver' in window;
}

/**
 * Проверка поддержки ResizeObserver
 */
export function supportsResizeObserver(): boolean {
  return typeof window !== 'undefined' && 'ResizeObserver' in window;
}

/**
 * Проверка поддержки Clipboard API
 */
export function supportsClipboard(): boolean {
  return (
    typeof window !== 'undefined' &&
    'navigator' in window &&
    'clipboard' in navigator &&
    'writeText' in navigator.clipboard
  );
}

/**
 * Проверка поддержки smooth scroll
 */
export function supportsSmoothScroll(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  return 'scrollBehavior' in document.documentElement.style;
}

/**
 * Проверка поддержки CSS Grid
 */
export function supportsCSSGrid(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return CSS.supports('display', 'grid');
}

/**
 * Проверка поддержки Flexbox
 */
export function supportsFlexbox(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return CSS.supports('display', 'flex');
}

/**
 * Проверка поддержки Intl API
 */
export function supportsIntl(): boolean {
  return typeof Intl !== 'undefined';
}

/**
 * Проверка поддержки Fetch API
 */
export function supportsFetch(): boolean {
  return typeof fetch !== 'undefined';
}

/**
 * Проверка поддержки Promise
 */
export function supportsPromise(): boolean {
  return typeof Promise !== 'undefined';
}

/**
 * Проверка поддержки localStorage
 */
export function supportsLocalStorage(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Проверка поддержки sessionStorage
 */
export function supportsSessionStorage(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const test = '__sessionStorage_test__';
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Проверка поддержки Web Workers
 */
export function supportsWebWorkers(): boolean {
  return typeof Worker !== 'undefined';
}

/**
 * Проверка поддержки Service Workers
 */
export function supportsServiceWorkers(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'serviceWorker' in window
  );
}

/**
 * Проверка поддержки Touch Events
 */
export function supportsTouchEvents(): boolean {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );
}

/**
 * Проверка поддержки Passive Event Listeners
 */
export function supportsPassiveListeners(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true;
        return false;
      },
    });
    window.addEventListener('test', () => {}, opts);
    window.removeEventListener('test', () => {}, opts);
  } catch {
    // Не поддерживается
  }

  return supportsPassive;
}

/**
 * Получение всех поддерживаемых функций
 */
export interface BrowserFeatures {
  webp: boolean;
  avif: boolean;
  intersectionObserver: boolean;
  resizeObserver: boolean;
  clipboard: boolean;
  smoothScroll: boolean;
  cssGrid: boolean;
  flexbox: boolean;
  intl: boolean;
  fetch: boolean;
  promise: boolean;
  localStorage: boolean;
  sessionStorage: boolean;
  webWorkers: boolean;
  serviceWorkers: boolean;
  touchEvents: boolean;
  passiveListeners: boolean;
}

/**
 * Получение всех поддерживаемых функций
 */
export function getBrowserFeatures(): BrowserFeatures {
  return {
    webp: supportsWebP(),
    avif: supportsAVIF(),
    intersectionObserver: supportsIntersectionObserver(),
    resizeObserver: supportsResizeObserver(),
    clipboard: supportsClipboard(),
    smoothScroll: supportsSmoothScroll(),
    cssGrid: supportsCSSGrid(),
    flexbox: supportsFlexbox(),
    intl: supportsIntl(),
    fetch: supportsFetch(),
    promise: supportsPromise(),
    localStorage: supportsLocalStorage(),
    sessionStorage: supportsSessionStorage(),
    webWorkers: supportsWebWorkers(),
    serviceWorkers: supportsServiceWorkers(),
    touchEvents: supportsTouchEvents(),
    passiveListeners: supportsPassiveListeners(),
  };
}
