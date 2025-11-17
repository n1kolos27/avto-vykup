'use client';

import React, { useState, useEffect } from 'react';
import { FiAlertTriangle, FiX, FiDownload } from 'react-icons/fi';
import { useIsOutdatedBrowser, useBrowserInfo } from '@/lib/browser';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BrowserWarning - компонент предупреждения для устаревших браузеров
 *
 * Показывает предупреждение только для критично старых версий браузеров
 * с рекомендациями по обновлению
 */
export default function BrowserWarning() {
  const isOutdated = useIsOutdatedBrowser();
  const browserInfo = useBrowserInfo();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Отслеживаем монтирование компонента
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Показываем только после монтирования и только для устаревших браузеров
    if (!isMounted) return;

    if (isOutdated && !isDismissed) {
      // Проверяем, не было ли предупреждение закрыто ранее
      if (typeof window !== 'undefined') {
        const dismissed = localStorage.getItem('browser-warning-dismissed');
        if (!dismissed) {
          setIsVisible(true);
        }
      }
    }
  }, [isOutdated, isDismissed, isMounted]);

  // Не рендерим ничего до монтирования (избегаем hydration error)
  if (!isMounted) {
    return null;
  }

  if (!isVisible || !isOutdated) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);

    // Сохраняем в localStorage, чтобы не показывать снова
    if (typeof window !== 'undefined') {
      localStorage.setItem('browser-warning-dismissed', 'true');
    }
  };

  // Получаем ссылки для скачивания браузера (только после монтирования)
  const downloadLink = React.useMemo(() => {
    if (!isMounted || browserInfo.name === 'unknown') {
      return null;
    }

    const links: Record<string, { name: string; url: string }> = {
      chrome: {
        name: 'Google Chrome',
        url: 'https://www.google.com/chrome/',
      },
      firefox: {
        name: 'Mozilla Firefox',
        url: 'https://www.mozilla.org/firefox/',
      },
      safari: {
        name: 'Safari',
        url: 'https://www.apple.com/safari/',
      },
      edge: {
        name: 'Microsoft Edge',
        url: 'https://www.microsoft.com/edge',
      },
      opera: {
        name: 'Opera',
        url: 'https://www.opera.com/',
      },
    };

    return links[browserInfo.name] || null;
  }, [isMounted, browserInfo.name]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-yellow-50 border-b border-yellow-200 shadow-lg"
          role="alert"
          aria-live="polite"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <FiAlertTriangle
                  className="text-yellow-600 mt-1 flex-shrink-0"
                  size={20}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-yellow-800 mb-1">
                    Устаревший браузер
                  </h3>
                  <p className="text-sm text-yellow-700">
                    Вы используете устаревшую версию браузера
                    {browserInfo.name !== 'unknown' && (
                      <>
                        {' '}
                        <strong>{browserInfo.name}</strong>
                        {browserInfo.version !== 'unknown' && ` (версия ${browserInfo.version})`}
                      </>
                    )}
                    . Для лучшей работы сайта рекомендуется обновить браузер до последней
                    версии.
                  </p>
                  {downloadLink && (
                    <a
                      href={downloadLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-yellow-800 hover:text-yellow-900 underline"
                    >
                      <FiDownload size={16} aria-hidden="true" />
                      Скачать {downloadLink.name}
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 rounded transition-colors"
                aria-label="Закрыть предупреждение"
              >
                <FiX size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
