/**
 * Browser detection and compatibility module
 *
 * Модуль для определения браузера, проверки возможностей и совместимости
 */

// Detection
export {
  getBrowserInfo,
  isOutdatedBrowser,
  isBrowser,
  type BrowserInfo,
  type BrowserName,
  type OSName,
  type DeviceType,
} from './detection';

// Features
export {
  supportsWebP,
  supportsAVIF,
  supportsIntersectionObserver,
  supportsResizeObserver,
  supportsClipboard,
  supportsSmoothScroll,
  supportsCSSGrid,
  supportsFlexbox,
  supportsIntl,
  supportsFetch,
  supportsPromise,
  supportsLocalStorage,
  supportsSessionStorage,
  supportsWebWorkers,
  supportsServiceWorkers,
  supportsTouchEvents,
  supportsPassiveListeners,
  getBrowserFeatures,
  type BrowserFeatures,
} from './features';

// Compatibility
export {
  checkCompatibility,
  getRecommendedImageFormat,
  COMPATIBILITY_MATRIX,
  type CompatibilityCheck,
  type CompatibilityMatrix,
} from './compatibility';

// Hooks (client-side only)
export {
  useBrowserInfo,
  useBrowserCapabilities,
  useFeatureSupport,
  useBrowserCompatibility,
  useIsOutdatedBrowser,
  useRecommendedImageFormat,
} from './hooks';
