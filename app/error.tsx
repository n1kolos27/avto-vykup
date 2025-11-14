'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiHome, FiRefreshCw } from 'react-icons/fi';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Логирование ошибки в production
    if (process.env.NODE_ENV === 'production') {
      console.error('Application error:', {
        message: error.message,
        stack: error.stack,
        digest: error.digest,
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 md:p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6"
        >
          <FiAlertCircle className="text-red-600 text-4xl" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Что-то пошло не так
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Произошла непредвиденная ошибка. Мы уже работаем над её устранением.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
            <p className="text-sm font-semibold text-red-800 mb-2">Детали ошибки (только в dev режиме):</p>
            <p className="text-sm text-red-700 font-mono break-all">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="flex items-center justify-center space-x-2"
            size="lg"
          >
            <FiRefreshCw />
            <span>Попробовать снова</span>
          </Button>

          <Link href="/">
            <Button
              variant="secondary"
              className="flex items-center justify-center space-x-2 w-full sm:w-auto"
              size="lg"
            >
              <FiHome />
              <span>На главную</span>
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Если проблема повторяется, пожалуйста,{' '}
          <Link href="/contacts" className="text-primary-600 hover:text-primary-700 underline">
            свяжитесь с нами
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

