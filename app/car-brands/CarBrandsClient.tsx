'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { APP_CONFIG } from '@/lib/config';

const carBrands = [
  { name: 'Toyota', category: 'popular', examples: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser'] },
  { name: 'Mercedes-Benz', category: 'premium', examples: ['C-Class', 'E-Class', 'S-Class', 'GLE'] },
  { name: 'BMW', category: 'premium', examples: ['3 Series', '5 Series', 'X5', 'X3'] },
  { name: 'Audi', category: 'premium', examples: ['A4', 'A6', 'Q5', 'Q7'] },
  { name: 'Volkswagen', category: 'popular', examples: ['Passat', 'Tiguan', 'Polo', 'Golf'] },
  { name: 'Ford', category: 'popular', examples: ['Focus', 'Mondeo', 'Kuga', 'Explorer'] },
  { name: 'Nissan', category: 'popular', examples: ['Qashqai', 'X-Trail', 'Altima', 'Pathfinder'] },
  { name: 'Hyundai', category: 'budget', examples: ['Solaris', 'Tucson', 'Santa Fe', 'Elantra'] },
  { name: 'Kia', category: 'budget', examples: ['Rio', 'Sportage', 'Sorento', 'Optima'] },
  { name: 'Mazda', category: 'popular', examples: ['CX-5', '6', 'CX-9', '3'] },
  { name: 'Honda', category: 'popular', examples: ['CR-V', 'Accord', 'Civic', 'Pilot'] },
  { name: 'Lexus', category: 'premium', examples: ['RX', 'NX', 'ES', 'GX'] },
  { name: 'Volvo', category: 'premium', examples: ['XC60', 'XC90', 'S90', 'V90'] },
  { name: 'Skoda', category: 'popular', examples: ['Octavia', 'Kodiaq', 'Superb', 'Kamiq'] },
  { name: 'Renault', category: 'budget', examples: ['Logan', 'Duster', 'Kaptur', 'Arkana'] },
  { name: 'Peugeot', category: 'popular', examples: ['3008', '5008', '308', '508'] },
  { name: 'Citroen', category: 'budget', examples: ['C4', 'C5', 'Berlingo', 'C3'] },
  { name: 'Opel', category: 'popular', examples: ['Astra', 'Insignia', 'Crossland', 'Grandland'] },
  { name: 'Chevrolet', category: 'popular', examples: ['Cruze', 'Tahoe', 'Equinox', 'Traverse'] },
  { name: 'Mitsubishi', category: 'popular', examples: ['Outlander', 'Pajero', 'L200', 'ASX'] },
  { name: 'Subaru', category: 'popular', examples: ['Forester', 'Outback', 'Impreza', 'XV'] },
  { name: 'Infiniti', category: 'premium', examples: ['QX50', 'QX60', 'Q50', 'QX80'] },
  { name: 'Porsche', category: 'premium', examples: ['Cayenne', 'Macan', 'Panamera', '911'] },
  { name: 'Jaguar', category: 'premium', examples: ['F-Pace', 'XE', 'XF', 'E-Pace'] },
  { name: 'Land Rover', category: 'premium', examples: ['Range Rover', 'Discovery', 'Defender', 'Evoque'] },
  { name: 'Range Rover', category: 'premium', examples: ['Range Rover', 'Range Rover Sport', 'Range Rover Velar'] },
  { name: 'Tesla', category: 'premium', examples: ['Model 3', 'Model S', 'Model X', 'Model Y'] },
];

type Category = 'all' | 'budget' | 'popular' | 'premium';

export default function CarBrandsClient() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrands = useMemo(() => {
    return carBrands.filter((brand) => {
      const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
      const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'Все марки' },
    { value: 'budget', label: 'Бюджетные' },
    { value: 'popular', label: 'Средний класс' },
    { value: 'premium', label: 'Премиум' },
  ];

  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs className="mb-6" />

          {/* Hero Section */}
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Марки автомобилей, которые мы выкупаем
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Выкупаем автомобили всех популярных марок: от бюджетных до премиум класса.
              Найдите свою марку и узнайте примеры моделей, которые мы выкупаем.
            </p>
          </AnimatedSection>

          {/* Search and Filter */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск по марке..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <FiFilter className="text-gray-400" />
                  <span className="text-gray-600 font-medium">Категория:</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Brands Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrands.map((brand, index) => (
                <AnimatedCard
                  key={brand.name}
                  delay={index * 0.05}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {brand.name}
                  </h3>
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      brand.category === 'premium'
                        ? 'bg-purple-100 text-purple-700'
                        : brand.category === 'popular'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {brand.category === 'premium'
                        ? 'Премиум'
                        : brand.category === 'popular'
                        ? 'Средний класс'
                        : 'Бюджетные'}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Популярные модели:</p>
                    <div className="flex flex-wrap gap-2">
                      {brand.examples.map((model, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/services/buyback-cars?brand=${encodeURIComponent(brand.name)}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  >
                    Узнать цену выкупа {brand.name}
                    <span className="ml-2">→</span>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
            {filteredBrands.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Марки не найдены. Попробуйте изменить фильтры или поисковый запрос.
                </p>
              </div>
            )}
          </section>

          {/* CTA Section */}
          <section className="bg-primary-600 text-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Не нашли свою марку?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Мы выкупаем автомобили всех марок и моделей. Свяжитесь с нами для оценки вашего автомобиля.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/buyback-cars"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                Получить оценку
              </Link>
              <Link
                href={`tel:${APP_CONFIG.PHONE_1}`}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Позвонить: {APP_CONFIG.PHONE_1}
              </Link>
            </div>
          </section>

          {/* Related Services */}
          <section className="mt-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Наши услуги
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/services/buyback-cars"
                className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors text-center"
              >
                <h3 className="font-semibold text-gray-800 mb-2">Выкуп автомобилей</h3>
                <p className="text-sm text-gray-600">Все марки и модели</p>
              </Link>
              <Link
                href="/services/urgent-buyback"
                className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors text-center"
              >
                <h3 className="font-semibold text-gray-800 mb-2">Срочный выкуп</h3>
                <p className="text-sm text-gray-600">Выкуп за 2 часа</p>
              </Link>
              <Link
                href="/services/premium-cars"
                className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors text-center"
              >
                <h3 className="font-semibold text-gray-800 mb-2">Выкуп премиум авто</h3>
                <p className="text-sm text-gray-600">Элитные автомобили</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
