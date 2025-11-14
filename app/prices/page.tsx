import { Metadata } from 'next';
import Link from 'next/link';
import { FiDollarSign, FiTrendingUp, FiInfo, FiCheckCircle } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'Цены на выкуп автомобилей | Прозрачное ценообразование',
  description:
    'Прозрачная информация о ценообразовании при выкупе автомобилей. Как мы определяем цену, что влияет на стоимость. Факторы оценки: марка, год, пробег, состояние, комплектация.',
  keywords:
    'цены выкуп авто, стоимость выкупа, ценообразование, факторы цены, как определяется цена, оценка стоимости',
  path: '/prices',
});

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

export default function PricesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricesPageSchema) }}
      />
      <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs className="mb-6" />
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Цены на выкуп автомобилей
            </h1>
            <p className="text-lg text-gray-600">
              Прозрачная информация о том, как мы определяем стоимость вашего автомобиля
            </p>
          </AnimatedSection>

          <section className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
              <FiDollarSign className="text-primary-600" />
              <span>Как мы определяем цену</span>
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Мы предлагаем справедливую рыночную стоимость вашего автомобиля. Наша
                оценка основана на множестве факторов и актуальных данных о продажах
                аналогичных автомобилей на рынке. Используйте наш <Link href="/calculator" className="text-primary-600 hover:text-primary-700 underline">онлайн-калькулятор</Link> для предварительной оценки.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Мы не занижаем цены и не используем скрытые комиссии. Цена, которую мы
                называем, - это цена, которую вы получите. Никаких дополнительных расходов
                или вычетов нет. <Link href="/guarantees" className="text-primary-600 hover:text-primary-700 underline">Ознакомьтесь с нашими гарантиями при выкупе авто</Link>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Наши специалисты имеют большой опыт и знают реальные цены на рынке. Мы
                учитываем все факторы и предлагаем объективную оценку, которая отражает
                реальную стоимость вашего автомобиля. <Link href="/services" className="text-primary-600 hover:text-primary-700 underline">Ознакомьтесь с полным спектром услуг по выкупу автомобилей</Link>.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
              <FiTrendingUp className="text-primary-600" />
              <span>Факторы, влияющие на цену</span>
            </h2>
            <div className="space-y-4">
              {factors.map((factor, index) => (
                <AnimatedCard
                  key={index}
                  delay={index * 0.05}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {factor.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        factor.impact === 'Очень высокий'
                          ? 'bg-red-100 text-red-700'
                          : factor.impact === 'Высокий'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {factor.impact}
                    </span>
                  </div>
                  <p className="text-gray-600">{factor.description}</p>
                </AnimatedCard>
              ))}
            </div>
          </section>

          <section className="bg-primary-50 border-2 border-primary-200 rounded-lg p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
              <FiInfo className="text-primary-600" />
              <span>Важная информация</span>
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiCheckCircle className="text-primary-600 text-xl mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Мы не берем комиссию - цена, которую мы называем, это цена, которую вы получите
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <FiCheckCircle className="text-primary-600 text-xl mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Предварительная оценка по телефону или через калькулятор может отличаться от финальной цены
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <FiCheckCircle className="text-primary-600 text-xl mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Точную цену можно узнать только после осмотра автомобиля нашим специалистом
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <FiCheckCircle className="text-primary-600 text-xl mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Мы всегда готовы обсудить цену и объяснить, почему она именно такая
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <FiCheckCircle className="text-primary-600 text-xl mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Если вы найдете более выгодное предложение, мы готовы обсудить цену
                </span>
              </li>
            </ul>
          </section>

          <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">Почему наша цена справедлива</h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Мы ориентируемся на актуальные рыночные цены на аналогичные автомобили
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Учитываем все факторы: состояние, пробег, комплектацию, историю обслуживания
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Наши специалисты имеют большой опыт и знают реальные цены на рынке
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Мы не занижаем цены и не используем скрытые комиссии
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span>✓</span>
                <span>
                  Цена, которую мы называем, - это цена, которую вы получите
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}
