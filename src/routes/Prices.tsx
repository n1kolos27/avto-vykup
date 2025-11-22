import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';

const factors = [
  {
    title: 'Марка и модель',
    impact: 'Высокий',
    description:
      'Популярные марки и модели имеют лучшую ликвидность и сохраняют стоимость. Премиум-бренды также ценятся выше.',
  },
  {
    title: 'Год выпуска',
    impact: 'Высокий',
    description:
      'Чем новее автомобиль, тем выше его стоимость. С каждым годом автомобиль теряет в цене из-за амортизации.',
  },
  {
    title: 'Пробег',
    impact: 'Средний',
    description:
      'Высокий пробег снижает стоимость. Нормальный пробег: 15,000-20,000 км в год. Превышение нормы снижает цену.',
  },
  {
    title: 'Техническое состояние',
    impact: 'Очень высокий',
    description:
      'Автомобиль в отличном состоянии стоит на 20-30% дороже. Неисправности и необходимость ремонта снижают стоимость.',
  },
  {
    title: 'Внешний вид',
    impact: 'Средний',
    description:
      'Чистый, ухоженный автомобиль без царапин и вмятин оценивается выше на 5-10%.',
  },
  {
    title: 'Комплектация',
    impact: 'Средний',
    description:
      'Дополнительные опции (навигация, кожаный салон, камера) увеличивают стоимость на 3-8%.',
  },
  {
    title: 'История обслуживания',
    impact: 'Средний',
    description:
      'Наличие полной истории ТО повышает стоимость на 5-15%. Документы о ремонтах подтверждают уход.',
  },
  {
    title: 'Рыночная стоимость',
    impact: 'Очень высокий',
    description:
      'Мы ориентируемся на актуальные рыночные цены на аналогичные автомобили. Цена зависит от спроса и предложения.',
  },
];

const baseUrl = APP_CONFIG.BASE_URL;

const pricesPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Цены на выкуп автомобилей',
  description: 'Прозрачная информация о ценообразовании при выкупе автомобилей. Факторы оценки стоимости.',
  url: `${baseUrl}/prices`,
  mainEntity: {
    '@type': 'Service',
    name: 'Выкуп автомобилей',
    provider: {
      '@type': 'Organization',
      name: 'Выкуп авто | Московский Авто Альянс',
      url: baseUrl,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Москва',
      },
      {
        '@type': 'State',
        name: 'Московская область',
      },
    ],
  },
};

const Prices: React.FC = () => {
  const navigate = useNavigate();

  const getImpactColor = (impact: string) => {
    if (impact === 'Очень высокий') return 'text-error-500 bg-error-100';
    if (impact === 'Высокий') return 'text-warning-600 bg-warning-100';
    return 'text-info-600 bg-info-100';
  };

  return (
    <div className="flex-1 bg-neutral-50">
      <SchemaMarkup schema={pricesPageSchema} />
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />
        <div className="flex flex-col items-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">Цены на выкуп автомобилей</h1>
          <p className="text-lg text-neutral-600 text-center mb-4">
            Прозрачная информация о том, как мы определяем стоимость вашего автомобиля
          </p>
          <p className="text-sm text-neutral-600 text-center max-w-[600px]">
            Узнайте больше о наших услугах:{' '}
            <button
              onClick={() => navigate('/services/urgent-buyback')}
              className="text-primary-600 underline"
            >
              срочный выкуп
            </button>
            ,{' '}
            <button
              onClick={() => navigate('/services/damaged-cars')}
              className="text-primary-600 underline"
            >
              выкуп битых авто
            </button>
            ,{' '}
            <button
              onClick={() => navigate('/services/after-accident')}
              className="text-primary-600 underline"
            >
              выкуп после ДТП
            </button>
            ,{' '}
            <button
              onClick={() => navigate('/services/credit-cars')}
              className="text-primary-600 underline"
            >
              выкуп кредитных авто
            </button>
            ,{' '}
            <button
              onClick={() => navigate('/services/premium-cars')}
              className="text-primary-600 underline"
            >
              выкуп премиум авто
            </button>
            .
          </p>
        </div>

        <Card className="p-8 mb-8">
          <div className="flex flex-row items-center gap-3 mb-6">
            <span className="text-3xl">💰</span>
            <h2 className="text-3xl font-bold text-neutral-900">Как мы определяем цену</h2>
          </div>
          <p className="text-base text-neutral-700 leading-7 mb-4">
            Мы предлагаем справедливую рыночную стоимость вашего автомобиля. Наша
            оценка основана на множестве факторов и актуальных данных о продажах
            аналогичных автомобилей на рынке. Используйте наш{' '}
            <button
              onClick={() => navigate('/calculator')}
              className="text-primary-600 underline"
            >
              онлайн-калькулятор
            </button>{' '}
            для предварительной оценки.
          </p>
          <p className="text-base text-neutral-700 leading-7 mb-4">
            Мы не занижаем цены и не используем скрытые комиссии. Цена, которую мы
            называем, - это цена, которую вы получите. Никаких дополнительных расходов
            или вычетов нет.{' '}
            <button
              onClick={() => navigate('/guarantees')}
              className="text-primary-600 underline"
            >
              Ознакомьтесь с нашими гарантиями при выкупе авто
            </button>
            .
          </p>
          <p className="text-base text-neutral-700 leading-7">
            Наши специалисты имеют большой опыт и знают реальные цены на рынке. Мы
            учитываем все факторы и предлагаем объективную оценку, которая отражает
            реальную стоимость вашего автомобиля.{' '}
            <button
              onClick={() => navigate('/services')}
              className="text-primary-600 underline"
            >
              Ознакомьтесь с полным спектром услуг по выкупу автомобилей
            </button>
            .
          </p>
        </Card>

        <Card className="p-8 mb-8">
          <div className="flex flex-row items-center gap-3 mb-6">
            <span className="text-3xl">📈</span>
            <h2 className="text-3xl font-bold text-neutral-900">Факторы, влияющие на цену</h2>
          </div>
          <div className="flex flex-col gap-4">
            {factors.map((factor, index) => (
              <Card key={index} className="p-4 border border-neutral-200">
                <div className="flex flex-row justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-neutral-900 flex-1">{factor.title}</h3>
                  <div className={`px-3 py-1 rounded-xl ${getImpactColor(factor.impact)}`}>
                    <span className="text-sm font-medium">{factor.impact}</span>
                  </div>
                </div>
                <p className="text-base text-neutral-600 leading-6">{factor.description}</p>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="bg-warning-50 p-8 mb-8 border-2 border-warning-200">
          <div className="flex flex-row items-center gap-3 mb-6">
            <span className="text-3xl">ℹ️</span>
            <h2 className="text-3xl font-bold text-neutral-900">Важная информация</h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              'Мы не берем комиссию - цена, которую мы называем, это цена, которую вы получите',
              'Предварительная оценка по телефону или через калькулятор может отличаться от финальной цены',
              'Точную цену можно узнать только после осмотра автомобиля нашим специалистом',
              'Мы всегда готовы обсудить цену и объяснить, почему она именно такая',
              'Если вы найдете более выгодное предложение, мы готовы обсудить цену',
            ].map((item) => (
              <div key={item} className="flex flex-row items-start gap-3">
                <span className="text-xl text-primary-600 mt-0.5">✓</span>
                <span className="text-base text-neutral-700 flex-1 leading-6">{item}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="bg-primary-600 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Почему наша цена справедлива</h2>
          <div className="flex flex-col gap-3">
            {[
              'Мы ориентируемся на актуальные рыночные цены на аналогичные автомобили',
              'Учитываем все факторы: состояние, пробег, комплектацию, историю обслуживания',
              'Наши специалисты имеют большой опыт и знают реальные цены на рынке',
              'Мы не занижаем цены и не используем скрытые комиссии',
              'Цена, которую мы называем, - это цена, которую вы получите',
            ].map((item) => (
              <div key={item} className="flex flex-row items-start gap-3">
                <span className="text-xl text-white font-bold mt-0.5">✓</span>
                <span className="text-lg text-white flex-1 leading-7">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;
