import { Metadata } from 'next';
import Link from 'next/link';
import { FiDollarSign, FiShield, FiClock, FiFileText, FiTruck, FiAward } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = genMeta({
  title: 'Услуги по выкупу автомобилей | Полный спектр услуг',
  description:
    'Полный спектр услуг по выкупу автомобилей в Москве и МО. Выкуп легковых и коммерческих авто, выкуп после ДТП, кредитных авто, премиум автомобилей. Помощь с документами, эвакуатор, консультации.',
  keywords:
    'услуги выкупа авто, выкуп легковых авто, выкуп коммерческого транспорта, выкуп после ДТП, выкуп кредитных авто, выкуп премиум авто, срочный выкуп, помощь с документами',
  path: '/services',
});

const services = [
  {
    icon: FiDollarSign,
    title: 'Выкуп легковых автомобилей',
    description:
      'Выкупаем легковые автомобили всех марок и моделей в любом состоянии. От бюджетных до премиум класса.',
    features: [
      'Все марки и модели',
      'Любое состояние',
      'Честная оценка',
      'Моментальная оплата',
    ],
  },
  {
    icon: FiTruck,
    title: 'Выкуп коммерческого транспорта',
    description:
      'Специализируемся на выкупе грузовиков, микроавтобусов, спецтехники и другого коммерческого транспорта.',
    features: [
      'Грузовики',
      'Микроавтобусы',
      'Спецтехника',
      'Профессиональная оценка',
    ],
  },
  {
    icon: FiShield,
    title: 'Выкуп после ДТП',
    description:
      'Выкупаем автомобили, побывавшие в авариях. Оцениваем остаточную стоимость и возможность восстановления.',
    features: [
      'Любая степень повреждения',
      'Оценка остаточной стоимости',
      'Возможность восстановления',
      'Справедливая цена',
    ],
  },
  {
    icon: FiFileText,
    title: 'Выкуп кредитных автомобилей',
    description:
      'Помогаем с выкупом автомобилей, находящихся в залоге. Оформляем перевод долга и все необходимые документы.',
    features: [
      'Помощь с документами',
      'Оформление перевода долга',
      'Консультации',
      'Быстрое решение',
    ],
  },
  {
    icon: FiClock,
    title: 'Срочный выкуп',
    description:
      'Срочный выкуп автомобилей в течение нескольких часов. Идеально для тех, кому нужны деньги быстро.',
    features: [
      'Выкуп за 2 часа',
      'Моментальная оплата',
      'Выезд на место',
      'Без проволочек',
    ],
  },
  {
    icon: FiAward,
    title: 'Выкуп премиум автомобилей',
    description:
      'Специализируемся на выкупе элитных и премиум автомобилей. Знаем специфику оценки таких автомобилей.',
    features: [
      'Премиум марки',
      'Элитные автомобили',
      'Профессиональная оценка',
      'Высокая цена',
    ],
  },
];

import { APP_CONFIG } from '@/lib/config';

const baseUrl = APP_CONFIG.BASE_URL;

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: 'Выкуп авто | Московский Авто Альянс',
        url: baseUrl,
      },
      areaServed: {
        '@type': 'City',
        name: 'Москва',
      },
      serviceType: 'Выкуп автомобилей',
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs className="mb-6" />
            <AnimatedSection className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Наши услуги
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Полный спектр услуг по выкупу автомобилей в Москве и Московской области
              </p>
            </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <AnimatedCard
                  key={index}
                  delay={index * 0.1}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon className="text-primary-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-primary-600">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </AnimatedCard>
              );
            })}
          </div>

          <section className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Дополнительные услуги
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Помощь с документами
                </h3>
                <p className="text-gray-600">
                  Помогаем оформить все необходимые документы для выкупа. Проверяем
                  автомобиль на наличие ограничений, помогаем с восстановлением документов. Узнайте, <Link href="/documents" className="text-primary-600 hover:text-primary-700 underline">какие документы нужны</Link>.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Эвакуатор</h3>
                <p className="text-gray-600">
                  Организуем эвакуатор для транспортировки автомобиля, если он не на ходу
                  или находится далеко. Услуга предоставляется за дополнительную плату.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Консультации
                </h3>
                <p className="text-gray-600">
                  Предоставляем бесплатные консультации по вопросам выкупа автомобиля,
                  оформления документов, оценки стоимости. <Link href="/faq" className="text-primary-600 hover:text-primary-700 underline">Найдите ответы на вопросы о выкупе авто в разделе FAQ</Link>.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Выезд на место
                </h3>
                <p className="text-gray-600">
                  Наш специалист может приехать к вам в любое удобное место в Москве и МО
                  для осмотра автомобиля и оформления сделки. <Link href="/contacts" className="text-primary-600 hover:text-primary-700 underline">Свяжитесь с нами</Link> для согласования времени.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}
