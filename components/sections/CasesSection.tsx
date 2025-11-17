'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiDollarSign, FiClock, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const cases = [
  {
    title: 'BMW X5 2019 года',
    description: 'Клиент обратился после ДТП. Автомобиль требовал серьезного ремонта. Мы предложили справедливую цену с учетом остаточной стоимости и возможности восстановления.',
    result: '2 100 000 ₽',
    time: '1.5 часа',
    client: 'Александр М.',
    features: ['После ДТП', 'Справедливая оценка', 'Быстрая сделка'],
    category: 'after_accident',
    mileage: 9302,
    year: 2019,
  },
  {
    title: 'Mercedes-Benz C-Class 2020',
    description: 'Владелец планировал продать авто самостоятельно, но после консультации с нами решил воспользоваться нашими услугами. Получил деньги в тот же день.',
    result: '2 800 000 ₽',
    time: '2 часа',
    client: 'Мария К.',
    features: ['Отличное состояние', 'Моментальная оплата', 'Без хлопот'],
    category: 'excellent',
    mileage: 21891,
    year: 2020,
  },
  {
    title: 'Toyota Camry 2018',
    description: 'Автомобиль с большим пробегом, но в хорошем техническом состоянии. Мы оценили его честно, учитывая все факторы, и предложили рыночную цену.',
    result: '1 450 000 ₽',
    time: '1 час',
    client: 'Дмитрий С.',
    features: ['Большой пробег', 'Честная оценка', 'Официальное оформление'],
    category: 'high_mileage',
    mileage: 31230,
    year: 2018,
  },
  {
    title: 'Audi A6 2021',
    description: 'Премиальный автомобиль в идеальном состоянии. Владелец получил максимально выгодное предложение благодаря нашему опыту работы с премиум сегментом.',
    result: '3 200 000 ₽',
    time: '2.5 часа',
    client: 'Игорь В.',
    features: ['Премиум класс', 'Максимальная цена', 'Профессиональная оценка'],
    category: 'premium',
    mileage: 45000,
    year: 2021,
  },
  {
    title: 'Volkswagen Passat 2017',
    description: 'Кредитный автомобиль. Мы помогли клиенту решить вопрос с банком и оформили сделку быстро и без проблем.',
    result: '1 300 000 ₽',
    time: '3 часа',
    client: 'Елена П.',
    features: ['Кредитный авто', 'Помощь с банком', 'Быстрое оформление'],
    category: 'credit',
    mileage: 67000,
    year: 2017,
  },
  {
    title: 'Hyundai Solaris 2019',
    description: 'Популярная модель в хорошем состоянии. Клиент получил честную оценку и деньги сразу же после осмотра.',
    result: '950 000 ₽',
    time: '1 час',
    client: 'Сергей Н.',
    features: ['Популярная модель', 'Честная цена', 'Моментальная оплата'],
    category: 'popular',
    mileage: 28000,
    year: 2019,
  },
  {
    title: 'Nissan Qashqai 2020',
    description: 'Кроссовер с небольшим пробегом. Быстрая оценка и моментальная оплата позволили клиенту быстро решить свои задачи.',
    result: '1 650 000 ₽',
    time: '1.5 часа',
    client: 'Ольга С.',
    features: ['Кроссовер', 'Малый пробег', 'Быстрая сделка'],
    category: 'suv',
    mileage: 35000,
    year: 2020,
  },
  {
    title: 'Ford Focus 2016',
    description: 'Автомобиль требовал ремонта, но мы предложили справедливую цену с учетом всех факторов. Клиент остался доволен.',
    result: '750 000 ₽',
    time: '1 час',
    client: 'Андрей К.',
    features: ['Требует ремонта', 'Справедливая цена', 'Без проблем'],
    category: 'needs_repair',
    mileage: 89000,
    year: 2016,
  },
  {
    title: 'Lexus RX 2018',
    description: 'Премиальный кроссовер в отличном состоянии. Профессиональная оценка и максимально выгодные условия для клиента.',
    result: '3 500 000 ₽',
    time: '2 часа',
    client: 'Владимир Р.',
    features: ['Премиум', 'Отличное состояние', 'Выгодные условия'],
    category: 'premium',
    mileage: 42000,
    year: 2018,
  },
];

const categories = [
  { value: 'all', label: 'Все кейсы' },
  { value: 'excellent', label: 'Отличное состояние' },
  { value: 'after_accident', label: 'После ДТП' },
  { value: 'premium', label: 'Премиум класс' },
  { value: 'credit', label: 'Кредитные авто' },
  { value: 'high_mileage', label: 'Большой пробег' },
  { value: 'needs_repair', label: 'Требует ремонта' },
];

export default function CasesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(cases.length / itemsPerPage);
  const visibleCases = cases.slice(currentIndex, currentIndex + itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= cases.length ? 0 : prev + itemsPerPage));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage < 0 ? (totalPages - 1) * itemsPerPage : prev - itemsPerPage));
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Последние выкупленные авто
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Реальные примеры успешных сделок наших клиентов
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Предыдущие автомобили"
          >
            <FiChevronLeft className="text-primary-600" size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Следующие автомобили"
          >
            <FiChevronRight className="text-primary-600" size={24} />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {visibleCases.map((caseItem, index) => (
                  <motion.div
                    key={`${caseItem.title}-${currentIndex}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Car Image Placeholder */}
                    <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🚗</div>
                        <p className="text-sm text-gray-600 font-semibold">{caseItem.title}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Год выпуска: {caseItem.year || caseItem.title.split(' ').pop()}</p>
                        <p className="text-sm text-gray-500 mb-1">Пробег: {(caseItem.mileage || 30000).toLocaleString('ru-RU')} км</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-2xl font-bold text-primary-600 mb-2">{caseItem.result}</p>
                        {caseItem.title.includes('битая') && (
                          <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                            Битая
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {caseItem.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Link to all cars */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <Link
              href="/cases"
              className="inline-flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              <span>Все автомобили</span>
              <FiChevronRight className="transform -rotate-90" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
