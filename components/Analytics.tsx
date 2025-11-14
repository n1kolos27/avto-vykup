'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/analytics/google-analytics';
import { YANDEX_METRIKA_ID } from '@/lib/analytics/yandex-metrika';

export default function Analytics() {
  // Отложенная загрузка аналитики после полной загрузки страницы
  useEffect(() => {
    // Аналитика загружается только после того, как страница полностью загружена
    if (typeof window === 'undefined') return;

    // Используем requestIdleCallback для отложенной загрузки, если доступно
    const loadAnalytics = () => {
      // Аналитика уже загружается через Script компоненты с strategy="afterInteractive"
      // Этот эффект просто гарантирует, что мы не блокируем рендеринг
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadAnalytics, { timeout: 2000 });
    } else {
      // Fallback для браузеров без requestIdleCallback
      setTimeout(loadAnalytics, 2000);
    }
  }, []);

  // Если нет ID аналитики, не рендерим ничего
  if (!GA_TRACKING_ID && !YANDEX_METRIKA_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      {GA_TRACKING_ID && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Yandex Metrika */}
      {YANDEX_METRIKA_ID && (
        <>
          <Script
            id="yandex-metrika"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(${YANDEX_METRIKA_ID}, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
                });
              `,
            }}
          />
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
                className="absolute -left-[9999px]"
                alt=""
              />
            </div>
          </noscript>
        </>
      )}
    </>
  );
}
