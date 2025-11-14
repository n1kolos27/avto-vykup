import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata } from '@/lib/seo/metadata';
import { MAIN_NAV_ITEMS, FOOTER_NAV_ITEMS } from '@/lib/config';
import { FiHome, FiFileText, FiHelpCircle, FiDollarSign, FiPhone, FiMail } from 'react-icons/fi';

const baseMetadata = generateMetadata({
  title: 'Карта сайта - Выкуп авто',
  description: 'Карта сайта Выкуп авто. Все страницы и разделы сайта по выкупу автомобилей в Москве и МО.',
  path: '/sitemap-page',
});

export const metadata: Metadata = {
  ...baseMetadata,
};

// Blog posts slugs (примерный список)
const blogSlugs = [
  'vykup-avto-v-moskve',
  'kak-prodat-avto-bystro',
  'vykup-bityh-avto',
  'vykup-kreditnyh-avto',
  'cena-vykupa-avto',
  'dokumenty-dlya-vykupa',
  'vykup-premium-avto',
  'vykup-kommercheskogo-transporta',
  'ocenka-avto-pered-prodazhej',
  'vykup-avto-s-probegom',
  'vykup-avto-v-zaloge',
  'vykup-avto-bez-dokumentov',
  'vykup-avto-posle-dtp',
  'vykup-staryh-avto',
  'vykup-dorogih-avto',
  'vykup-deshevyh-avto',
  'vykup-avto-s-dolgami',
  'vykup-avto-v-razbore',
];

export default function SitemapPage() {
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Карта сайта
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Все страницы и разделы сайта Выкуп авто
          </p>

          <div className="space-y-12">
            {/* Main Pages */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <FiHome className="text-primary-600" />
                <span>Основные страницы</span>
              </h2>
              <ul className="space-y-3">
                {MAIN_NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-primary-600 hover:text-primary-700 hover:underline text-lg flex items-center space-x-2"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <FiFileText className="text-primary-600" />
                <span>Услуги</span>
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/services" className="text-primary-600 hover:text-primary-700 hover:underline text-lg">
                    Все услуги по выкупу автомобилей
                  </Link>
                </li>
                <li>
                  <Link href="/calculator" className="text-primary-600 hover:text-primary-700 hover:underline text-lg flex items-center space-x-2">
                    <FiDollarSign size={18} />
                    <span>Калькулятор стоимости</span>
                  </Link>
                </li>
                <li>
                  <Link href="/prices" className="text-primary-600 hover:text-primary-700 hover:underline text-lg">
                    Цены на выкуп авто
                  </Link>
                </li>
              </ul>
            </section>

            {/* Information Pages */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <FiHelpCircle className="text-primary-600" />
                <span>Информация</span>
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/how-we-work" className="text-primary-600 hover:text-primary-700 hover:underline text-lg">
                    Как мы работаем
                  </Link>
                </li>
                <li>
                  <Link href="/guarantees" className="text-primary-600 hover:text-primary-700 hover:underline text-lg">
                    Гарантии
                  </Link>
                </li>
                <li>
                  <Link href="/why-us" className="text-primary-600 hover:text-primary-700 hover:underline text-lg">
                    Почему выбирают нас
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-primary-600 hover:text-primary-700 hover:underline text-lg">
                    Часто задаваемые вопросы
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-primary-600 hover:text-primary-700 hover:underline text-lg">
                    О компании
                  </Link>
                </li>
                <li>
                  <Link href="/documents" className="text-primary-600 hover:text-primary-700 hover:underline text-lg">
                    Документы
                  </Link>
                </li>
              </ul>
            </section>

            {/* Blog */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <FiFileText className="text-primary-600" />
                <span>Блог</span>
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog" className="text-primary-600 hover:text-primary-700 hover:underline text-lg font-semibold">
                    Все статьи блога
                  </Link>
                </li>
                <li className="pl-4 text-gray-600 text-sm">
                  <span className="font-medium">Последние статьи:</span>
                </li>
                {blogSlugs.slice(0, 10).map((slug) => (
                  <li key={slug} className="pl-4">
                    <Link
                      href={`/blog/${slug}`}
                      className="text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <FiPhone className="text-primary-600" />
                <span>Контакты</span>
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/contacts" className="text-primary-600 hover:text-primary-700 hover:underline text-lg flex items-center space-x-2">
                    <FiMail size={18} />
                    <span>Контакты и обратная связь</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="text-primary-600 hover:text-primary-700 hover:underline text-lg">
                    Отзывы клиентов
                  </Link>
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-200">
            <p className="text-gray-700">
              <strong>Не нашли нужную информацию?</strong> Свяжитесь с нами по телефону или оставьте заявку на{' '}
              <Link href="/contacts" className="text-primary-600 hover:text-primary-700 underline font-semibold">
                странице контактов
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

