import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';

const advantages = [
  {
    icon: '⏱️',
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
    icon: '💰',
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
    icon: '🛡️',
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
    icon: '👥',
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
    icon: '📈',
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
    icon: '🏆',
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

const WhyUs: React.FC = () => {
  return (
    <div className="flex-1 bg-neutral-50">
      <SchemaMarkup schema={whyUsPageSchema} />
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />
        <div className="flex flex-col items-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">Почему выбирают нас</h1>
          <p className="text-lg text-neutral-600 text-center max-w-[600px]">
            Конкурентные преимущества, которые делают нас лидером рынка выкупа автомобилей
          </p>
        </div>

        <div className="flex flex-row flex-wrap gap-6 mb-8">
          {advantages.map((advantage, index) => (
            <Card key={index} className="flex-1 min-w-[300px] p-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <span className="text-3xl">{advantage.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">{advantage.title}</h3>
              <p className="text-base text-neutral-600 leading-6 mb-4">{advantage.description}</p>
              <div className="flex flex-col gap-2">
                {advantage.details.map((detail, idx) => (
                  <div key={idx} className="flex flex-row items-start gap-2">
                    <span className="text-primary-600 text-sm mt-0.5">✓</span>
                    <span className="text-sm text-neutral-600 flex-1">{detail}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-primary-600 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Сравнение с конкурентами</h2>
          <div className="flex flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-4">Мы</h3>
              <div className="flex flex-col gap-3">
                {['Сделка за 2 часа', 'Честная рыночная цена', 'Оплата сразу', 'Любое состояние', 'Оформляем документы'].map((item) => (
                  <div key={item} className="flex flex-row items-start gap-3">
                    <span className="text-lg text-white font-bold mt-0.5">✓</span>
                    <span className="text-lg text-white flex-1 leading-7">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-4">Конкуренты</h3>
              <div className="flex flex-col gap-3">
                {['1-2 недели', 'Заниженная на 15-30%', 'Через несколько дней', 'Только в хорошем', 'Нужно делать самому'].map((item) => (
                  <div key={item} className="flex flex-row items-start gap-3">
                    <span className="text-lg text-white font-bold mt-0.5">✗</span>
                    <span className="text-lg text-white flex-1 leading-7">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
