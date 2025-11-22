import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs.js';
import Card from '../../components/ui/Card.js';
import CarEvaluationForm from '../../components/CarEvaluationForm.js';
import SchemaMarkup from '../../components/SchemaMarkup.js';
import PhoneButton from '../../components/PhoneButton.js';
import Button from '../../components/ui/Button.js';
import RelatedServices from '../../components/RelatedServices.js';
import { APP_CONFIG } from '../../lib/config/index.js';
const advantages = [
    {
        icon: '⏰',
        title: 'Выкуп за 2 часа',
        description: 'От звонка до получения денег проходит всего 2 часа',
    },
    {
        icon: '⚡',
        title: 'Оценка за 5 минут',
        description: 'Предварительная оценка по телефону за 5 минут',
    },
    {
        icon: '💰',
        title: 'Моментальная оплата',
        description: 'Оплата сразу после подписания документов наличными или на карту',
    },
    {
        icon: '📍',
        title: 'Выезд на место',
        description: 'Наш специалист приедет к вам в любое удобное место в Москве и МО',
    },
    {
        icon: '🛡️',
        title: 'Безопасная сделка',
        description: 'Официальное оформление всех документов, полная юридическая защита',
    },
    {
        icon: '✅',
        title: 'Работаем 9:00-22:00',
        description: 'Работаем ежедневно, включая выходные и праздники',
    },
];
const processSteps = [
    {
        step: 1,
        title: 'Звонок (5 минут)',
        description: 'Звоните нам или оставляйте заявку. Наш специалист ответит в течение 5 минут и задаст несколько вопросов о вашем автомобиле.',
    },
    {
        step: 2,
        title: 'Выезд специалиста (30-60 минут)',
        description: 'Наш специалист приедет к вам в удобное место. Выезд по всей Москве и МО. Осмотр автомобиля занимает 30-60 минут.',
    },
    {
        step: 3,
        title: 'Оценка и согласование (15 минут)',
        description: 'После осмотра мы предложим честную рыночную цену. Если цена вас устраивает, переходим к оформлению.',
    },
    {
        step: 4,
        title: 'Оформление и оплата (30 минут)',
        description: 'Оформляем все документы (30 минут) и сразу производим оплату. Вы получаете деньги наличными или на карту.',
    },
];
const faqs = [
    {
        question: 'Как быстро происходит срочный выкуп?',
        answer: 'В среднем от звонка до получения денег проходит всего 2 часа. Мы приезжаем на место, осматриваем автомобиль, оформляем документы и сразу производим оплату.',
    },
    {
        question: 'Работаете ли вы в выходные и праздники?',
        answer: 'Да, мы работаем ежедневно с 9:00 до 22:00, включая выходные и праздники. Вы можете связаться с нами в любое удобное время.',
    },
    {
        question: 'Можно ли получить деньги в день обращения?',
        answer: 'Да, именно для этого и существует срочный выкуп. Вы получаете деньги в тот же день, в день обращения. Оплата производится сразу после подписания документов.',
    },
    {
        question: 'Какие документы нужны для срочного выкупа?',
        answer: 'Для срочного выкупа нужны те же документы, что и для обычного: ПТС, СТС, паспорт владельца. Мы поможем оформить все необходимые документы.',
    },
    {
        question: 'Можно ли получить деньги наличными?',
        answer: 'Да, мы предлагаем несколько способов оплаты: наличными, переводом на банковскую карту, банковским переводом. Вы можете выбрать наиболее удобный для вас вариант.',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Срочный выкуп автомобилей за 2 часа',
    description: 'Срочный выкуп автомобилей за 2 часа в Москве и МО. Быстрый выкуп с моментальной оплатой.',
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
    offers: {
        '@type': 'Offer',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
    },
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
const UrgentBuyback = () => {
    const navigate = useNavigate();
    return (<div className="flex-1 bg-neutral-50">
      <SchemaMarkup schema={serviceSchema}/>
      <SchemaMarkup schema={faqSchema}/>
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />
        
        <div className="bg-primary-600 rounded-xl p-8 mb-12 flex flex-col items-center">
          <span className="text-6xl mb-4">⚡</span>
          <h1 className="text-4xl font-bold text-white mb-4 text-center">Срочный выкуп автомобилей за 2 часа</h1>
          <p className="text-lg text-primary-100 mb-8 text-center max-w-[800px]">
            Нужны деньги срочно? Мы выкупим ваш автомобиль за 2 часа с момента обращения.
            Оценка за 5 минут, моментальная оплата. Работаем с 9:00 до 22:00 ежедневно.
          </p>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            <PhoneButton phone={phone1} size="lg"/>
            <Button onClick={() => navigate('/calculator')} variant="secondary" size="lg">
              Оставить заявку
            </Button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Преимущества срочного выкупа</h2>
          <div className="flex flex-row flex-wrap gap-6">
            {advantages.map((advantage, index) => (<Card key={index} className="flex-1 min-w-[250px] p-6 flex flex-col items-center">
                <span className="text-5xl mb-4">{advantage.icon}</span>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 text-center">{advantage.title}</h3>
                <p className="text-base text-neutral-600 text-center leading-6">{advantage.description}</p>
              </Card>))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Как происходит срочный выкуп</h2>
          <div className="flex flex-col gap-6">
            {processSteps.map((step, index) => (<Card key={index} className="p-6 flex flex-row gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">{step.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-base text-neutral-600 leading-6">{step.description}</p>
                </div>
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
          <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">Получите оценку за 5 минут</h2>
          <p className="text-base text-neutral-600 mb-6 text-center">
            Оставьте заявку, и наш специалист свяжется с вами для срочной оценки вашего автомобиля
          </p>
          <CarEvaluationForm />
        </div>

        <RelatedServices currentPath="/services/urgent-buyback"/>
      </div>
    </div>);
};
export default UrgentBuyback;
