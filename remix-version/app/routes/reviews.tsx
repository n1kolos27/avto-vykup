import type { MetaFunction } from "react-router";
import { useState, useMemo } from "react";
import ReviewCard from "~/components/ReviewCard";
import Breadcrumbs from "~/components/Breadcrumbs";
import Button from "~/components/ui/Button";
import Card from "~/components/ui/Card";
import Input from "~/components/ui/Input";
import EmptyState from "~/components/ui/EmptyState";

export const meta: MetaFunction = () => {
  return [
    { title: "Отзывы клиентов о выкупе авто | Реальные отзывы" },
    { name: "description", content: "Читайте реальные отзывы клиентов о выкупе автомобилей в Москве и МО. Честные мнения о нашей работе." },
  ];
};

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  carModel?: string;
  category?: 'premium' | 'budget' | 'after_accident' | 'credit' | 'high_mileage';
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: 'Александр',
    rating: 5,
    text: 'Продал свой автомобиль за один день. Оценка была честной, деньги получил сразу. Очень доволен!',
    date: '15.03.2024',
    carModel: 'Toyota Camry 2018',
    category: 'premium',
  },
  // Добавьте больше отзывов по необходимости
];

export default function ReviewsRoute() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredReviews = useMemo(() => {
    return initialReviews.filter(review => {
      const matchesSearch = review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           review.carModel?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || review.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Отзывы клиентов</h1>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder="Поиск по отзывам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>

        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Отзывы не найдены"
            description="Попробуйте изменить параметры поиска"
          />
        )}
      </div>
    </div>
  );
}

