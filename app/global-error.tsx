'use client';

import { useEffect } from 'react';
import { FiAlertCircle, FiHome } from 'react-icons/fi';
import Link from 'next/link';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Критическое логирование
    console.error('Global application error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="ru">
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <FiAlertCircle className="text-red-600 text-3xl" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Критическая ошибка
            </h1>

            <p className="text-gray-600 mb-8">
              Произошла критическая ошибка приложения. Пожалуйста, обновите страницу или вернитесь на главную.
            </p>

            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Обновить страницу
              </button>

              <Link
                href="/"
                className="block w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <span className="flex items-center justify-center space-x-2">
                  <FiHome />
                  <span>На главную</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

