'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import PhoneButton from '@/components/PhoneButton';
import Breadcrumbs from '@/components/Breadcrumbs';
import { trackFormSubmit } from '@/lib/analytics/events';
import { toast } from '@/lib/toast';
import { APP_CONFIG } from '@/lib/config';

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export default function ContactsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const phone1 = APP_CONFIG.PHONE_1;
  const phone2 = APP_CONFIG.PHONE_2;
  const email = APP_CONFIG.EMAIL;

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка при отправке сообщения');
      }

      trackFormSubmit('contact');
      toast.success('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
      setIsSubmitted(true);
      reset();
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка. Попробуйте позже.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs className="mb-6" />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Контакты
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь вам
              продать автомобиль быстро и выгодно.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Свяжитесь с нами
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <FiPhone className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Телефоны</h3>
                      <div className="space-y-2">
                        <a
                          href={`tel:${phone1}`}
                          className="block text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                        >
                          {phone1}
                        </a>
                        <a
                          href={`tel:${phone2}`}
                          className="block text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                        >
                          {phone2}
                        </a>
                      </div>
                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <PhoneButton phone={phone1} />
                        <PhoneButton phone={phone2} variant="secondary" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <FiMail className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                      <a
                        href={`mailto:${email}`}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <FiMapPin className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Регион работы</h3>
                      <p className="text-gray-600">Москва и Московская область</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <FiClock className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Режим работы</h3>
                      <p className="text-gray-600">Ежедневно: 9:00 - 21:00</p>
                      <p className="text-gray-600 text-sm">Без выходных</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-primary-600 text-white p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-3">Почему выбирают нас?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>Оценка за 5 минут</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>Честная рыночная цена</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>Моментальная оплата</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>Официальное оформление</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>Работаем с любым состоянием</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Форма обратной связи
              </h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
                  <p className="font-semibold">Спасибо за ваше обращение!</p>
                  <p className="text-sm mt-1">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4">
                  <p className="font-semibold">Ошибка отправки</p>
                  <p className="text-sm mt-1">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                  >
                    Закрыть
                  </button>
                </div>
              ) : null}

              {!isSubmitted && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Ваше имя *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      {...register('name', { required: 'Укажите имя' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px]"
                      placeholder="Иван"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      {...register('phone', {
                        required: 'Укажите телефон',
                        pattern: {
                          value: /^[\d\s\-\+\(\)]+$/,
                          message: 'Неверный формат телефона',
                        },
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px]"
                      placeholder="+7 (999) 123-45-67"
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="contact-phone-error" className="text-red-500 text-sm mt-1" role="alert">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email (необязательно)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      {...register('email')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px]"
                      placeholder="ivan@example.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                      Сообщение *
                    </label>
                    <textarea
                      id="contact-message"
                      {...register('message', {
                        required: 'Напишите сообщение',
                        minLength: { value: 10, message: 'Минимум 10 символов' },
                      })}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px]"
                      placeholder="Расскажите о вашем автомобиле или задайте вопрос..."
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="text-red-500 text-sm mt-1" role="alert">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label={isLoading ? 'Отправка сообщения...' : 'Отправить сообщение'}
                    aria-busy={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Отправка...
                      </>
                    ) : (
                      'Отправить сообщение'
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">О компании</h2>
              <p className="text-gray-600 mb-4">
                Мы работаем на рынке выкупа автомобилей более 10 лет. За это время мы
                помогли более 5000 клиентам продать свои автомобили быстро и выгодно.
              </p>
              <p className="text-gray-600 mb-4">
                Наша компания специализируется на выкупе автомобилей всех марок и моделей
                в любом состоянии. Мы работаем честно, быстро и профессионально.
              </p>
              <p className="text-gray-600">
                Наша цель - сделать процесс продажи автомобиля максимально простым и
                выгодным для наших клиентов.
              </p>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Зоны работы</h2>
              <p className="text-gray-600 mb-4">
                Мы работаем по всей Москве и Московской области. Наш специалист может
                приехать к вам в любое удобное место.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">Москва:</h3>
                <p className="text-gray-600 text-sm">
                  Все районы и округа. Выезд в течение 1-2 часов.
                </p>
                <h3 className="font-semibold text-gray-800 mt-4">Московская область:</h3>
                <p className="text-gray-600 text-sm">
                  Все города и районы МО. Время выезда зависит от удаленности.
                </p>
              </div>
              <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                <p className="text-primary-800 text-sm font-medium">
                  💡 Мы можем организовать эвакуатор для транспортировки автомобиля, если
                  он не на ходу или находится далеко.
                </p>
              </div>
            </motion.section>
          </div>

          <div className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Зоны работы на карте</h2>
              <p className="text-gray-600 mb-4">
                Мы работаем по всей Москве и Московской области. Нажмите на карту для просмотра в полном размере.
              </p>
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.6173%2C55.7558&z=10&pt=37.6173%2C55.7558&l=map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="relative"
                  title="Карта зон работы"
                ></iframe>
              </div>
            </motion.div>
          </div>

          {/* Services Section */}
          <section className="mt-16 bg-primary-600 text-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Наши услуги по выкупу автомобилей
            </h2>
            <p className="text-lg text-primary-100 mb-8 text-center max-w-3xl mx-auto">
              Свяжитесь с нами для получения консультации по любой из наших услуг. Каждая услуга имеет отдельную страницу с детальной информацией.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/services/urgent-buyback"
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
              >
                <h3 className="font-semibold mb-2">Срочный выкуп</h3>
                <p className="text-sm text-primary-100">Выкуп за 2 часа</p>
              </Link>
              <Link
                href="/services/damaged-cars"
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
              >
                <h3 className="font-semibold mb-2">Выкуп битых авто</h3>
                <p className="text-sm text-primary-100">Любая степень повреждения</p>
              </Link>
              <Link
                href="/services/after-accident"
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
              >
                <h3 className="font-semibold mb-2">Выкуп после ДТП</h3>
                <p className="text-sm text-primary-100">Оценка остаточной стоимости</p>
              </Link>
              <Link
                href="/services/credit-cars"
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
              >
                <h3 className="font-semibold mb-2">Выкуп кредитных авто</h3>
                <p className="text-sm text-primary-100">Помощь с банком</p>
              </Link>
              <Link
                href="/services/premium-cars"
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
              >
                <h3 className="font-semibold mb-2">Выкуп премиум авто</h3>
                <p className="text-sm text-primary-100">Элитные автомобили</p>
              </Link>
              <Link
                href="/services/buyback-cars"
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors text-center"
              >
                <h3 className="font-semibold mb-2">Выкуп автомобилей</h3>
                <p className="text-sm text-primary-100">Все марки и модели</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
