'use client';

import { motion } from 'framer-motion';
import { FiShield, FiFileText, FiLock, FiAward } from 'react-icons/fi';

const guarantees = [
  {
    icon: FiShield,
    title: 'Юридическая безопасность',
    description:
      'Все сделки оформляются официально с соблюдением всех требований законодательства. Вы получаете полную юридическую защиту.',
  },
  {
    icon: FiFileText,
    title: 'Прозрачные документы',
    description:
      'Все документы оформляются в вашем присутствии. Вы видите каждый шаг процесса и можете задать любые вопросы.',
  },
  {
    icon: FiLock,
    title: 'Защита от мошенников',
    description:
      'Мы работаем официально, имеем все необходимые лицензии. Ваши данные и деньги в полной безопасности.',
  },
  {
    icon: FiAward,
    title: 'Гарантия честной цены',
    description:
      'Мы предлагаем рыночную стоимость автомобиля. Если вы найдете более выгодное предложение, мы готовы обсудить цену.',
  },
];

export default function GuaranteesSection() {
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
            Наши гарантии
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы гарантируем безопасность, честность и прозрачность каждой сделки
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {guarantee.title}
                </h3>
                <p className="text-gray-600">{guarantee.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

