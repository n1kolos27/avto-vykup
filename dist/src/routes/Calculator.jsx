import React from 'react';
import { useNavigate } from 'react-router-dom';
import Calculator from '../components/Calculator.js';
import Breadcrumbs from '../components/Breadcrumbs.js';
import PriceFactors from '../components/PriceFactors.js';
import PreparationTips from '../components/PreparationTips.js';
import CarEvaluationForm from '../components/CarEvaluationForm.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
const baseUrl = APP_CONFIG.BASE_URL;
const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Калькулятор стоимости автомобиля',
    description: 'Онлайн калькулятор для расчета предварительной стоимости автомобиля. Учитывает марку, модель, год выпуска, пробег и состояние.',
    url: `${baseUrl}/calculator`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB',
    },
    featureList: [
        'Расчет стоимости автомобиля',
        'Учет марки и модели',
        'Учет года выпуска',
        'Учет пробега',
        'Учет состояния',
        'Мгновенный результат',
    ],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    provider: {
        '@type': 'Organization',
        name: 'Выкуп авто | Московский Авто Альянс',
        url: baseUrl,
    },
};
const CalculatorPage = () => {
    const navigate = useNavigate();
    const handleLinkPress = (path) => {
        navigate(path);
    };
    return (<div className="flex-1 bg-neutral-50">
      {/* Schema.org разметка */}
      <SchemaMarkup schema={webApplicationSchema} id="calculator-schema"/>

      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />

        <div className="flex flex-col items-center mb-8 mt-4">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">
            Калькулятор стоимости автомобиля
          </h1>
          <p className="text-base text-neutral-600 text-center max-w-[800px] leading-6">
            Узнайте предварительную стоимость вашего автомобиля за несколько минут.
            Точную цену определит наш специалист при осмотре.{' '}
            <button onClick={() => handleLinkPress('/prices')} className="text-primary-600 underline">
              Узнайте, как мы определяем цену при выкупе авто
            </button>{' '}
            и{' '}
            <button onClick={() => handleLinkPress('/how-we-work')} className="text-primary-600 underline">
              ознакомьтесь с процессом выкупа за 4 шага
            </button>
            . Также предлагаем{' '}
            <button onClick={() => handleLinkPress('/services/urgent-buyback')} className="text-primary-600 underline">
              срочный выкуп за 2 часа
            </button>{' '}
            и{' '}
            <button onClick={() => handleLinkPress('/car-brands')} className="text-primary-600 underline">
              выкуп всех марок автомобилей
            </button>
            .
          </p>
        </div>

        <div className="mb-12">
          <Calculator />
        </div>

        <div className="flex flex-col gap-6 mb-12">
          <PriceFactors />
          <PreparationTips />
        </div>

        <div className="mb-12" id="contact-form">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3 text-center">
              Получите точную оценку
            </h2>
            <p className="text-base text-neutral-600 text-center max-w-[600px]">
              Оставьте заявку, и наш специалист свяжется с вами для уточнения деталей
            </p>
          </div>
          <CarEvaluationForm />
        </div>
      </div>
    </div>);
};
export default CalculatorPage;
