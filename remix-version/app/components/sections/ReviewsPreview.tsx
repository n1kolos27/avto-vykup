import React from 'react';
import { useNavigate } from 'react-router';
import Card from '~/components/ui/Card';
import Button from '~/components/ui/Button';

const reviews = [
  {
    id: 1,
    name: 'Александр',
    rating: 5,
    text: 'Продал свой автомобиль за один день. Оценка была честной, деньги получил сразу. Очень доволен!',
    date: '15.03.2024',
  },
  {
    id: 2,
    name: 'Мария',
    rating: 5,
    text: 'Быстро, профессионально, без лишних вопросов. Рекомендую всем, кто хочет быстро продать авто.',
    date: '10.03.2024',
  },
  {
    id: 3,
    name: 'Дмитрий',
    rating: 5,
    text: 'Отличный сервис! Цена была выше, чем предлагали в других местах. Спасибо за честность.',
    date: '05.03.2024',
  },
];

const ReviewsPreview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors">
      <div className="max-w-[1200px] w-full mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center">
            Отзывы наших клиентов
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]">
            Более 1000 довольных клиентов уже продали свои автомобили через нас
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6 h-full">
              <div className="flex flex-row mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-xl">⭐</span>
                ))}
              </div>
              <p className="text-base text-neutral-700 dark:text-neutral-200 leading-6 mb-4">
                {review.text}
              </p>
              <div className="flex flex-row justify-between items-center">
                <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {review.name}
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {review.date}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => navigate('/reviews')}
            variant="outline"
            size="lg"
            className="min-w-[250px]"
          >
            Посмотреть все отзывы →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ReviewsPreview);
