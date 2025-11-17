import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { APP_CONFIG } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'Контакты | Выкуп авто Москва | Телефон 89857520001',
  description:
    'Свяжитесь с нами для выкупа автомобиля в Москве и МО. Телефоны: 89857520001, 89164980001. Email: info@mos-avto-alyans.ru. Работаем ежедневно 9:00-22:00. Срочный выкуп за 2 часа, битых авто, после ДТП, кредитных и премиум.',
  keywords:
    'контакты выкуп авто, телефон выкуп авто, связаться выкуп авто, позвонить выкуп авто, контакты выкуп авто москва, телефон выкуп автомобилей, адрес выкуп авто, связаться выкуп автомобилей москва, контактная информация выкуп авто',
  path: '/contacts',
});

const baseUrl = APP_CONFIG.BASE_URL;
const phone1 = APP_CONFIG.PHONE_1;
const email = APP_CONFIG.EMAIL;

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Контакты Выкуп авто',
  description: 'Свяжитесь с нами для выкупа автомобиля в Москве и Московской области',
  url: `${baseUrl}/contacts`,
  mainEntity: {
    '@type': 'Organization',
    name: 'Выкуп авто | Московский Авто Альянс',
    telephone: `+7${phone1.replace(/\D/g, '')}`,
    email: email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Москва',
      addressRegion: 'Московская область',
      addressCountry: 'RU',
      streetAddress: 'Москва и Московская область',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 55.7558,
      longitude: 37.6173,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '21:00',
    },
  },
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
