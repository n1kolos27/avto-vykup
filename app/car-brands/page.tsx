import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import CarBrandsClient from './CarBrandsClient';

export const metadata: Metadata = genMeta({
  title: 'Марки автомобилей | Выкуп всех марок авто Москва',
  description:
    'Выкупаем автомобили всех популярных марок: Toyota, Mercedes-Benz, BMW, Audi, Volkswagen и другие. От бюджетных до премиум класса. Найдите свою марку и узнайте примеры моделей.',
  keywords:
    'выкуп марки авто, выкуп Toyota, выкуп Mercedes, выкуп BMW, выкуп Audi, выкуп всех марок, марки автомобилей выкуп, выкуп популярных марок',
  path: '/car-brands',
});

export default function CarBrandsPage() {
  return <CarBrandsClient />;
}
