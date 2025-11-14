import { Metadata } from 'next';
import Link from 'next/link';
import Calculator from '@/components/Calculator';
import CarEvaluationForm from '@/components/CarEvaluationForm';
import PriceFactors from '@/components/PriceFactors';
import PreparationTips from '@/components/PreparationTips';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = genMeta({
  title: 'Калькулятор стоимости автомобиля | Онлайн расчет цены',
  description:
    'Быстрый расчет стоимости вашего автомобиля онлайн. Узнайте предварительную цену за 2 минуты. Бесплатно и без регистрации. Учитываем марку, модель, год, пробег, состояние.',
  keywords:
    'калькулятор стоимости авто, расчет цены автомобиля, оценка авто онлайн, стоимость машины, калькулятор цены авто, предварительная оценка',
  path: '/calculator',
});

import { APP_CONFIG } from '@/lib/config';

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

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs className="mb-6" />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Калькулятор стоимости автомобиля
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Узнайте предварительную стоимость вашего автомобиля за несколько минут.
              Точную цену определит наш специалист при осмотре. <Link href="/prices" className="text-primary-600 hover:text-primary-700 underline">Узнайте, как мы определяем цену при выкупе авто</Link> и <Link href="/how-we-work" className="text-primary-600 hover:text-primary-700 underline">ознакомьтесь с процессом выкупа за 4 шага</Link>.
            </p>
          </div>

          <Calculator />

          <div className="mt-16 space-y-12">
            <PriceFactors />
            <PreparationTips />
          </div>

          <div id="contact-form" className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Получите точную оценку
              </h2>
              <p className="text-lg text-gray-600">
                Оставьте заявку, и наш специалист свяжется с вами для уточнения деталей
              </p>
            </div>
            <CarEvaluationForm />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
