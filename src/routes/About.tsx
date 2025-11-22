import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import SectionCTA from '../components/sections/SectionCTA.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';

const achievements = [
  {
    icon: '🏆',
    title: '10+ лет на рынке',
    description: 'Более 10 лет успешной работы на рынке выкупа автомобилей в Москве и МО',
  },
  {
    icon: '👥',
    title: '5000+ клиентов',
    description: 'Более 5000 довольных клиентов уже продали свои автомобили через нас',
  },
  {
    icon: '📈',
    title: '2.5 млрд ₽',
    description: 'Общая сумма выкупленных автомобилей за все время работы',
  },
  {
    icon: '🛡️',
    title: '100% гарантия',
    description: 'Гарантируем честность, прозрачность и безопасность каждой сделки',
  },
];

const baseUrl = APP_CONFIG.BASE_URL;

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'О компании Выкуп авто',
  description: 'Информация о компании по выкупу автомобилей в Москве и МО. Более 10 лет опыта, 5000+ клиентов.',
  url: `${baseUrl}/about`,
  mainEntity: {
    '@type': 'Organization',
    name: 'Выкуп авто | Московский Авто Альянс',
    foundingDate: '2014',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '15-50',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '12',
      bestRating: '5',
      worstRating: '1',
    },
  },
};

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleLinkPress = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex-1 bg-neutral-50">
      {/* Schema.org разметка */}
      <SchemaMarkup schema={aboutPageSchema} id="about-schema" />

      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />

        <div className="flex flex-col items-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">О нашей компании</h1>
          <p className="text-lg text-neutral-600 text-center max-w-[600px]">
            Профессиональный выкуп автомобилей в Москве и Московской области
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 mb-8 shadow-md">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Наша история</h2>
          <p className="text-base text-neutral-700 leading-7 mb-4">
            Мы начали свою деятельность более 10 лет назад с простой идеи - помочь
            людям быстро и выгодно продать свои автомобили. За это время мы выросли
            из небольшой компании в одного из лидеров рынка выкупа автомобилей в
            Москве и Московской области.
          </p>
          <p className="text-base text-neutral-700 leading-7 mb-4">
            Наш успех основан на трех принципах: честность, профессионализм и
            скорость. Мы понимаем, что продажа автомобиля - это важное решение, и
            стремимся сделать этот процесс максимально простым и выгодным для наших
            клиентов.{' '}
            <button
              onClick={() => handleLinkPress('/how-we-work')}
              className="text-primary-600 underline"
            >
              Ознакомьтесь с процессом выкупа автомобиля
            </button>{' '}
            — от звонка до получения денег за 2 часа.
          </p>
          <p className="text-base text-neutral-700 leading-7">
            За годы работы мы выкупили более 5000 автомобилей на общую сумму свыше
            2.5 миллиардов рублей. Мы работаем с автомобилями всех марок и моделей,
            в любом состоянии - от идеального до требующего серьезного ремонта.{' '}
            <button
              onClick={() => handleLinkPress('/reviews')}
              className="text-primary-600 underline"
            >
              Прочитайте отзывы наших клиентов о выкупе автомобилей
            </button>
            . Предлагаем{' '}
            <button
              onClick={() => handleLinkPress('/services/urgent-buyback')}
              className="text-primary-600 underline"
            >
              срочный выкуп
            </button>
            ,{' '}
            <button
              onClick={() => handleLinkPress('/services/damaged-cars')}
              className="text-primary-600 underline"
            >
              выкуп битых авто
            </button>
            ,{' '}
            <button
              onClick={() => handleLinkPress('/services/after-accident')}
              className="text-primary-600 underline"
            >
              выкуп после ДТП
            </button>
            ,{' '}
            <button
              onClick={() => handleLinkPress('/services/credit-cars')}
              className="text-primary-600 underline"
            >
              выкуп кредитных авто
            </button>{' '}
            и{' '}
            <button
              onClick={() => handleLinkPress('/services/premium-cars')}
              className="text-primary-600 underline"
            >
              выкуп премиум автомобилей
            </button>
            .
          </p>
        </div>

        <div className="flex flex-row flex-wrap gap-6 mb-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex-1 min-w-[250px] bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <span className="text-3xl">{achievement.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">{achievement.title}</h3>
              <p className="text-base text-neutral-600 leading-6">{achievement.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 mb-8 shadow-md">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Наши принципы</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Честность</h3>
            <p className="text-base text-neutral-600 leading-6">
              Мы предлагаем справедливую рыночную цену за каждый автомобиль. Никаких
              скрытых комиссий, занижения цен или обмана. Цена, которую мы называем,
              - это цена, которую вы получите.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Профессионализм</h3>
            <p className="text-base text-neutral-600 leading-6">
              Наша команда состоит из опытных специалистов, которые знают рынок и
              умеют правильно оценить автомобиль. Мы учитываем все факторы и
              предлагаем объективную оценку.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Скорость</h3>
            <p className="text-base text-neutral-600 leading-6">
              Мы понимаем, что время - это деньги. Поэтому мы работаем быстро: от
              звонка до получения денег в среднем проходит всего 2 часа. Без долгих
              ожиданий и проволочек.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Безопасность</h3>
            <p className="text-base text-neutral-600 leading-6">
              Все сделки оформляются официально с соблюдением всех требований
              законодательства. Вы получаете полную юридическую защиту и гарантию
              законности сделки.
            </p>
          </div>
        </div>

        <div className="bg-primary-600 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Почему выбирают нас</h2>
          <div className="flex flex-col gap-4">
            {[
              'Более 10 лет опыта на рынке выкупа автомобилей',
              'Более 5000 довольных клиентов и 98% положительных отзывов',
              'Честная рыночная цена без занижения и скрытых комиссий',
              'Моментальная оплата сразу после подписания документов',
              'Работаем с автомобилями в любом состоянии',
              'Официальное оформление всех документов',
              'Работаем ежедневно, включая выходные и праздники',
            ].map((item) => (
              <div key={item} className="flex flex-row items-start gap-3">
                <span className="text-xl text-white font-bold mt-0.5">✓</span>
                <span className="text-lg text-white flex-1 leading-7">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8">
          <SectionCTA
            title="Готовы продать свой автомобиль?"
            description="Свяжитесь с нами и получите оценку за 5 минут"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
