'use client';

import { APP_CONFIG } from '@/lib/config';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiHome, FiSearch } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-8"
          aria-hidden="true"
        >
          <FiSearch className="text-primary-600 text-5xl" aria-hidden="true" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-bold text-gray-800 mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          Страница не найдена
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
        >
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[52px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Перейти на главную страницу"
          >
            <FiHome aria-hidden="true" />
            <span>На главную</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105 min-h-[52px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Вернуться на предыдущую страницу"
          >
            <FiArrowLeft aria-hidden="true" />
            <span>Назад</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Популярные страницы
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <Link
              href="/calculator"
              className="block p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
            >
              <div className="font-semibold text-gray-800 mb-1">Калькулятор стоимости</div>
              <div className="text-sm text-gray-600">Рассчитайте стоимость вашего авто</div>
            </Link>
            <Link
              href="/services"
              className="block p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
            >
              <div className="font-semibold text-gray-800 mb-1">Услуги</div>
              <div className="text-sm text-gray-600">Все услуги по выкупу автомобилей</div>
            </Link>
            <Link
              href="/faq"
              className="block p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
            >
              <div className="font-semibold text-gray-800 mb-1">FAQ</div>
              <div className="text-sm text-gray-600">Ответы на частые вопросы</div>
            </Link>
            <Link
              href="/contacts"
              className="block p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
            >
              <div className="font-semibold text-gray-800 mb-1">Контакты</div>
              <div className="text-sm text-gray-600">Свяжитесь с нами</div>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-gray-500"
        >
          <p>
            Нужна помощь? Позвоните нам:{' '}
            <a
              href={`tel:${APP_CONFIG.PHONE_1}`}
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              {APP_CONFIG.PHONE_1}
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
