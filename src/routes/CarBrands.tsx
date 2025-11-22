import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import Input from '../components/ui/Input.js';
import Button from '../components/ui/Button.js';
import { APP_CONFIG } from '../lib/config/index.js';

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

const CarBrands: React.FC = () => {
  const navigate = useNavigate();
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

  const getCategoryLabel = (category: string) => {
    if (category === 'premium') return 'Премиум';
    if (category === 'popular') return 'Средний класс';
    return 'Бюджетные';
  };

  const getCategoryColor = (category: string) => {
    if (category === 'premium') return { bg: 'bg-purple-100', text: 'text-purple-700' };
    if (category === 'popular') return { bg: 'bg-primary-100', text: 'text-info-800' };
    return { bg: 'bg-success-100', text: 'text-success-800' };
  };

  return (
    <div className="flex-1 bg-neutral-50">
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />
        <div className="flex flex-col items-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">
            Марки автомобилей, которые мы выкупаем
          </h1>
          <p className="text-lg text-neutral-600 text-center max-w-[800px] mb-8">
            Выкупаем автомобили всех популярных марок: от бюджетных до премиум класса.
            Найдите свою марку и узнайте примеры моделей, которые мы выкупаем.
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="flex flex-row gap-4 mb-4">
            <div className="flex-1 flex flex-row items-center border border-neutral-300 rounded-lg px-3">
              <span className="text-xl mr-2">🔍</span>
              <Input
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Поиск по марке..."
                className="border-0 p-0"
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="text-xl text-neutral-600">🔽</span>
              <span className="text-base font-medium text-neutral-700">Категория:</span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary-600 text-white font-semibold'
                    : 'bg-neutral-100 text-neutral-700 font-medium'
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <span className="text-sm">{category.label}</span>
              </button>
            ))}
          </div>
        </Card>

        <div className="flex flex-row flex-wrap gap-6 mb-8">
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand) => {
              const categoryColor = getCategoryColor(brand.category);
              return (
                <Card key={brand.name} className="flex-1 min-w-[300px] p-6">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">{brand.name}</h3>
                  <div className="mb-4">
                    <div className={`inline-block px-3 py-1 rounded-xl ${categoryColor.bg}`}>
                      <span className={`text-sm font-medium ${categoryColor.text}`}>
                        {getCategoryLabel(brand.category)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-neutral-600 mb-2">Популярные модели:</p>
                  <div className="flex flex-row flex-wrap gap-2 mb-4">
                    {brand.examples.map((model, idx) => (
                      <div key={idx} className="bg-neutral-100 px-2 py-1 rounded">
                        <span className="text-xs text-neutral-700">{model}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/services/buyback-cars?brand=${encodeURIComponent(brand.name)}`)}
                    className="text-base font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Узнать цену выкупа {brand.name} →
                  </button>
                </Card>
              );
            })
          ) : (
            <div className="py-12 flex items-center justify-center w-full">
              <p className="text-lg text-neutral-600">
                Марки не найдены. Попробуйте изменить фильтры или поисковый запрос.
              </p>
            </div>
          )}
        </div>

        <div className="bg-primary-600 rounded-xl p-8 mb-8 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Не нашли свою марку?</h2>
          <p className="text-lg text-primary-100 mb-8 text-center max-w-[600px]">
            Мы выкупаем автомобили всех марок и моделей. Свяжитесь с нами для оценки вашего автомобиля.
          </p>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            <Button
              onClick={() => navigate('/services/buyback-cars')}
              variant="secondary"
              className="min-w-[200px]"
            >
              Получить оценку
            </Button>
            <Button
              onClick={() => {
                window.location.href = `tel:${APP_CONFIG.PHONE_1}`;
              }}
              variant="outline"
              className="min-w-[200px] bg-white/10 border-white text-white hover:bg-white/20"
            >
              Позвонить: {APP_CONFIG.PHONE_1}
            </Button>
          </div>
        </div>

        <Card className="p-8 mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6 text-center">Наши услуги</h2>
          <div className="flex flex-row flex-wrap gap-4">
            {[
              { title: 'Выкуп автомобилей', subtitle: 'Все марки и модели', path: '/services/buyback-cars' },
              { title: 'Срочный выкуп', subtitle: 'Выкуп за 2 часа', path: '/services/urgent-buyback' },
              { title: 'Выкуп премиум авто', subtitle: 'Элитные автомобили', path: '/services/premium-cars' },
            ].map((service) => (
              <button
                key={service.path}
                onClick={() => navigate(service.path)}
                className="flex-1 min-w-[200px] bg-neutral-50 rounded-lg p-4 flex flex-col items-center hover:bg-neutral-100 transition-colors"
              >
                <h3 className="text-base font-semibold text-neutral-900 mb-1">{service.title}</h3>
                <p className="text-sm text-neutral-600 text-center">{service.subtitle}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CarBrands;
