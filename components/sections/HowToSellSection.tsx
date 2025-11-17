'use client';

import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const steps = [
  {
    number: 1,
    title: 'Онлайн-оценка автомобиля',
    description: 'Заполните форму на сайте или позвоните нам. Наш специалист проведет предварительную оценку вашего автомобиля.',
    benefits: [
      'Бесплатная оценка за 5 минут',
      'Учитываем все факторы: марку, модель, год, пробег, состояние',
      'Честная рыночная цена без занижения',
    ],
  },
  {
    number: 2,
    title: 'Бесплатный выезд специалиста',
    description: 'Наш эксперт приедет к вам в удобное время для детального осмотра автомобиля.',
    benefits: [
      'Выезд в день обращения',
      'Профессиональная диагностика',
      'Уточнение окончательной стоимости',
    ],
  },
  {
    number: 3,
    title: 'Подготовка документов',
    description: 'Мы помогаем собрать все необходимые документы и проверяем автомобиль на ограничения.',
    benefits: [
      'Помощь в подготовке документов',
      'Проверка на ограничения и залог',
      'Официальное оформление сделки',
    ],
  },
  {
    number: 4,
    title: '100% оплата в день сделки',
    description: 'Сразу после подписания документов вы получаете полную сумму наличными или на карту.',
    benefits: [
      'Моментальная оплата',
      'Наличные или перевод на карту',
      'Без задержек и ожиданий',
    ],
  },
  {
    number: 5,
    title: 'Переоформление за наш счет',
    description: 'Мы берем на себя все расходы по переоформлению документов в ГИБДД.',
    benefits: [
      'Переоформление за наш счет',
      'Эвакуатор при необходимости',
      'Полное сопровождение сделки',
    ],
  },
];

export default function HowToSellSection() {
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
            Как продать автомобиль за 97% рыночной стоимости?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Простая пошаговая инструкция, которая поможет вам получить максимальную выгоду от продажи автомобиля
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="space-y-2">
                    {step.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="flex-shrink-0 mt-1">
                          <div className="bg-primary-600 rounded-full p-0.5">
                            <FiCheck className="text-white" size={14} />
                          </div>
                        </div>
                        <span className="text-sm md:text-base text-gray-700">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#evaluation"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[56px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Начать продажу автомобиля</span>
            <FiArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
