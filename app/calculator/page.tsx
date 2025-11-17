import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Calculator from '@/components/Calculator';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

// Lazy load components below the fold for better performance
const CarEvaluationForm = dynamic(() => import('@/components/CarEvaluationForm'), {
  loading: () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-6 animate-pulse" />
      <div className="space-y-4">
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  ),
});

const PriceFactors = dynamic(() => import('@/components/PriceFactors'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
});

const PreparationTips = dynamic(() => import('@/components/PreparationTips'), {
  loading: () => <div className="h-96 bg-white animate-pulse rounded-lg" />,
});

export const metadata: Metadata = genMeta({
  title: 'Калькулятор стоимости авто | Онлайн оценка | Москва',
  description:
    'Быстрый расчет стоимости выкупа вашего автомобиля онлайн. Узнайте предварительную цену за 2 минуты. Бесплатно и без регистрации. Учитываем марку, модель, год, пробег, состояние. До 97% рыночной стоимости.',
  keywords:
    'калькулятор стоимости авто, расчет цены автомобиля, оценка авто онлайн, стоимость машины, калькулятор цены авто, предварительная оценка, калькулятор выкупа авто, онлайн оценка авто, расчет стоимости выкупа, калькулятор цены выкупа',
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
              Также предлагаем <Link href="/services/urgent-buyback" className="text-primary-600 hover:text-primary-700 underline">срочный выкуп за 2 часа</Link> и
              <Link href="/car-brands" className="text-primary-600 hover:text-primary-700 underline"> выкуп всех марок автомобилей</Link>.
            </p>
          </div>

          <section aria-labelledby="calculator-heading">
            <Calculator />
          </section>

          <section className="mt-16 space-y-12" aria-label="Дополнительная информация">
            <PriceFactors />
            <PreparationTips />
          </section>

          <section id="contact-form" className="mt-16" aria-labelledby="contact-form-heading">
            <div className="text-center mb-8">
              <h2 id="contact-form-heading" className="text-3xl font-bold text-gray-800 mb-4">
                Получите точную оценку
              </h2>
              <p className="text-lg text-gray-600">
                Оставьте заявку, и наш специалист свяжется с вами для уточнения деталей
              </p>
            </div>
            <CarEvaluationForm />
          </section>
        </div>
      </div>
    </div>
    </>
  );
}
