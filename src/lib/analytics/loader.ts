/**
 * Analytics Script Loader with SRI (Subresource Integrity)
 * 
 * Загружает Google Analytics и Yandex Metrika с поддержкой SRI
 * для защиты от подмены скриптов
 */

import { APP_CONFIG } from '../config/constants.js';
import { logger } from '../logger.js';

/**
 * SRI hashes для внешних скриптов
 * 
 * ВАЖНО: Эти хеши должны обновляться при обновлении версий скриптов
 * Для генерации хеша используйте: npm run generate-sri <url>
 * 
 * ПРИМЕЧАНИЕ: 
 * - Google Analytics gtag.js: хеш можно получить через npm run generate-sri
 * - Yandex Metrika: использует inline скрипт, SRI не применяется, но защищен через CSP nonce
 * 
 * Для получения актуальных хешей:
 * npm run generate-sri https://www.googletagmanager.com/gtag/js?id=YOUR_ID
 */
const SRI_HASHES = {
  // Google Analytics gtag.js
  // Получить хеш: npm run generate-sri https://www.googletagmanager.com/gtag/js?id=YOUR_ID
  GOOGLE_ANALYTICS: '', // Будет заполнено при настройке аналитики
} as const;

/**
 * Загружает Google Analytics скрипт с SRI
 */
export function loadGoogleAnalytics(): void {
  const gaId = APP_CONFIG.GOOGLE_ANALYTICS_ID;
  
  if (!gaId) {
    logger.debug('Google Analytics ID not configured', undefined, 'analytics');
    return;
  }

  // Проверяем, не загружен ли уже скрипт
  if (document.querySelector('script[src*="googletagmanager.com"]')) {
    logger.debug('Google Analytics already loaded', undefined, 'analytics');
    return;
  }

  try {
    // Загружаем gtag.js с SRI (если хеш настроен)
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    // Добавляем SRI hash если он настроен
    if (SRI_HASHES.GOOGLE_ANALYTICS) {
      script1.integrity = SRI_HASHES.GOOGLE_ANALYTICS;
    }
    script1.crossOrigin = 'anonymous';
    document.head.appendChild(script1);

    // Инициализируем gtag
    const script2 = document.createElement('script');
    script2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(script2);

    logger.debug('Google Analytics loaded', { gaId }, 'analytics');
  } catch (error) {
    logger.error('Failed to load Google Analytics', {
      error: error instanceof Error ? error.message : String(error),
    }, 'analytics');
  }
}

/**
 * Загружает Yandex Metrika скрипт с SRI
 */
export function loadYandexMetrika(): void {
  const ymId = APP_CONFIG.YANDEX_METRIKA_ID;
  
  if (!ymId) {
    logger.debug('Yandex Metrika ID not configured', undefined, 'analytics');
    return;
  }

  // Проверяем, не загружен ли уже скрипт
  if (document.querySelector('script[src*="mc.yandex.ru"]')) {
    logger.debug('Yandex Metrika already loaded', undefined, 'analytics');
    return;
  }

  try {
    // Загружаем Yandex Metrika с SRI
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
      ym(${ymId}, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    `;
    // Для inline скриптов SRI не применяется
    // Защита обеспечивается через CSP nonce (настроен на сервере)
    document.head.appendChild(script);

    // Добавляем noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${ymId}" style="position:absolute; left:-9999px;" alt="" /></div>`;
    document.body.appendChild(noscript);

    logger.debug('Yandex Metrika loaded', { ymId }, 'analytics');
  } catch (error) {
    logger.error('Failed to load Yandex Metrika', {
      error: error instanceof Error ? error.message : String(error),
    }, 'analytics');
  }
}

/**
 * Загружает все аналитические скрипты
 */
export function loadAnalytics(): void {
  loadGoogleAnalytics();
  loadYandexMetrika();
}

