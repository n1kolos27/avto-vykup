import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs.js';
import Card from '../../components/ui/Card.js';
import CarEvaluationForm from '../../components/CarEvaluationForm.js';
import SchemaMarkup from '../../components/SchemaMarkup.js';
import RelatedServices from '../../components/RelatedServices.js';
import { APP_CONFIG } from '../../lib/config/index.js';

const advantages = [
  {
    icon: '💰',
    title: 'До 97% рыночной стоимости',
    description: 'Предлагаем максимально честную и выгодную цену за ваш автомобиль',
  },
  {
    icon: '⏰',
    title: 'Выкуп за 2 часа',
    description: 'От звонка до получения денег проходит всего 2 часа',
  },
  {
    icon: '🛡️',
    title: 'Безопасная сделка',
    description: 'Официальное оформление всех документов, полная юридическая защита',
  },
  {
    icon: '👥',
    title: '5000+ довольных клиентов',
    description: 'Более 5000 клиентов уже продали свои автомобили через нас',
  },
  {
    icon: '🏆',
    title: '10+ лет опыта',
    description: 'Более 10 лет успешной работы на рынке выкупа автомобилей',
  },
  {
    icon: '✅',
    title: 'Любое состояние',
    description: 'Выкупаем автомобили в любом состоянии: от идеального до требующего ремонта',
  },
];

const processSteps = [
  {
    step: 1,
    title: 'Звонок или заявка',
    description: 'Свяжитесь с нами по телефону или оставьте заявку на сайте. Наш специалист ответит в течение 5 минут.',
  },
  {
    step: 2,
    title: 'Бесплатная оценка',
    description: 'Наш специалист приедет к вам в удобное место и проведет бесплатную оценку автомобиля.',
  },
  {
    step: 3,
    title: 'Согласование цены',
    description: 'После осмотра мы предложим честную рыночную цену. Если цена вас устраивает, переходим к оформлению.',
  },
  {
    step: 4,
    title: 'Оформление и оплата',
    description: 'Оформляем все документы и сразу производим оплату наличными или на карту.',
  },
];

const faqs = [
  {
    question: 'Какие автомобили вы выкупаете?',
    answer:
      'Мы выкупаем все марки и модели легковых автомобилей в любом состоянии: от идеального до требующего серьезного ремонта, битые, после ДТП, кредитные, премиум класса.',
  },
  {
    question: 'Как быстро происходит выкуп?',
    answer:
      'В среднем от звонка до получения денег проходит всего 2 часа. Мы приезжаем на место, осматриваем автомобиль, оформляем документы и сразу производим оплату.',
  },
  {
    question: 'Какую цену вы предлагаете?',
    answer:
      'Мы предлагаем до 97% от рыночной стоимости автомобиля. Цена зависит от марки, модели, года выпуска, пробега, технического состояния и других факторов.',
  },
  {
    question: 'Какие документы нужны?',
    answer:
      'Для выкупа автомобиля вам понадобятся: ПТС, СТС, паспорт владельца. Мы поможем оформить все необходимые документы.',
  },
  {
    question: 'Можно ли продать автомобиль в кредите?',
    answer:
      'Да, мы работаем с кредитными автомобилями. В этом случае нужно погасить кредит или мы можем помочь с оформлением перевода долга.',
  },
];

const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Выкуп автомобилей в Москве и МО',
  description: 'Профессиональный выкуп автомобилей всех марок и моделей в любом состоянии.',
  provider: {
    '@type': 'Organization',
    name: 'Выкуп авто | Московский Авто Альянс',
    url: baseUrl,
    telephone: phone1,
  },
  areaServed: [
    { '@type': 'City', name: 'Москва' },
    { '@type': 'State', name: 'Московская область' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const BuybackCars: React.FC = () => {
  return (
    <div className="flex-1 bg-neutral-50">
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={faqSchema} />
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />
        
        <div className="flex flex-col items-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">Выкуп автомобилей в Москве и МО</h1>
          <p className="text-lg text-neutral-600 text-center max-w-[800px] leading-7">
            Профессиональный выкуп автомобилей всех марок и моделей в любом состоянии.
            Честная оценка за 5 минут, до 97% рыночной стоимости, моментальная оплата.
            Более 10 лет опыта, 5000+ довольных клиентов.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Преимущества</h2>
          <div className="flex flex-row flex-wrap gap-6">
            {advantages.map((advantage, index) => (
              <Card key={index} className="flex-1 min-w-[250px] p-6 flex flex-col items-center">
                <span className="text-5xl mb-4">{advantage.icon}</span>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 text-center">{advantage.title}</h3>
                <p className="text-base text-neutral-600 text-center leading-6">{advantage.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Как мы работаем</h2>
          <div className="flex flex-col gap-6">
            {processSteps.map((step, index) => (
              <Card key={index} className="p-6 flex flex-row gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">{step.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-base text-neutral-600 leading-6">{step.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Часто задаваемые вопросы</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{faq.question}</h3>
                <p className="text-base text-neutral-600 leading-6">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">Получите оценку за 5 минут</h2>
          <p className="text-base text-neutral-600 mb-6 text-center">
            Оставьте заявку, и наш специалист свяжется с вами для оценки вашего автомобиля
          </p>
          <CarEvaluationForm />
        </div>

        <RelatedServices currentPath="/services/buyback-cars" />
      </div>
    </div>
  );
};

export default BuybackCars;
