'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const tips = [
  {
    title: 'Мойка и детализация',
    description:
      'Тщательно вымойте автомобиль снаружи и внутри. Чистый автомобиль производит лучшее впечатление и может увеличить стоимость на 3-5%.',
    impact: '+3-5%',
  },
  {
    title: 'Устранение мелких дефектов',
    description:
      'Исправьте мелкие царапины и сколы. Это недорого, но может значительно улучшить внешний вид и оценку.',
    impact: '+5-10%',
  },
  {
    title: 'Техническое обслуживание',
    description:
      'Проведите ТО, замените масло, проверьте все жидкости. Документы о недавнем обслуживании повышают доверие.',
    impact: '+5-8%',
  },
  {
    title: 'Сбор документов',
    description:
      'Подготовьте все документы: ПТС, СТС, сервисную книжку, чеки на ремонты. Полный пакет документов увеличивает стоимость.',
    impact: '+5-15%',
  },
  {
    title: 'Удаление личных вещей',
    description:
      'Уберите все личные вещи из салона и багажника. Чистый, пустой автомобиль выглядит более привлекательно.',
    impact: '+2-3%',
  },
  {
    title: 'Проверка всех систем',
    description:
      'Убедитесь, что все системы работают: кондиционер, аудиосистема, электроника. Неисправности снижают стоимость.',
    impact: '+3-7%',
  },
];

export default function PreparationTips() {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Как увеличить стоимость автомобиля перед продажей
      </h3>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-3">
                <FiCheckCircle className="text-primary-600 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">{tip.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{tip.description}</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0 ml-4">
                {tip.impact}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg p-4 border-2 border-primary-200">
        <p className="text-gray-700 text-sm">
          <strong>Важно:</strong> Следуя всем этим рекомендациям, вы можете увеличить
          стоимость вашего автомобиля на 20-40%. Инвестиции в подготовку обычно
          окупаются многократно.
        </p>
      </div>
    </div>
  );
}

