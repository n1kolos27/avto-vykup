import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs.js';
import Card from '../../components/ui/Card.js';
import CarEvaluationForm from '../../components/CarEvaluationForm.js';
import SchemaMarkup from '../../components/SchemaMarkup.js';
import RelatedServices from '../../components/RelatedServices.js';
import { APP_CONFIG } from '../../lib/config/index.js';

const advantages = [
  {
    icon: '💎',
    title: 'Премиум марки',
    description: 'Специализируемся на выкупе элитных и премиум автомобилей',
  },
  {
    icon: '🏆',
    title: 'Элитные автомобили',
    description: 'Выкупаем автомобили премиум класса: Mercedes-Benz, BMW, Audi, Porsche, Lexus и другие',
  },
  {
    icon: '💰',
    title: 'Профессиональная оценка',
    description: 'Знаем специфику оценки премиум автомобилей и предлагаем максимальную цену',
  },
  {
    icon: '📈',
    title: 'Максимальная цена',
    description: 'Предлагаем до 97% от рыночной стоимости премиум автомобилей',
  },
  {
    icon: '🛡️',
    title: 'Безопасная сделка',
    description: 'Официальное оформление всех документов, полная юридическая защита',
  },
  {
    icon: '✅',
    title: 'Опыт работы',
    description: 'Более 10 лет опыта работы с премиум и элитными автомобилями',
  },
];

const premiumBrands = [
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Porsche',
  'Lexus',
  'Volvo',
  'Infiniti',
  'Jaguar',
  'Land Rover',
  'Range Rover',
  'Tesla',
];

const faqs = [
  {
    question: 'Выкупаете ли вы элитные и премиум автомобили?',
    answer:
      'Да, мы специализируемся на выкупе автомобилей всех классов, включая премиум и элитные. У нас есть опыт работы с такими марками как Mercedes-Benz, BMW, Audi, Porsche, Lexus и другими.',
  },
  {
    question: 'Как вы оцениваете премиум автомобили?',
    answer:
      'Мы знаем специфику оценки премиум автомобилей. Учитываем марку, модель, год выпуска, комплектацию, состояние, историю обслуживания, рыночную стоимость. Предлагаем до 97% от рыночной стоимости.',
  },
  {
    question: 'Какую цену вы предлагаете за премиум автомобили?',
    answer:
      'Мы предлагаем до 97% от рыночной стоимости премиум автомобилей. Цена зависит от марки, модели, года выпуска, комплектации, состояния и других факторов.',
  },
  {
    question: 'Сколько времени занимает выкуп премиум автомобиля?',
    answer:
      'В среднем от звонка до получения денег проходит всего 2 часа. Мы приезжаем на место, осматриваем автомобиль, оформляем документы и сразу производим оплату.',
  },
];

const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Выкуп премиум и элитных автомобилей',
  description: 'Специализируемся на выкупе элитных и премиум автомобилей. Знаем специфику оценки таких автомобилей.',
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

const PremiumCars: React.FC = () => {
  return (
    <div className="flex-1 bg-neutral-50">
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={faqSchema} />
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />
        
        <div className="flex flex-col items-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">Выкуп премиум и элитных автомобилей</h1>
          <p className="text-lg text-neutral-600 text-center max-w-[800px] leading-7">
            Специализируемся на выкупе элитных и премиум автомобилей. Знаем специфику оценки
            таких автомобилей и предлагаем максимальную цену. Более 10 лет опыта работы с премиум марками.
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
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Премиум марки, которые мы выкупаем</h2>
          <div className="flex flex-row flex-wrap gap-4">
            {premiumBrands.map((brand, index) => (
              <Card key={index} className="p-4 min-w-[150px]">
                <p className="text-base font-semibold text-neutral-900 text-center">{brand}</p>
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
          <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">Получите оценку премиум автомобиля</h2>
          <p className="text-base text-neutral-600 mb-6 text-center">
            Оставьте заявку, и наш специалист свяжется с вами для профессиональной оценки
          </p>
          <CarEvaluationForm />
        </div>

        <RelatedServices currentPath="/services/premium-cars" />
      </div>
    </div>
  );
};

export default PremiumCars;
