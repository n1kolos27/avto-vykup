'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiFileText, FiHelpCircle } from 'react-icons/fi';
import FiCalculator from '@/components/icons/FiCalculator';
import Card from '@/components/ui/Card';

interface RelatedContentProps {
  currentPath?: string;
  className?: string;
}

const relatedContentMap: Record<string, Array<{ title: string; href: string; description: string; icon: React.ComponentType<{ className?: string; size?: number }> }>> = {
  '/calculator': [
    { title: 'Как мы работаем', href: '/how-we-work', description: 'Узнайте подробнее о процессе выкупа автомобиля', icon: FiFileText },
    { title: 'Цены на выкуп', href: '/prices', description: 'Прозрачное ценообразование и факторы стоимости', icon: FiCalculator },
    { title: 'Частые вопросы', href: '/faq', description: 'Ответы на популярные вопросы о выкупе авто', icon: FiHelpCircle },
  ],
  '/services': [
    { title: 'Калькулятор стоимости', href: '/calculator', description: 'Рассчитайте стоимость вашего автомобиля', icon: FiCalculator },
    { title: 'Гарантии', href: '/guarantees', description: 'Наши гарантии и обязательства', icon: FiFileText },
    { title: 'Отзывы клиентов', href: '/reviews', description: 'Реальные отзывы наших клиентов', icon: FiHelpCircle },
  ],
  '/faq': [
    { title: 'Калькулятор стоимости', href: '/calculator', description: 'Быстрая предварительная оценка', icon: FiCalculator },
    { title: 'Как мы работаем', href: '/how-we-work', description: 'Подробный процесс выкупа', icon: FiFileText },
    { title: 'Контакты', href: '/contacts', description: 'Свяжитесь с нами для консультации', icon: FiHelpCircle },
  ],
  '/blog': [
    { title: 'Калькулятор стоимости', href: '/calculator', description: 'Рассчитайте стоимость авто', icon: FiCalculator },
    { title: 'Услуги', href: '/services', description: 'Все наши услуги по выкупу', icon: FiFileText },
    { title: 'FAQ', href: '/faq', description: 'Ответы на частые вопросы', icon: FiHelpCircle },
  ],
  default: [
    { title: 'Калькулятор стоимости', href: '/calculator', description: 'Рассчитайте стоимость вашего автомобиля', icon: FiCalculator },
    { title: 'Услуги', href: '/services', description: 'Все услуги по выкупу автомобилей', icon: FiFileText },
    { title: 'FAQ', href: '/faq', description: 'Ответы на популярные вопросы', icon: FiHelpCircle },
  ],
};

export default function RelatedContent({ currentPath = '/', className = '' }: RelatedContentProps) {
  const relatedItems = relatedContentMap[currentPath] || relatedContentMap.default;

  return (
    <section className={`py-12 md:py-16 bg-gray-50 ${className}`} aria-label="Похожие страницы">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Полезные страницы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <Card hover={true} className="h-full p-6 group">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary-100 rounded-lg p-3 group-hover:bg-primary-200 transition-colors">
                          <Icon className="text-primary-600" size={24} aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                          <span className="inline-flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700">
                            Подробнее
                            <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
