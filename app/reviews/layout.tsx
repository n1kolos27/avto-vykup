import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'Отзывы клиентов | Реальные отзывы о выкупе авто',
  description:
    'Реальные отзывы наших клиентов о выкупе автомобилей. Более 12 отзывов с рейтингом 5 звезд. Читайте истории успешных сделок в Москве и МО.',
  keywords:
    'отзывы выкуп авто, отзывы клиентов, реальные отзывы, выкуп автомобилей отзывы, рейтинг компании',
  path: '/reviews',
});

const baseUrl = APP_CONFIG.BASE_URL;

const reviews = [
  {
    name: 'Александр',
    rating: 5,
    text: 'Продал свой автомобиль за один день. Оценка была честной, деньги получил сразу. Очень доволен! Рекомендую всем, кто хочет быстро и выгодно продать авто.',
    date: '2024-03-15',
    carModel: 'Toyota Camry 2018',
  },
  {
    name: 'Мария',
    rating: 5,
    text: 'Быстро, профессионально, без лишних вопросов. Рекомендую всем, кто хочет быстро продать авто. Сотрудники вежливые, все объяснили.',
    date: '2024-03-10',
    carModel: 'BMW X5 2019',
  },
  {
    name: 'Дмитрий',
    rating: 5,
    text: 'Отличный сервис! Цена была выше, чем предлагали в других местах. Спасибо за честность. Очень доволен результатом.',
    date: '2024-03-05',
    carModel: 'Mercedes C-Class 2020',
  },
  {
    name: 'Елена',
    rating: 5,
    text: 'Продала машину после ДТП. Думала, что цена будет очень низкой, но ребята предложили справедливую стоимость. Все прошло быстро и без проблем.',
    date: '2024-02-28',
    carModel: 'Volkswagen Golf 2017',
  },
  {
    name: 'Игорь',
    rating: 5,
    text: 'Обратился с проблемным автомобилем. В других местах отказывали или предлагали копейки. Здесь оценили честно и выкупили. Спасибо!',
    date: '2024-02-20',
    carModel: 'Audi A4 2016',
  },
  {
    name: 'Ольга',
    rating: 5,
    text: 'Очень понравился подход. Не пытались занизить цену, как в других компаниях. Все документы оформили быстро. Рекомендую!',
    date: '2024-02-15',
    carModel: 'Hyundai Solaris 2019',
  },
  {
    name: 'Сергей',
    rating: 5,
    text: 'Продал премиум автомобиль. Оценка была очень справедливой, выше чем в других местах. Профессиональный подход, все быстро и четко.',
    date: '2024-02-10',
    carModel: 'Porsche Cayenne 2021',
  },
  {
    name: 'Анна',
    rating: 5,
    text: 'Автомобиль был в кредите. Помогли разобраться со всеми документами, оформили перевод долга. Очень благодарна за помощь!',
    date: '2024-02-05',
    carModel: 'Kia Rio 2020',
  },
  {
    name: 'Владимир',
    rating: 5,
    text: 'Машина с большим пробегом (250 000 км), но в хорошем состоянии. Оценили честно, не занизили из-за пробега. Спасибо!',
    date: '2024-02-01',
    carModel: 'Toyota RAV4 2015',
  },
  {
    name: 'Татьяна',
    rating: 5,
    text: 'После серьезного ДТП думала, что машину не возьмут или предложат копейки. Но здесь оценили реально и выкупили. Рекомендую!',
    date: '2024-01-28',
    carModel: 'Nissan Qashqai 2018',
  },
  {
    name: 'Михаил',
    rating: 5,
    text: 'Продал элитный автомобиль. Работали очень профессионально, цена была выше рыночной. Очень доволен сделкой.',
    date: '2024-01-25',
    carModel: 'Mercedes-Benz S-Class 2020',
  },
  {
    name: 'Екатерина',
    rating: 5,
    text: 'Быстро и профессионально. Цена была справедливой, все документы оформили за час. Очень довольна!',
    date: '2024-01-20',
    carModel: 'Lexus RX 2019',
  },
];

const reviewsSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Выкуп авто | Московский Авто Альянс',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: reviews.length.toString(),
    bestRating: '5',
    worstRating: '1',
  },
  review: reviews.map((review) => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.name,
    },
    datePublished: review.date,
    reviewBody: review.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    itemReviewed: {
      '@type': 'Service',
      name: 'Выкуп автомобилей',
      ...(review.carModel && { description: review.carModel }),
    },
  })),
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      {children}
    </>
  );
}
