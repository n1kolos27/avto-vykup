import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs.js';
import Card from '../../components/ui/Card.js';
import CarEvaluationForm from '../../components/CarEvaluationForm.js';
import SchemaMarkup from '../../components/SchemaMarkup.js';
import RelatedServices from '../../components/RelatedServices.js';
import { APP_CONFIG } from '../../lib/config/index.js';
const advantages = [
    {
        icon: '🚨',
        title: 'После любого ДТП',
        description: 'Выкупаем автомобили после любых аварий, независимо от степени повреждений',
    },
    {
        icon: '💰',
        title: 'Оценка остаточной стоимости',
        description: 'Профессиональная оценка остаточной стоимости и возможности восстановления',
    },
    {
        icon: '🔧',
        title: 'Восстановление или разбор',
        description: 'Оцениваем возможность восстановления или разбора на запчасти',
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
        icon: '🚚',
        title: 'Эвакуатор',
        description: 'Организуем эвакуатор для транспортировки автомобиля после ДТП',
    },
];
const faqs = [
    {
        question: 'Выкупаете ли вы автомобили после ДТП?',
        answer: 'Да, мы выкупаем автомобили, побывавшие в авариях. Оцениваем остаточную стоимость, возможность восстановления или разбора на запчасти. Даже сильно поврежденные автомобили могут иметь хорошую стоимость благодаря запчастям.',
    },
    {
        question: 'Как вы оцениваете автомобили после ДТП?',
        answer: 'Мы учитываем степень повреждений, стоимость ремонта, остаточную стоимость автомобиля, возможность восстановления или разбора на запчасти. Оценка производится профессиональными специалистами с большим опытом работы.',
    },
    {
        question: 'Что делать, если автомобиль не на ходу после ДТП?',
        answer: 'Мы организуем эвакуатор для транспортировки автомобиля после ДТП. Эвакуатор может быть за наш счет или за дополнительную плату, в зависимости от ситуации.',
    },
    {
        question: 'Выкупаете ли вы тотальные автомобили после ДТП?',
        answer: 'Да, мы выкупаем тотальные автомобили, которые не подлежат восстановлению. Оцениваем стоимость разбора на запчасти и предлагаем справедливую цену.',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Выкуп автомобилей после ДТП',
    description: 'Выкуп автомобилей, побывавших в авариях. Оценка остаточной стоимости и возможности восстановления.',
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
const AfterAccident = () => {
    return (<div className="flex-1 bg-neutral-50">
      <SchemaMarkup schema={serviceSchema}/>
      <SchemaMarkup schema={faqSchema}/>
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />
        
        <div className="flex flex-col items-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">Выкуп автомобилей после ДТП</h1>
          <p className="text-lg text-neutral-600 text-center max-w-[800px] leading-7">
            Выкупаем автомобили, побывавшие в авариях. Оцениваем остаточную стоимость,
            возможность восстановления или разбора на запчасти. Даже сильно поврежденные
            автомобили могут иметь хорошую стоимость благодаря запчастям.
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
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Часто задаваемые вопросы</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (<Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{faq.question}</h3>
                <p className="text-base text-neutral-600 leading-6">{faq.answer}</p>
              </Card>))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">Получите оценку автомобиля после ДТП</h2>
          <p className="text-base text-neutral-600 mb-6 text-center">
            Оставьте заявку, и наш специалист свяжется с вами для оценки остаточной стоимости
          </p>
          <CarEvaluationForm />
        </div>

        <RelatedServices currentPath="/services/after-accident"/>
      </div>
    </div>);
};
export default AfterAccident;
