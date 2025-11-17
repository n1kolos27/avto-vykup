import { Metadata } from 'next';
import Link from 'next/link';
import { FiAward, FiUsers, FiTrendingUp, FiShield } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'О нас | Выкуп авто Москва | 10+ лет опыта | 5000+ клиентов',
  description:
    'Компания по выкупу автомобилей в Москве и МО. 10+ лет опыта, 5000+ клиентов, 2.5 млрд ₽ выкупленных авто. Команда профессионалов. Выкуп за 2 часа, до 97% рыночной стоимости.',
  keywords:
    'о компании, выкуп авто, история компании, опыт работы, команда профессионалов, достижения, компания выкуп авто москва, о нас выкуп автомобилей, история компании выкуп, опыт работы выкуп авто',
  path: '/about',
});

const achievements = [
  {
    icon: FiAward,
    title: '10+ лет на рынке',
    description: 'Более 10 лет успешной работы на рынке выкупа автомобилей в Москве и МО',
  },
  {
    icon: FiUsers,
    title: '5000+ клиентов',
    description: 'Более 5000 довольных клиентов уже продали свои автомобили через нас',
  },
  {
    icon: FiTrendingUp,
    title: '2.5 млрд ₽',
    description: 'Общая сумма выкупленных автомобилей за все время работы',
  },
  {
    icon: FiShield,
    title: '100% гарантия',
    description: 'Гарантируем честность, прозрачность и безопасность каждой сделки',
  },
];

const baseUrl = APP_CONFIG.BASE_URL;

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'О компании Выкуп авто',
  description: 'Информация о компании по выкупу автомобилей в Москве и МО. Более 10 лет опыта, 5000+ клиентов.',
  url: `${baseUrl}/about`,
  mainEntity: {
    '@type': 'Organization',
    name: 'Выкуп авто | Московский Авто Альянс',
    foundingDate: '2014',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '15-50',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '12',
      bestRating: '5',
      worstRating: '1',
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs className="mb-6" />
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              О нашей компании
            </h1>
            <p className="text-lg text-gray-600">
              Профессиональный выкуп автомобилей в Москве и Московской области
            </p>
          </AnimatedSection>

          <section className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Наша история</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Мы начали свою деятельность более 10 лет назад с простой идеи - помочь
                людям быстро и выгодно продать свои автомобили. За это время мы выросли
                из небольшой компании в одного из лидеров рынка выкупа автомобилей в
                Москве и Московской области.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Наш успех основан на трех принципах: честность, профессионализм и
                скорость. Мы понимаем, что продажа автомобиля - это важное решение, и
                стремимся сделать этот процесс максимально простым и выгодным для наших
                клиентов. <Link href="/how-we-work" className="text-primary-600 hover:text-primary-700 underline">Ознакомьтесь с процессом выкупа автомобиля</Link> — от звонка до получения денег за 2 часа.
              </p>
              <p className="text-gray-700 leading-relaxed">
                За годы работы мы выкупили более 5000 автомобилей на общую сумму свыше
                2.5 миллиардов рублей. Мы работаем с автомобилями всех марок и моделей,
                в любом состоянии - от идеального до требующего серьезного ремонта. <Link href="/reviews" className="text-primary-600 hover:text-primary-700 underline">Прочитайте отзывы наших клиентов о выкупе автомобилей</Link>.
                Предлагаем <Link href="/services/urgent-buyback" className="text-primary-600 hover:text-primary-700 underline">срочный выкуп</Link>,
                <Link href="/services/damaged-cars" className="text-primary-600 hover:text-primary-700 underline"> выкуп битых авто</Link>,
                <Link href="/services/after-accident" className="text-primary-600 hover:text-primary-700 underline"> выкуп после ДТП</Link>,
                <Link href="/services/credit-cars" className="text-primary-600 hover:text-primary-700 underline"> выкуп кредитных авто</Link> и
                <Link href="/services/premium-cars" className="text-primary-600 hover:text-primary-700 underline"> выкуп премиум автомобилей</Link>.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <AnimatedCard
                  key={index}
                  delay={index * 0.1}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon className="text-primary-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </AnimatedCard>
              );
            })}
          </div>

          <section className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Наши принципы</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Честность</h3>
                <p className="text-gray-600">
                  Мы предлагаем справедливую рыночную цену за каждый автомобиль. Никаких
                  скрытых комиссий, занижения цен или обмана. Цена, которую мы называем,
                  - это цена, которую вы получите.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Профессионализм
                </h3>
                <p className="text-gray-600">
                  Наша команда состоит из опытных специалистов, которые знают рынок и
                  умеют правильно оценить автомобиль. Мы учитываем все факторы и
                  предлагаем объективную оценку.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Скорость</h3>
                <p className="text-gray-600">
                  Мы понимаем, что время - это деньги. Поэтому мы работаем быстро: от
                  звонка до получения денег в среднем проходит всего 2 часа. Без долгих
                  ожиданий и проволочек.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Безопасность</h3>
                <p className="text-gray-600">
                  Все сделки оформляются официально с соблюдением всех требований
                  законодательства. Вы получаете полную юридическую защиту и гарантию
                  законности сделки.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Почему выбирают нас</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <span>
                  Более 10 лет опыта на рынке выкупа автомобилей
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <span>
                  Более 5000 довольных клиентов и 98% положительных отзывов
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <span>
                  Честная рыночная цена без занижения и скрытых комиссий
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <span>
                  Моментальная оплата сразу после подписания документов
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <span>
                  Работаем с автомобилями в любом состоянии
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <span>
                  Официальное оформление всех документов
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <span>
                  Работаем ежедневно, включая выходные и праздники
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
