import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FiAward, FiClock, FiDollarSign, FiShield, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'Почему выбирают нас | Преимущества выкупа авто | Лучшая компания Москва',
  description:
    'Конкурентные преимущества нашей компании по выкупу автомобилей в Москве и МО. Почему клиенты выбирают именно нас: скорость (выкуп за 2 часа), честная цена (до 97%), безопасность, опыт (10+ лет), профессионализм. 5000+ довольных клиентов.',
  keywords:
    'почему мы, преимущества, конкурентные преимущества, почему выбирают, лучшая компания, лидер рынка, преимущества выкупа авто, почему выбрать нас, лучший выкуп авто москва, надежная компания выкуп',
  path: '/why-us',
});

const advantages = [
  {
    icon: FiClock,
    title: 'Скорость',
    description:
      'Мы работаем быстрее конкурентов. От звонка до получения денег в среднем проходит всего 2 часа. Без долгих ожиданий и проволочек.',
    details: [
      'Ответ на заявку в течение 5 минут',
      'Выезд специалиста в течение 1-2 часов',
      'Оформление сделки за 2 часа',
      'Моментальная оплата',
    ],
  },
  {
    icon: FiDollarSign,
    title: 'Честная цена',
    description:
      'Мы предлагаем справедливую рыночную стоимость без занижения и скрытых комиссий. Цена, которую мы называем, - это цена, которую вы получите.',
    details: [
      'Справедливая рыночная цена',
      'Отсутствие скрытых комиссий',
      'Прозрачное ценообразование',
      'Готовность к обсуждению цены',
    ],
  },
  {
    icon: FiShield,
    title: 'Безопасность',
    description:
      'Все сделки оформляются официально с соблюдением всех требований законодательства. Вы получаете полную юридическую защиту.',
    details: [
      'Официальное оформление документов',
      'Юридическая защита',
      'Проверка автомобиля на ограничения',
      'Защита от мошенников',
    ],
  },
  {
    icon: FiUsers,
    title: 'Опыт и репутация',
    description:
      'Более 10 лет на рынке, более 5000 довольных клиентов, 98% положительных отзывов. Мы дорожим своей репутацией.',
    details: [
      '10+ лет опыта на рынке',
      '5000+ довольных клиентов',
      '98% положительных отзывов',
      'Проверенная репутация',
    ],
  },
  {
    icon: FiTrendingUp,
    title: 'Любое состояние',
    description:
      'Мы выкупаем автомобили в любом состоянии: от идеального до требующего серьезного ремонта. Не отказываем никому.',
    details: [
      'Автомобили в любом состоянии',
      'После ДТП',
      'С большим пробегом',
      'Требующие ремонта',
    ],
  },
  {
    icon: FiAward,
    title: 'Профессионализм',
    description:
      'Наша команда состоит из опытных специалистов, которые знают рынок и умеют правильно оценить автомобиль.',
    details: [
      'Опытные специалисты',
      'Знание рынка',
      'Правильная оценка',
      'Профессиональный подход',
    ],
  },
];

const baseUrl = APP_CONFIG.BASE_URL;

const whyUsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Почему выбирают нас',
  description: 'Конкурентные преимущества компании по выкупу автомобилей',
  url: `${baseUrl}/why-us`,
  mainEntity: {
    '@type': 'Organization',
    name: 'Выкуп авто | Московский Авто Альянс',
    url: baseUrl,
  },
};

export default function WhyUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(whyUsPageSchema) }}
      />
      <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs className="mb-6" />
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Почему выбирают нас
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Конкурентные преимущества, которые делают нас лидером рынка выкупа автомобилей
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
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
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{advantage.description}</p>
                  <ul className="space-y-2">
                    {advantage.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                        <span className="text-primary-600">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </AnimatedCard>
              );
            })}
          </div>

          <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Сравнение с конкурентами</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Мы</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span>✓</span>
                    <span>Сделка за 2 часа</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span>✓</span>
                    <span>Честная рыночная цена</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span>✓</span>
                    <span>Оплата сразу</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span>✓</span>
                    <span>Любое состояние</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span>✓</span>
                    <span>Оформляем документы</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Конкуренты</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span>✗</span>
                    <span>1-2 недели</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span>✗</span>
                    <span>Заниженная на 15-30%</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span>✗</span>
                    <span>Через несколько дней</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span>✗</span>
                    <span>Только в хорошем</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span>✗</span>
                    <span>Нужно делать самому</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}
