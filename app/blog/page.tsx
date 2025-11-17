import { Metadata } from 'next';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import AnimatedSection from '@/components/AnimatedSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'Блог о выкупе авто | Статьи и советы | Москва и МО',
  description:
    'Полезные статьи о выкупе автомобилей в Москве и МО, советы по продаже авто, новости рынка. 18+ детальных статей с практическими рекомендациями. Как продать авто, документы, выкуп после ДТП, кредитных авто.',
  keywords:
    'блог выкуп авто, статьи о выкупе, советы по продаже авто, новости автомобильного рынка, как продать авто, информация о выкупе, блог выкуп авто москва, статьи выкуп автомобилей, советы выкуп авто, как продать машину, выкуп авто статьи',
  path: '/blog',
  type: 'website',
});

const blogPosts = [
  {
    slug: 'kak-pravilno-otsenit-avtomobil',
    title: 'Как правильно оценить автомобиль перед продажей',
    excerpt:
      'Узнайте, какие факторы влияют на стоимость автомобиля и как самостоятельно провести предварительную оценку перед обращением к специалистам.',
    date: '20.03.2024',
    category: 'Советы',
  },
  {
    slug: 'dokumenty-dlya-vykupa-avto',
    title: 'Какие документы нужны для выкупа автомобиля',
    excerpt:
      'Полный список документов, необходимых для быстрой и легальной продажи автомобиля. Убедитесь, что у вас все готово заранее.',
    date: '15.03.2024',
    category: 'Информация',
  },
  {
    slug: 'vykup-avto-posle-dtp',
    title: 'Выкуп автомобилей после ДТП: что нужно знать',
    excerpt:
      'Особенности выкупа автомобилей, побывавших в аварии. Как получить справедливую цену за поврежденное авто.',
    date: '10.03.2024',
    category: 'Советы',
  },
  {
    slug: 'rynok-podderzhannyh-avto-2024',
    title: 'Рынок подержанных автомобилей в 2024 году',
    excerpt:
      'Анализ текущей ситуации на рынке подержанных автомобилей в Москве и МО. Тренды и прогнозы на ближайшее время.',
    date: '05.03.2024',
    category: 'Аналитика',
  },
  {
    slug: 'kak-izbezhat-obmana-pri-prodazhe-avto',
    title: 'Как избежать обмана при продаже автомобиля',
    excerpt:
      'Полезные советы по безопасности при продаже автомобиля. Как защитить себя от мошенников и недобросовестных покупателей.',
    date: '28.02.2024',
    category: 'Безопасность',
  },
  {
    slug: 'preimushchestva-vykupa-avto',
    title: 'Преимущества выкупа автомобиля через специализированную компанию',
    excerpt:
      'Почему выгоднее продать автомобиль через компанию по выкупу, а не искать покупателя самостоятельно. Сравнение вариантов.',
    date: '22.02.2024',
    category: 'Информация',
  },
  {
    slug: 'kak-podgotovit-avto-k-prodazhe',
    title: 'Как правильно подготовить автомобиль к продаже',
    excerpt:
      'Детальное руководство по подготовке автомобиля к продаже. Что нужно сделать, чтобы увеличить стоимость и ускорить продажу.',
    date: '18.02.2024',
    category: 'Советы',
  },
  {
    slug: 'vykup-kreditnyh-avtomobilej',
    title: 'Выкуп кредитных автомобилей: особенности и нюансы',
    excerpt:
      'Все о выкупе автомобилей, находящихся в кредите или залоге. Как оформить сделку, какие документы нужны, как решить вопрос с банком.',
    date: '15.02.2024',
    category: 'Информация',
  },
  {
    slug: 'vykup-bityh-avto',
    title: 'Выкуп битых авто: что нужно знать',
    excerpt:
      'Особенности выкупа сильно поврежденных автомобилей. Как оценивается остаточная стоимость, что влияет на цену битого авто.',
    date: '12.02.2024',
    category: 'Советы',
  },
  {
    slug: 'kak-uvelichit-stoimost-avto',
    title: 'Как увеличить стоимость авто перед продажей',
    excerpt:
      'Практические советы по увеличению стоимости автомобиля перед продажей. Что сделать, чтобы получить максимальную цену.',
    date: '08.02.2024',
    category: 'Советы',
  },
  {
    slug: 'sravnenie-vykup-vs-prodazha',
    title: 'Сравнение: выкуп vs продажа самостоятельно',
    excerpt:
      'Детальное сравнение продажи через компанию по выкупу и самостоятельной продажи. Плюсы и минусы каждого варианта.',
    date: '05.02.2024',
    category: 'Аналитика',
  },
  {
    slug: 'yuridicheskie-aspekty-vykupa',
    title: 'Юридические аспекты выкупа авто',
    excerpt:
      'Правовые вопросы при выкупе автомобиля. Какие документы нужны, как оформить сделку правильно, что нужно проверить.',
    date: '01.02.2024',
    category: 'Информация',
  },
  {
    slug: 'vykup-elitnyh-avtomobilej',
    title: 'Выкуп элитных и премиум автомобилей',
    excerpt:
      'Особенности выкупа премиум и элитных автомобилей. Как оцениваются такие авто, что влияет на их стоимость.',
    date: '28.01.2024',
    category: 'Информация',
  },
  {
    slug: 'vykup-kommercheskogo-transporta',
    title: 'Выкуп коммерческого транспорта',
    excerpt:
      'Особенности выкупа грузовиков, микроавтобусов и спецтехники. Как оценивается коммерческий транспорт, какие нюансы учесть.',
    date: '25.01.2024',
    category: 'Информация',
  },
  {
    slug: 'sezonnost-rynka-avto',
    title: 'Сезонность на рынке подержанных авто',
    excerpt:
      'Как сезон влияет на спрос и цены на подержанные автомобили. Когда лучше продавать авто, чтобы получить максимальную цену.',
    date: '22.01.2024',
    category: 'Аналитика',
  },
  {
    slug: 'kak-otsenit-realnuyu-stoimost',
    title: 'Как оценить реальную стоимость авто',
    excerpt:
      'Методы оценки реальной стоимости автомобиля. Какие факторы учитывать, как не продешевить при продаже.',
    date: '18.01.2024',
    category: 'Советы',
  },
  {
    slug: 'psihologiya-prodazhi-avto',
    title: 'Психология продажи: как не продешевить',
    excerpt:
      'Психологические аспекты продажи автомобиля. Как вести переговоры, как не поддаться на давление, как получить справедливую цену.',
    date: '15.01.2024',
    category: 'Советы',
  },
];

const baseUrl = APP_CONFIG.BASE_URL;

const blogPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Блог о выкупе автомобилей',
  description: 'Полезные статьи о выкупе автомобилей, советы по продаже авто, новости автомобильного рынка',
  url: `${baseUrl}/blog`,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        name: post.title,
        description: post.excerpt,
        url: `${baseUrl}/blog/${post.slug}`,
        datePublished: post.date,
        articleSection: post.category,
      },
    })),
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema) }}
      />
      <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs className="mb-6" />
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Блог о выкупе автомобилей
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Полезные статьи, советы и новости о выкупе автомобилей в Москве и МО.
              Узнайте больше о наших услугах: <Link href="/services/urgent-buyback" className="text-primary-600 hover:text-primary-700 underline">срочный выкуп</Link>,
              <Link href="/services/damaged-cars" className="text-primary-600 hover:text-primary-700 underline"> выкуп битых авто</Link>,
              <Link href="/services/after-accident" className="text-primary-600 hover:text-primary-700 underline"> выкуп после ДТП</Link>,
              <Link href="/services/credit-cars" className="text-primary-600 hover:text-primary-700 underline"> выкуп кредитных авто</Link>,
              <Link href="/services/premium-cars" className="text-primary-600 hover:text-primary-700 underline"> выкуп премиум авто</Link>.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
