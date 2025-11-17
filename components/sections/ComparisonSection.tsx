'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';

type TabType = 'self' | 'us' | 'auction';

const tabs = [
  { id: 'self' as TabType, label: 'ПРОДАЖА СВОИМИ СИЛАМИ' },
  { id: 'us' as TabType, label: 'ПРОДАЖА НАМ', isRecommended: true },
  { id: 'auction' as TabType, label: 'АВТОАУКЦИОНЫ' },
];

const comparisonData: Record<TabType, { pros: string[]; cons: string[] }> = {
  self: {
    pros: [
      'Возможность получить максимальную цену',
      'Полный контроль над процессом продажи',
      'Прямой контакт с покупателем',
    ],
    cons: [
      'Долгий процесс поиска покупателя (1-2 месяца)',
      'Много времени на показы и переговоры',
      'Риск встреч с недобросовестными покупателями',
      'Нужно самому оформлять документы',
      'Риск мошенничества',
      'Нет гарантии быстрой продажи',
    ],
  },
  us: {
    pros: [
      'Сделка за 2 часа от звонка до получения денег',
      'Честная рыночная цена (до 97% от рыночной стоимости)',
      'Моментальная оплата наличными или на карту',
      'Оформляем все документы сами',
      'Принимаем автомобили в любом состоянии',
      'Бесплатный выезд специалиста',
      'Эвакуатор и переоформление за наш счет',
      'Безопасная сделка с официальным оформлением',
      'Работаем с кредитными автомобилями',
      'Помощь с документами и банком',
    ],
    cons: [],
  },
  auction: {
    pros: [
      'Возможность продать быстро',
      'Публичные торги',
    ],
    cons: [
      'Низкая цена (обычно 60-70% от рыночной)',
      'Комиссия аукциона (5-10%)',
      'Долгое ожидание торгов (1-2 недели)',
      'Нет гарантии продажи',
      'Нужно самому доставлять автомобиль',
      'Ограничения по состоянию автомобиля',
      'Сложная процедура оформления',
    ],
  },
};

export default function ComparisonSection() {
  const [activeTab, setActiveTab] = useState<TabType>('us');

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
            Онлайн калькулятор оценки авто
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Сравните разные варианты продажи автомобиля и выберите лучший
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-col md:flex-row gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-4 rounded-lg font-bold text-sm md:text-base transition-all duration-300 min-h-[56px] flex items-center justify-center ${
                  activeTab === tab.id
                    ? tab.isRecommended
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg scale-105'
                      : 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
                {tab.isRecommended && activeTab === tab.id && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    Рекомендуем
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pros */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <FiCheck className="text-green-600" size={24} />
                    <span>Плюсы</span>
                  </h3>
                  <ul className="space-y-3">
                    {comparisonData[activeTab].pros.map((pro, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-start space-x-2"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="bg-green-100 rounded-full p-1">
                            <FiCheck className="text-green-600" size={14} />
                          </div>
                        </div>
                        <span className="text-gray-700">{pro}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <FiX className="text-red-600" size={24} />
                    <span>Минусы</span>
                  </h3>
                  {comparisonData[activeTab].cons.length > 0 ? (
                    <ul className="space-y-3">
                      {comparisonData[activeTab].cons.map((con, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-start space-x-2"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <div className="bg-red-100 rounded-full p-1">
                              <FiX className="text-red-600" size={14} />
                            </div>
                          </div>
                          <span className="text-gray-700">{con}</span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Нет минусов</p>
                  )}
                </div>
              </div>

              {activeTab === 'us' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-8 pt-8 border-t border-gray-200 text-center"
                >
                  <motion.a
                    href="#evaluation"
                    className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[56px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Получить оценку автомобиля
                  </motion.a>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
