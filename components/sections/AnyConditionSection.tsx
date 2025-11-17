'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';

const conditions = [
  'Целые',
  'Битые (аварийные)',
  'Кредитные',
  'Неисправные',
  'После ДТП',
];

const carBrands = [
  'Audi', 'BMW', 'Mercedes-Benz', 'Toyota', 'Volkswagen', 'Ford', 'Nissan',
  'Hyundai', 'Kia', 'Mazda', 'Honda', 'Lexus', 'Volvo', 'Skoda', 'Renault',
  'Peugeot', 'Citroen', 'Opel', 'Chevrolet', 'Mitsubishi', 'Subaru', 'Infiniti',
  'Porsche', 'Land Rover', 'Jaguar', 'Jeep', 'Dodge', 'Chrysler', 'Cadillac',
];

export default function AnyConditionSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center">
            Предлагаем выкуп авто в любом состоянии дорого и быстро
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Выкупаем автомобили в следующих состояниях:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {conditions.map((condition, index) => (
                <motion.div
                  key={condition}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex-shrink-0">
                    <div className="bg-primary-600 rounded-full p-1">
                      <FiCheck className="text-white" size={16} />
                    </div>
                  </div>
                  <span className="text-base md:text-lg text-gray-700 font-medium">
                    {condition}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Работаем со всеми марками автомобилей:
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {carBrands.join(', ')} и многие другие.
            </p>
            <p className="text-sm md:text-base text-gray-600 italic">
              Наше предложение по оценке транспортного средства действительно 30 дней
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#evaluation"
                className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[56px] flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Получить оценку автомобиля
              </motion.a>
              <Link
                href="/services/damaged-cars"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-primary-600 bg-white hover:bg-primary-50 font-bold text-lg rounded-lg shadow-lg transition-all duration-300 hover:scale-105 min-h-[56px]"
              >
                Выкуп битых авто
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
