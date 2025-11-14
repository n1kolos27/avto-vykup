'use client';

import { useState } from 'react';
import ReviewCard from '@/components/ReviewCard';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiStar, FiFilter } from 'react-icons/fi';
import Breadcrumbs from '@/components/Breadcrumbs';
import { trackFormSubmit } from '@/lib/analytics/events';
import { toast } from '@/lib/toast';

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
    text: 'Продал свой автомобиль за один день. Оценка была честной, деньги получил сразу. Очень доволен! Рекомендую всем, кто хочет быстро и выгодно продать авто.',
    date: '15.03.2024',
    carModel: 'Toyota Camry 2018',
  },
  {
    id: 2,
    name: 'Мария',
    rating: 5,
    text: 'Быстро, профессионально, без лишних вопросов. Рекомендую всем, кто хочет быстро продать авто. Сотрудники вежливые, все объяснили.',
    date: '10.03.2024',
    carModel: 'BMW X5 2019',
  },
  {
    id: 3,
    name: 'Дмитрий',
    rating: 5,
    text: 'Отличный сервис! Цена была выше, чем предлагали в других местах. Спасибо за честность. Очень доволен результатом.',
    date: '05.03.2024',
    carModel: 'Mercedes C-Class 2020',
  },
  {
    id: 4,
    name: 'Елена',
    rating: 5,
    text: 'Продала машину после ДТП. Думала, что цена будет очень низкой, но ребята предложили справедливую стоимость. Все прошло быстро и без проблем.',
    date: '28.02.2024',
    carModel: 'Volkswagen Golf 2017',
  },
  {
    id: 5,
    name: 'Игорь',
    rating: 5,
    text: 'Обратился с проблемным автомобилем. В других местах отказывали или предлагали копейки. Здесь оценили честно и выкупили. Спасибо!',
    date: '20.02.2024',
    carModel: 'Audi A4 2016',
  },
  {
    id: 6,
    name: 'Ольга',
    rating: 5,
    text: 'Очень понравился подход. Не пытались занизить цену, как в других компаниях. Все документы оформили быстро. Рекомендую!',
    date: '15.02.2024',
    carModel: 'Hyundai Solaris 2019',
    category: 'budget',
  },
  {
    id: 7,
    name: 'Сергей',
    rating: 5,
    text: 'Продал премиум автомобиль. Оценка была очень справедливой, выше чем в других местах. Профессиональный подход, все быстро и четко.',
    date: '10.02.2024',
    carModel: 'Porsche Cayenne 2021',
    category: 'premium',
  },
  {
    id: 8,
    name: 'Анна',
    rating: 5,
    text: 'Автомобиль был в кредите. Помогли разобраться со всеми документами, оформили перевод долга. Очень благодарна за помощь!',
    date: '05.02.2024',
    carModel: 'Kia Rio 2020',
    category: 'credit',
  },
  {
    id: 9,
    name: 'Владимир',
    rating: 5,
    text: 'Машина с большим пробегом (250 000 км), но в хорошем состоянии. Оценили честно, не занизили из-за пробега. Спасибо!',
    date: '01.02.2024',
    carModel: 'Toyota RAV4 2015',
    category: 'high_mileage',
  },
  {
    id: 10,
    name: 'Татьяна',
    rating: 5,
    text: 'После серьезного ДТП думала, что машину не возьмут или предложат копейки. Но здесь оценили реально и выкупили. Рекомендую!',
    date: '28.01.2024',
    carModel: 'Nissan Qashqai 2018',
    category: 'after_accident',
  },
  {
    id: 11,
    name: 'Михаил',
    rating: 5,
    text: 'Продал элитный автомобиль. Работали очень профессионально, цена была выше рыночной. Очень доволен сделкой.',
    date: '25.01.2024',
    carModel: 'Mercedes-Benz S-Class 2020',
    category: 'premium',
  },
  {
    id: 12,
    name: 'Екатерина',
    rating: 5,
    text: 'Бюджетный автомобиль, но в отличном состоянии. Оценили справедливо, деньги получила сразу. Все быстро и без проблем.',
    date: '20.01.2024',
    carModel: 'Lada Granta 2021',
    category: 'budget',
  },
];

interface ReviewFormData {
  name: string;
  rating: number;
  text: string;
  carModel?: string;
  phone?: string;
}

const categories = [
  { value: null, label: 'Все категории' },
  { value: 'premium', label: 'Премиум авто' },
  { value: 'budget', label: 'Бюджетные авто' },
  { value: 'after_accident', label: 'После ДТП' },
  { value: 'credit', label: 'Кредитные авто' },
  { value: 'high_mileage', label: 'Большой пробег' },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ReviewFormData>();

  const selectedRating = watch('rating');

  const filteredReviews = reviews.filter((r) => {
    const ratingMatch = !filterRating || r.rating === filterRating;
    const categoryMatch = !filterCategory || r.category === filterCategory;
    return ratingMatch && categoryMatch;
  });

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const onSubmit = async (data: ReviewFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка при отправке отзыва');
      }

      const newReview: Review = {
        id: reviews.length + 1,
        name: data.name,
        rating: data.rating,
        text: data.text,
        date: new Date().toLocaleDateString('ru-RU'),
        carModel: data.carModel,
      };
      trackFormSubmit('review');
      toast.success('Спасибо за ваш отзыв! Он будет опубликован после модерации.');
      setReviews([newReview, ...reviews]);
      setIsSubmitted(true);
      reset();
      setIsFormOpen(false);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting review:', error);
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка. Попробуйте позже.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs className="mb-6" />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Отзывы наших клиентов
            </h1>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <span className="text-3xl font-bold text-gray-800">
                  {averageRating.toFixed(1)}
                </span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`${
                        i < Math.round(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600">
              Более {reviews.length} довольных клиентов уже продали свои автомобили через нас
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <FiFilter className="text-gray-600" aria-hidden="true" />
                <span className="text-gray-700 font-medium">Фильтр по рейтингу:</span>
                <button
                  onClick={() => setFilterRating(null)}
                  className={`px-3 py-1 rounded text-sm min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    filterRating === null
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label="Показать все отзывы"
                  aria-pressed={filterRating === null}
                >
                  Все
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating)}
                    className={`px-3 py-1 rounded text-sm min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      filterRating === rating
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-label={`Показать отзывы с рейтингом ${rating} звезд`}
                    aria-pressed={filterRating === rating}
                  >
                    {rating}★
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-700 font-medium">Категория:</span>
                {categories.map((cat) => (
                  <button
                    key={cat.value || 'all'}
                    onClick={() => setFilterCategory(cat.value)}
                    className={`px-3 py-1 rounded text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      filterCategory === cat.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-label={`Фильтр: ${cat.label}`}
                    aria-pressed={filterCategory === cat.value}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={isFormOpen ? 'Закрыть форму отзыва' : 'Открыть форму для оставления отзыва'}
              aria-expanded={isFormOpen}
              aria-controls="review-form"
            >
              {isFormOpen ? 'Закрыть форму' : 'Оставить отзыв'}
            </button>
          </div>

          {isFormOpen && (
            <motion.div
              id="review-form"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg mb-8"
              role="dialog"
              aria-labelledby="review-form-title"
              aria-modal="true"
            >
              <h2 id="review-form-title" className="text-2xl font-bold mb-4">Оставить отзыв</h2>
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
                  <p className="font-semibold">Спасибо за ваш отзыв!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="review-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Ваше имя *
                      </label>
                      <input
                        id="review-name"
                        type="text"
                        {...register('name', { required: 'Укажите имя' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px]"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'review-name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="review-name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="review-car-model" className="block text-sm font-medium text-gray-700 mb-1">
                        Модель автомобиля
                      </label>
                      <input
                        id="review-car-model"
                        type="text"
                        {...register('carModel')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px]"
                        placeholder="Необязательно"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" id="rating-label">
                      Оценка *
                    </label>
                    <div className="flex space-x-2" role="radiogroup" aria-labelledby="rating-label">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setValue('rating', rating)}
                          className={`p-2 rounded min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                            selectedRating === rating
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                          aria-label={`Оценка ${rating} из 5`}
                          aria-pressed={selectedRating === rating}
                        >
                          <FiStar
                            className={`${
                              selectedRating && rating <= selectedRating
                                ? 'fill-current'
                                : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      {...register('rating', { required: 'Выберите оценку' })}
                      aria-invalid={errors.rating ? 'true' : 'false'}
                      aria-describedby={errors.rating ? 'rating-error' : undefined}
                    />
                    {errors.rating && (
                      <p id="rating-error" className="text-red-500 text-sm mt-1" role="alert">{errors.rating.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-1">
                      Ваш отзыв *
                    </label>
                    <textarea
                      id="review-text"
                      {...register('text', {
                        required: 'Напишите отзыв',
                        minLength: { value: 10, message: 'Минимум 10 символов' },
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px]"
                      placeholder="Поделитесь своим опытом..."
                      aria-invalid={errors.text ? 'true' : 'false'}
                      aria-describedby={errors.text ? 'review-text-error' : undefined}
                    />
                    {errors.text && (
                      <p id="review-text-error" className="text-red-500 text-sm mt-1" role="alert">{errors.text.message}</p>
                    )}
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4">
                      <p className="font-semibold text-sm">Ошибка отправки</p>
                      <p className="text-sm mt-1">{error}</p>
                      <button
                        onClick={() => setError(null)}
                        className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                      >
                        Закрыть
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label={isLoading ? 'Отправка отзыва...' : 'Отправить отзыв'}
                    aria-busy={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Отправка...
                      </>
                    ) : (
                      'Отправить отзыв'
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Нет отзывов с выбранным рейтингом
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
