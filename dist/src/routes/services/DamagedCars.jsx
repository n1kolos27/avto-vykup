import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs.js';
import Card from '../../components/ui/Card.js';
import CarEvaluationForm from '../../components/CarEvaluationForm.js';
import SchemaMarkup from '../../components/SchemaMarkup.js';
import RelatedServices from '../../components/RelatedServices.js';
import { APP_CONFIG } from '../../lib/config/index.js';
const advantages = [
    {
        icon: '🔧',
        title: 'Любая степень повреждения',
        description: 'Выкупаем автомобили с любыми повреждениями: от царапин до тотальных',
    },
    {
        icon: '💰',
        title: 'Честная оценка',
        description: 'Оцениваем остаточную стоимость и возможность восстановления или разбора',
    },
    {
        icon: '🚚',
        title: 'Эвакуатор за наш счет',
        description: 'Организуем эвакуатор для транспортировки неисправного автомобиля',
    },
    {
        icon: '🛡️',
        title: 'Безопасная сделка',
        description: 'Официальное оформление всех документов, полная юридическая защита',
    },
    {
        icon: '✅',
        title: 'Моментальная оплата',
        description: 'Оплата сразу после подписания документов наличными или на карту',
    },
    {
        icon: '⚠️',
        title: 'Опыт работы',
        description: 'Более 10 лет опыта работы с битыми и аварийными автомобилями',
    },
];
const damageTypes = [
    {
        title: 'Незначительные повреждения',
        description: 'Царапины, вмятины, повреждения бамперов. Оценка с учетом стоимости ремонта.',
    },
    {
        title: 'Средние повреждения',
        description: 'Повреждения кузова, разбитые стекла, повреждения оптики. Оценка остаточной стоимости.',
    },
    {
        title: 'Серьезные повреждения',
        description: 'Повреждения несущих элементов, деформация кузова. Оценка возможности восстановления.',
    },
    {
        title: 'Тотальные повреждения',
        description: 'Автомобиль не подлежит восстановлению. Оценка стоимости разбора на запчасти.',
    },
];
const faqs = [
    {
        question: 'Выкупаете ли вы битые автомобили?',
        answer: 'Да, мы выкупаем битые и аварийные автомобили с любыми повреждениями. Оцениваем остаточную стоимость, возможность восстановления или разбора на запчасти.',
    },
    {
        question: 'Как вы оцениваете битые автомобили?',
        answer: 'Мы учитываем степень повреждений, стоимость ремонта, остаточную стоимость автомобиля, возможность восстановления или разбора на запчасти. Оценка производится профессиональными специалистами.',
    },
    {
        question: 'Что делать, если автомобиль не на ходу?',
        answer: 'Мы организуем эвакуатор для транспортировки неисправного автомобиля. Эвакуатор может быть за наш счет или за дополнительную плату, в зависимости от ситуации.',
    },
    {
        question: 'Выкупаете ли вы тотальные автомобили?',
        answer: 'Да, мы выкупаем тотальные автомобили, которые не подлежат восстановлению. Оцениваем стоимость разбора на запчасти и предлагаем справедливую цену.',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Выкуп битых и аварийных автомобилей',
    description: 'Выкуп битых и аварийных автомобилей с любыми повреждениями в Москве и МО.',
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
const DamagedCars = () => {
    return (<div className="flex-1 bg-neutral-50">
      <SchemaMarkup schema={serviceSchema}/>
      <SchemaMarkup schema={faqSchema}/>
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />
        
        <div className="flex flex-col items-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">Выкуп битых и аварийных автомобилей</h1>
          <p className="text-lg text-neutral-600 text-center max-w-[800px] leading-7">
            Выкупаем автомобили с любыми повреждениями: от царапин до тотальных.
            Честная оценка остаточной стоимости, возможность восстановления или разбора на запчасти.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Преимущества</h2>
          <div className="flex flex-row flex-wrap gap-6">
            {advantages.map((advantage, index) => (<Card key={index} className="flex-1 min-w-[250px] p-6 flex flex-col items-center">
                <span className="text-5xl mb-4">{advantage.icon}</span>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 text-center">{advantage.title}</h3>
                <p className="text-base text-neutral-600 text-center leading-6">{advantage.description}</p>
              </Card>))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Типы повреждений, которые мы выкупаем</h2>
          <div className="flex flex-col gap-4">
            {damageTypes.map((type, index) => (<Card key={index} className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{type.title}</h3>
                <p className="text-base text-neutral-600 leading-6">{type.description}</p>
              </Card>))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Часто задаваемые вопросы</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (<Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{faq.question}</h3>
                <p className="text-base text-neutral-600 leading-6">{faq.answer}</p>
              </Card>))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">Получите оценку битого автомобиля</h2>
          <p className="text-base text-neutral-600 mb-6 text-center">
            Оставьте заявку, и наш специалист свяжется с вами для оценки остаточной стоимости
          </p>
          <CarEvaluationForm />
        </div>

        <RelatedServices currentPath="/services/damaged-cars"/>
      </div>
    </div>);
};
export default DamagedCars;
