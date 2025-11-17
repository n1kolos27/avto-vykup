/**
 * Определение браузера, версии и ОС
 */

export type BrowserName = 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'ie' | 'unknown';
export type OSName = 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'unknown';
export type DeviceType = 'desktop' | 'tablet' | 'mobile' | 'unknown';

export interface BrowserInfo {
  name: BrowserName;
  version: string;
  fullVersion: string;
  os: OSName;
  osVersion: string;
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
}

/**
 * Проверка, что код выполняется в браузере
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Получение информации о браузере
 */
export function getBrowserInfo(): BrowserInfo {
  if (!isBrowser()) {
    return getDefaultBrowserInfo();
  }

  const userAgent = navigator.userAgent;
  const platform = navigator.platform.toLowerCase();

  // Определение ОС
  const os = detectOS(userAgent, platform);
  const osVersion = detectOSVersion(userAgent, os);

  // Определение типа устройства
  const deviceType = detectDeviceType(userAgent, platform);
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  // Определение браузера
  const browser = detectBrowser(userAgent);
  const version = detectBrowserVersion(userAgent, browser);

  return {
    name: browser,
    version,
    fullVersion: getFullVersion(userAgent, browser),
    os,
    osVersion,
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    userAgent,
  };
}

/**
 * Определение ОС
 */
function detectOS(userAgent: string, platform: string): OSName {
  if (/win/i.test(platform) || /win/i.test(userAgent)) {
    return 'windows';
  }
  if (/mac/i.test(platform) || /mac/i.test(userAgent)) {
    return 'macos';
  }
  if (/linux/i.test(platform) || /linux/i.test(userAgent)) {
    return 'linux';
  }
  if (/iphone|ipod/i.test(userAgent)) {
    return 'ios';
  }
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  return 'unknown';
}

/**
 * Определение версии ОС
 */
function detectOSVersion(userAgent: string, os: OSName): string {
  if (os === 'ios') {
    const match = userAgent.match(/OS (\d+)[._](\d+)/);
    if (match) {
      return `${match[1]}.${match[2]}`;
    }
  }
  if (os === 'android') {
    const match = userAgent.match(/Android (\d+)[._](\d+)/);
    if (match) {
      return `${match[1]}.${match[2]}`;
    }
  }
  if (os === 'windows') {
    const match = userAgent.match(/Windows NT (\d+)[._](\d+)/);
    if (match) {
      const major = match[1];
      const minor = match[2];
      if (major === '10' && minor === '0') return '10';
      if (major === '6' && minor === '1') return '7';
      if (major === '6' && minor === '3') return '8.1';
      return `${major}.${minor}`;
    }
  }
  if (os === 'macos') {
    const match = userAgent.match(/Mac OS X (\d+)[._](\d+)/);
    if (match) {
      return `${match[1]}.${match[2]}`;
    }
  }
  return 'unknown';
}

/**
 * Определение типа устройства
 */
function detectDeviceType(userAgent: string, _platform: string): DeviceType {
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  if (
    /mobile|iphone|ipod|android|blackberry|opera|mini|windows\s+ce|palm|smartphone|iemobile/i.test(
      userAgent
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Определение браузера
 */
function detectBrowser(userAgent: string): BrowserName {
  if (/edg/i.test(userAgent)) {
    return 'edge';
  }
  if (/chrome/i.test(userAgent) && !/edg|opr/i.test(userAgent)) {
    return 'chrome';
  }
  if (/firefox/i.test(userAgent)) {
    return 'firefox';
  }
  if (/safari/i.test(userAgent) && !/chrome|edg/i.test(userAgent)) {
    return 'safari';
  }
  if (/opr|opera/i.test(userAgent)) {
    return 'opera';
  }
  if (/msie|trident/i.test(userAgent)) {
    return 'ie';
  }
  return 'unknown';
}

/**
 * Определение версии браузера
 */
function detectBrowserVersion(userAgent: string, browser: BrowserName): string {
  let match: RegExpMatchArray | null = null;

  switch (browser) {
    case 'chrome':
      match = userAgent.match(/Chrome\/(\d+)/);
      break;
    case 'firefox':
      match = userAgent.match(/Firefox\/(\d+)/);
      break;
    case 'safari':
      match = userAgent.match(/Version\/(\d+)/);
      break;
    case 'edge':
      match = userAgent.match(/Edg\/(\d+)/);
      break;
    case 'opera':
      match = userAgent.match(/OPR\/(\d+)/);
      break;
    case 'ie':
      match = userAgent.match(/(?:MSIE |rv:)(\d+)/);
      break;
  }

  return match ? match[1] : 'unknown';
}

/**
 * Получение полной версии браузера
 */
function getFullVersion(userAgent: string, browser: BrowserName): string {
  let match: RegExpMatchArray | null = null;

  switch (browser) {
    case 'chrome':
      match = userAgent.match(/Chrome\/([\d.]+)/);
      break;
    case 'firefox':
      match = userAgent.match(/Firefox\/([\d.]+)/);
      break;
    case 'safari':
      match = userAgent.match(/Version\/([\d.]+)/);
      break;
    case 'edge':
      match = userAgent.match(/Edg\/([\d.]+)/);
      break;
    case 'opera':
      match = userAgent.match(/OPR\/([\d.]+)/);
      break;
    case 'ie':
      match = userAgent.match(/(?:MSIE |rv:)([\d.]+)/);
      break;
  }

  return match ? match[1] : 'unknown';
}

/**
 * Дефолтная информация о браузере (для SSR)
 */
function getDefaultBrowserInfo(): BrowserInfo {
  return {
    name: 'unknown',
    version: 'unknown',
    fullVersion: 'unknown',
    os: 'unknown',
    osVersion: 'unknown',
    deviceType: 'unknown',
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    userAgent: '',
  };
}

/**
 * Проверка, является ли браузер устаревшим
 */
export function isOutdatedBrowser(browserInfo: BrowserInfo): boolean {
  const { name, version } = browserInfo;

  if (name === 'unknown') {
    return false; // Не можем определить, считаем что нормально
  }

  const versionNum = parseInt(version, 10);
  if (isNaN(versionNum)) {
    return false;
  }

  // Минимальные версии браузеров
  const minVersions: Record<BrowserName, number> = {
    chrome: 90,
    firefox: 88,
    safari: 14,
    edge: 90,
    opera: 75,
    ie: 11, // IE вообще не поддерживается
    unknown: 0,
  };

  const minVersion = minVersions[name] || 0;

  // IE всегда считается устаревшим
  if (name === 'ie') {
    return true;
  }

  return versionNum < minVersion;
}
