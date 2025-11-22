import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs.js';
import Card from '../../components/ui/Card.js';
import CarEvaluationForm from '../../components/CarEvaluationForm.js';
import SchemaMarkup from '../../components/SchemaMarkup.js';
import RelatedServices from '../../components/RelatedServices.js';
import { APP_CONFIG } from '../../lib/config/index.js';

const advantages = [
  {
    icon: '🏦',
    title: 'Помощь с банком',
    description: 'Помогаем разобраться с банком и оформить все необходимые документы',
  },
  {
    icon: '📄',
    title: 'Оформление перевода долга',
    description: 'Помогаем оформить перевод долга и все необходимые документы',
  },
  {
    icon: '💰',
    title: 'Погашение кредита',
    description: 'Помогаем с погашением кредита или оформлением перевода долга',
  },
  {
    icon: '⚡',
    title: 'Быстрое решение',
    description: 'Быстро находим оптимальное решение для вашей ситуации',
  },
  {
    icon: '🛡️',
    title: 'Безопасная сделка',
    description: 'Официальное оформление всех документов, полная юридическая защита',
  },
  {
    icon: '✅',
    title: 'Опыт работы',
    description: 'Более 10 лет опыта работы с кредитными автомобилями',
  },
];

const faqs = [
  {
    question: 'Можно ли продать автомобиль в кредите?',
    answer:
      'Да, мы работаем с кредитными автомобилями. В этом случае нужно погасить кредит или мы можем помочь с оформлением перевода долга. Все зависит от конкретной ситуации и условий кредитного договора.',
  },
  {
    question: 'Что делать, если автомобиль в залоге?',
    answer:
      'Если автомобиль находится в залоге у банка, нужно сначала погасить кредит или оформить перевод залога. Мы поможем разобраться с документами и найти оптимальное решение.',
  },
  {
    question: 'Как происходит выкуп кредитного автомобиля?',
    answer:
      'Мы помогаем разобраться с банком, оформить все необходимые документы для погашения кредита или перевода долга. После этого оформляем сделку по выкупу автомобиля.',
  },
  {
    question: 'Сколько времени занимает выкуп кредитного автомобиля?',
    answer:
      'Время зависит от конкретной ситуации и банка. Обычно процесс занимает от 1 до 3 дней. Мы поможем ускорить процесс и оформить все документы максимально быстро.',
  },
];

const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Выкуп кредитных автомобилей',
  description: 'Помогаем с выкупом автомобилей, находящихся в залоге. Оформляем перевод долга и все необходимые документы.',
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

const CreditCars: React.FC = () => {
  return (
    <div className="flex-1 bg-neutral-50">
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={faqSchema} />
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />
        
        <div className="flex flex-col items-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">Выкуп кредитных автомобилей</h1>
          <p className="text-lg text-neutral-600 text-center max-w-[800px] leading-7">
            Помогаем с выкупом автомобилей, находящихся в залоге. Оформляем перевод долга
            и все необходимые документы. Работаем с любыми банками и кредитными организациями.
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
          <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">Получите консультацию по кредитному автомобилю</h2>
          <p className="text-base text-neutral-600 mb-6 text-center">
            Оставьте заявку, и наш специалист свяжется с вами для консультации
          </p>
          <CarEvaluationForm />
        </div>

        <RelatedServices currentPath="/services/credit-cars" />
      </div>
    </div>
  );
};

export default CreditCars;
