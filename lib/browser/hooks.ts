/**
 * React hooks для работы с возможностями браузера
 */

'use client';

import { useState, useEffect } from 'react';
import { getBrowserInfo, type BrowserInfo, isOutdatedBrowser } from './detection';
import { getBrowserFeatures, type BrowserFeatures } from './features';
import { checkCompatibility, type CompatibilityCheck } from './compatibility';

/**
 * Hook для получения информации о браузере
 */
export function useBrowserInfo(): BrowserInfo {
  // На сервере всегда возвращаем дефолтные значения
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>(() => {
    // На сервере возвращаем дефолтные значения для избежания hydration error
    if (typeof window === 'undefined') {
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
    // На клиенте получаем реальную информацию
    return getBrowserInfo();
  });

  useEffect(() => {
    // Обновляем только на клиенте после монтирования
    if (typeof window !== 'undefined') {
      setBrowserInfo(getBrowserInfo());
    }
  }, []);

  return browserInfo;
}

/**
 * Hook для получения возможностей браузера
 */
export function useBrowserCapabilities(): BrowserFeatures {
  // На сервере всегда возвращаем дефолтные значения (все false)
  const [features, setFeatures] = useState<BrowserFeatures>(() => {
    if (typeof window === 'undefined') {
      // На сервере возвращаем все false для избежания hydration error
      return {
        webp: false,
        avif: false,
        intersectionObserver: false,
        resizeObserver: false,
        clipboard: false,
        smoothScroll: false,
        cssGrid: false,
        flexbox: false,
        intl: false,
        fetch: false,
        promise: false,
        localStorage: false,
        sessionStorage: false,
        webWorkers: false,
        serviceWorkers: false,
        touchEvents: false,
        passiveListeners: false,
      };
    }
    // На клиенте получаем реальные возможности
    return getBrowserFeatures();
  });

  useEffect(() => {
    // Обновляем только на клиенте после монтирования
    if (typeof window !== 'undefined') {
      setFeatures(getBrowserFeatures());
    }
  }, []);

  return features;
}

/**
 * Hook для проверки поддержки конкретной функции
 */
export function useFeatureSupport(featureName: keyof BrowserFeatures): boolean {
  const features = useBrowserCapabilities();
  return features[featureName] ?? false;
}

/**
 * Hook для проверки совместимости браузера
 */
export function useBrowserCompatibility(): CompatibilityCheck {
  const browserInfo = useBrowserInfo();
  const features = useBrowserCapabilities();

  const [compatibility, setCompatibility] = useState<CompatibilityCheck>(() => {
    if (typeof window === 'undefined') {
      return {
        isCompatible: true,
        isOutdated: false,
        missingFeatures: [],
        recommendations: [],
      };
    }

    return checkCompatibility(
      browserInfo.name,
      browserInfo.version,
      browserInfo.os,
      features
    );
  });

  useEffect(() => {
    setCompatibility(
      checkCompatibility(
        browserInfo.name,
        browserInfo.version,
        browserInfo.os,
        features
      )
    );
  }, [browserInfo, features]);

  return compatibility;
}

/**
 * Hook для проверки, является ли браузер устаревшим
 */
export function useIsOutdatedBrowser(): boolean {
  const browserInfo = useBrowserInfo();
  // На сервере всегда false для избежания hydration error
  const [isOutdated, setIsOutdated] = useState(false);

  useEffect(() => {
    // Проверяем только на клиенте после монтирования
    if (typeof window !== 'undefined') {
      setIsOutdated(isOutdatedBrowser(browserInfo));
    }
  }, [browserInfo]);

  return isOutdated;
}

/**
 * Hook для получения рекомендуемого формата изображения
 */
export function useRecommendedImageFormat(): 'avif' | 'webp' | 'jpg' {
  const features = useBrowserCapabilities();

  if (features.avif) {
    return 'avif';
  }
  if (features.webp) {
    return 'webp';
  }
  return 'jpg';
}
