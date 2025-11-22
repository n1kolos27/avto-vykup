import { useEffect } from 'react';

interface AnalyticsProps {
  googleAnalyticsId?: string;
  yandexMetrikaId?: string;
}

export default function Analytics({ googleAnalyticsId, yandexMetrikaId }: AnalyticsProps) {
  useEffect(() => {
    // Google Analytics
    if (googleAnalyticsId && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', googleAnalyticsId);
    }

    // Yandex Metrika
    if (yandexMetrikaId && typeof window !== 'undefined') {
      (function(m: any, e: any, t: any, r: any, i: any, k: any, a: any) {
        m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments) };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) { return; }
        }
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

      (window as any).ym(yandexMetrikaId, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    }
  }, [googleAnalyticsId, yandexMetrikaId]);

  return null;
}

