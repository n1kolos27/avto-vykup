'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDollarSign, FiClock, FiCheckCircle, FiFilter } from 'react-icons/fi';

const cases = [
  {
    title: 'BMW X5 2019 года',
    description: 'Клиент обратился после ДТП. Автомобиль требовал серьезного ремонта. Мы предложили справедливую цену с учетом остаточной стоимости и возможности восстановления.',
    result: '2 100 000 ₽',
    time: '1.5 часа',
    client: 'Александр М.',
    features: ['После ДТП', 'Справедливая оценка', 'Быстрая сделка'],
    category: 'after_accident',
  },
  {
    title: 'Mercedes-Benz C-Class 2020',
    description: 'Владелец планировал продать авто самостоятельно, но после консультации с нами решил воспользоваться нашими услугами. Получил деньги в тот же день.',
    result: '2 800 000 ₽',
    time: '2 часа',
    client: 'Мария К.',
    features: ['Отличное состояние', 'Моментальная оплата', 'Без хлопот'],
    category: 'excellent',
  },
  {
    title: 'Toyota Camry 2018',
    description: 'Автомобиль с большим пробегом, но в хорошем техническом состоянии. Мы оценили его честно, учитывая все факторы, и предложили рыночную цену.',
    result: '1 450 000 ₽',
    time: '1 час',
    client: 'Дмитрий С.',
    features: ['Большой пробег', 'Честная оценка', 'Официальное оформление'],
    category: 'high_mileage',
  },
  {
    title: 'Audi A6 2021',
    description: 'Премиальный автомобиль в идеальном состоянии. Владелец получил максимально выгодное предложение благодаря нашему опыту работы с премиум сегментом.',
    result: '3 200 000 ₽',
    time: '2.5 часа',
    client: 'Игорь В.',
    features: ['Премиум класс', 'Максимальная цена', 'Профессиональная оценка'],
    category: 'premium',
  },
  {
    title: 'Volkswagen Passat 2017',
    description: 'Кредитный автомобиль. Мы помогли клиенту решить вопрос с банком и оформили сделку быстро и без проблем.',
    result: '1 300 000 ₽',
    time: '3 часа',
    client: 'Елена П.',
    features: ['Кредитный авто', 'Помощь с банком', 'Быстрое оформление'],
    category: 'credit',
  },
  {
    title: 'Hyundai Solaris 2019',
    description: 'Популярная модель в хорошем состоянии. Клиент получил честную оценку и деньги сразу же после осмотра.',
    result: '950 000 ₽',
    time: '1 час',
    client: 'Сергей Н.',
    features: ['Популярная модель', 'Честная цена', 'Моментальная оплата'],
    category: 'popular',
  },
  {
    title: 'Nissan Qashqai 2020',
    description: 'Кроссовер с небольшим пробегом. Быстрая оценка и моментальная оплата позволили клиенту быстро решить свои задачи.',
    result: '1 650 000 ₽',
    time: '1.5 часа',
    client: 'Ольга С.',
    features: ['Кроссовер', 'Малый пробег', 'Быстрая сделка'],
    category: 'suv',
  },
  {
    title: 'Ford Focus 2016',
    description: 'Автомобиль требовал ремонта, но мы предложили справедливую цену с учетом всех факторов. Клиент остался доволен.',
    result: '750 000 ₽',
    time: '1 час',
    client: 'Андрей К.',
    features: ['Требует ремонта', 'Справедливая цена', 'Без проблем'],
    category: 'needs_repair',
  },
  {
    title: 'Lexus RX 2018',
    description: 'Премиальный кроссовер в отличном состоянии. Профессиональная оценка и максимально выгодные условия для клиента.',
    result: '3 500 000 ₽',
    time: '2 часа',
    client: 'Владимир Р.',
    features: ['Премиум', 'Отличное состояние', 'Выгодные условия'],
    category: 'premium',
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
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCases = selectedCategory === 'all' 
    ? cases 
    : cases.filter(c => c.category === selectedCategory);

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
            Реальные кейсы наших клиентов
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Примеры успешных сделок, которые показывают наш профессионализм и честный подход
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCases.map((caseItem, index) => (
              <motion.div
                key={`${caseItem.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{caseItem.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{caseItem.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-primary-600">
                    <FiDollarSign className="flex-shrink-0" />
                    <span className="font-semibold">Сумма: {caseItem.result}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FiClock className="flex-shrink-0" />
                    <span>Время: {caseItem.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FiCheckCircle className="flex-shrink-0" />
                    <span>Клиент: {caseItem.client}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {caseItem.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

