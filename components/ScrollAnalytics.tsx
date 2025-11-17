'use client';

import { useEffect } from 'react';
import { trackScrollDepth, trackTimeOnPage } from '@/lib/analytics/events';

export default function ScrollAnalytics() {
  useEffect(() => {
    // Проверяем, что мы на клиенте
    if (typeof window === 'undefined') return;

    // Отложенная инициализация после загрузки страницы
    let cleanup: (() => void) | null = null;

    const initScrollAnalytics = () => {
      const startTime = Date.now();
      const scrollDepths = [25, 50, 75, 90, 100];
      const trackedDepths = new Set<number>();
      let rafId: number | null = null;

      const handleScroll = () => {
        // Используем requestAnimationFrame для оптимизации
        if (rafId !== null) return;

        rafId = requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY;
          const scrollPercent = Math.round(
            ((scrollTop + windowHeight) / documentHeight) * 100
          );

          scrollDepths.forEach((depth) => {
            if (scrollPercent >= depth && !trackedDepths.has(depth)) {
              trackedDepths.add(depth);
              trackScrollDepth(depth);
            }
          });

          rafId = null;
        });
      };

      const handleUnload = () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (timeSpent > 0) {
          trackTimeOnPage(timeSpent);
        }
      };

      // Ждем полной загрузки страницы перед добавлением слушателей
      if (document.readyState === 'complete') {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('beforeunload', handleUnload);
        window.addEventListener('pagehide', handleUnload);
      } else {
        const loadHandler = () => {
          window.addEventListener('scroll', handleScroll, { passive: true });
          window.addEventListener('beforeunload', handleUnload);
          window.addEventListener('pagehide', handleUnload);
        };
        window.addEventListener('load', loadHandler, { once: true });
      }

      // Track time on page every 30 seconds
      const timeInterval = setInterval(() => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackTimeOnPage(timeSpent);
      }, 30000);

      cleanup = () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('beforeunload', handleUnload);
        window.removeEventListener('pagehide', handleUnload);
        clearInterval(timeInterval);
      };
    };

    // Используем requestIdleCallback для отложенной инициализации
    let idleCallbackId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    if ('requestIdleCallback' in window) {
      idleCallbackId = window.requestIdleCallback(initScrollAnalytics, { timeout: 3000 });
    } else {
      // Fallback для браузеров без requestIdleCallback
      timeoutId = setTimeout(initScrollAnalytics, 1000);
    }

    return () => {
      if (idleCallbackId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  return null;
}
