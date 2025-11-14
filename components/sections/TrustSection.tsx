'use client';

import { motion } from 'framer-motion';
import { FiAward, FiShield, FiFileText, FiCheckCircle, FiTrendingUp, FiUsers } from 'react-icons/fi';

const trustItems = [
  {
    icon: FiAward,
    title: '10+ лет опыта',
    description: 'Более 10 лет успешной работы на рынке выкупа автомобилей',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    icon: FiShield,
    title: 'Лицензированная деятельность',
    description: 'Все документы и лицензии в порядке. Работаем официально',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: FiFileText,
    title: 'Юридическая защита',
    description: 'Полное юридическое сопровождение всех сделок',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: FiCheckCircle,
    title: 'Гарантии качества',
    description: 'Гарантируем честную оценку и прозрачность сделки',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
];

const partners = [
  { name: 'Банк-партнер 1', logo: '🏦' },
  { name: 'Страховая компания', logo: '🛡️' },
  { name: 'Автосалон', logo: '🚗' },
  { name: 'Оценщики', logo: '📊' },
];

export default function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Нам доверяют
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы работаем честно, профессионально и с полной юридической защитой
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className={`${item.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`${item.color} text-2xl`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-200 pt-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Наши партнеры
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors"
              >
                <div className="text-4xl mb-3">{partner.logo}</div>
                <p className="text-sm font-medium text-gray-700">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

