import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard.js';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Button from '../components/ui/Button.js';
import Card from '../components/ui/Card.js';
import Input from '../components/ui/Input.js';
import EmptyState from '../components/ui/EmptyState.js';
import { toast } from '../lib/toast.js';
import { trackFormSubmit } from '../lib/analytics/events.js';
import { logger } from '../lib/logger.js';
const initialReviews = [
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
const categories = [
    { value: null, label: 'Все категории' },
    { value: 'premium', label: 'Премиум авто' },
    { value: 'budget', label: 'Бюджетные авто' },
    { value: 'after_accident', label: 'После ДТП' },
    { value: 'credit', label: 'Кредитные авто' },
    { value: 'high_mileage', label: 'Большой пробег' },
];
const Reviews = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState(initialReviews);
    const [filterRating, setFilterRating] = useState(null);
    const [filterCategory, setFilterCategory] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        rating: 5,
        text: '',
        carModel: '',
    });
    const filteredReviews = useMemo(() => {
        return reviews.filter((r) => {
            const ratingMatch = !filterRating || r.rating === filterRating;
            const categoryMatch = !filterCategory || r.category === filterCategory;
            return ratingMatch && categoryMatch;
        });
    }, [reviews, filterRating, filterCategory]);
    const averageRating = useMemo(() => {
        return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    }, [reviews]);
    const handleSubmit = async () => {
        if (!formData.name || !formData.text) {
            setError('Заполните все обязательные поля');
            return;
        }
        if (formData.text.length < 10) {
            setError('Отзыв должен содержать минимум 10 символов');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // Получаем CSRF токен
            const { getCSRFToken, clearCSRFTokenCache } = await import('../lib/csrf.js');
            let csrfToken = await getCSRFToken();
            let response = await fetch('/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
                },
                body: JSON.stringify({
                    ...formData,
                    ...(csrfToken && { csrfToken }),
                }),
            });
            // Если получили ошибку CSRF, пробуем получить новый токен и повторить запрос
            if (response.status === 403) {
                const errorData = await response.json();
                if (errorData.code === 'CSRF_TOKEN_INVALID') {
                    clearCSRFTokenCache();
                    csrfToken = await getCSRFToken();
                    response = await fetch('/api/review', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
                        },
                        body: JSON.stringify({
                            ...formData,
                            ...(csrfToken && { csrfToken }),
                        }),
                    });
                }
            }
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Ошибка при отправке отзыва');
            }
            const newReview = {
                id: reviews.length + 1,
                name: formData.name,
                rating: formData.rating,
                text: formData.text,
                date: new Date().toLocaleDateString('ru-RU'),
                carModel: formData.carModel,
            };
            trackFormSubmit('review');
            toast.success('Спасибо за ваш отзыв! Он будет опубликован после модерации.');
            setReviews([newReview, ...reviews]);
            setIsSubmitted(true);
            setFormData({ name: '', rating: 5, text: '', carModel: '' });
            setIsFormOpen(false);
            setTimeout(() => setIsSubmitted(false), 5000);
        }
        catch (error) {
            logger.error('Error submitting review', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            }, 'Reviews');
            const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка. Попробуйте позже.';
            setError(errorMessage);
            toast.error(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleLinkPress = (path) => {
        navigate(path);
    };
    return (_jsx("div", { className: "flex-1 bg-neutral-50", children: _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center mb-8 mt-4", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u041E\u0442\u0437\u044B\u0432\u044B \u043D\u0430\u0448\u0438\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" }), _jsxs("div", { className: "flex flex-row items-center gap-2 mb-4", children: [_jsx("span", { className: "text-3xl font-bold text-neutral-900", children: averageRating.toFixed(1) }), _jsx("div", { className: "flex flex-row gap-1", children: [...Array(5)].map((_, i) => (_jsx("span", { className: `text-2xl ${i < Math.round(averageRating) ? 'opacity-100' : 'opacity-30'}`, children: "\u2B50" }, i))) })] }), _jsxs("p", { className: "text-lg text-neutral-600 text-center max-w-[600px]", children: ["\u0411\u043E\u043B\u0435\u0435 ", reviews.length, " \u0434\u043E\u0432\u043E\u043B\u044C\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0443\u0436\u0435 \u043F\u0440\u043E\u0434\u0430\u043B\u0438 \u0441\u0432\u043E\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438 \u0447\u0435\u0440\u0435\u0437 \u043D\u0430\u0441"] })] }), _jsxs("div", { className: "flex flex-col gap-4 mb-8", children: [_jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-base font-medium text-neutral-700 mb-3", children: "\uD83D\uDD0D \u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0443:" }), _jsxs("div", { className: "flex flex-row flex-wrap gap-2", children: [_jsx("button", { className: `px-4 py-2 rounded-lg min-h-[44px] flex items-center justify-center transition-colors ${filterRating === null
                                                ? 'bg-primary-600 text-white font-medium'
                                                : 'bg-neutral-200 text-neutral-700 font-medium'}`, onClick: () => setFilterRating(null), children: _jsx("span", { className: "text-sm", children: "\u0412\u0441\u0435" }) }), [5, 4, 3, 2, 1].map((rating) => (_jsx("button", { className: `px-4 py-2 rounded-lg min-h-[44px] flex items-center justify-center transition-colors ${filterRating === rating
                                                ? 'bg-primary-600 text-white font-medium'
                                                : 'bg-neutral-200 text-neutral-700 font-medium'}`, onClick: () => setFilterRating(rating), children: _jsxs("span", { className: "text-sm", children: [rating, "\u2605"] }) }, rating)))] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-base font-medium text-neutral-700 mb-3", children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F:" }), _jsx("div", { className: "flex flex-row flex-wrap gap-2", children: categories.map((cat) => (_jsx("button", { className: `px-4 py-2 rounded-lg min-h-[44px] flex items-center justify-center transition-colors ${filterCategory === cat.value
                                            ? 'bg-primary-600 text-white font-medium'
                                            : 'bg-neutral-200 text-neutral-700 font-medium'}`, onClick: () => setFilterCategory(cat.value), children: _jsx("span", { className: "text-sm", children: cat.label }) }, cat.value || 'all'))) })] }), _jsx(Button, { onClick: () => setIsFormOpen(!isFormOpen), variant: "primary", className: "self-start", children: isFormOpen ? 'Закрыть форму' : 'Оставить отзыв' })] }), isFormOpen && (_jsxs(Card, { className: "p-6 mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-neutral-900 mb-6", children: "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432" }), isSubmitted ? (_jsx("div", { className: "bg-success-100 border border-success-300 rounded-lg p-4", children: _jsx("p", { className: "text-base font-semibold text-success-800", children: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448 \u043E\u0442\u0437\u044B\u0432!" }) })) : (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { label: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F *", value: formData.name, onChangeText: (value) => setFormData((prev) => ({ ...prev, name: value })), placeholder: "\u0418\u0432\u0430\u043D", required: true }) }), _jsx("div", { className: "flex-1", children: _jsx(Input, { label: "\u041C\u043E\u0434\u0435\u043B\u044C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F", value: formData.carModel || '', onChangeText: (value) => setFormData((prev) => ({ ...prev, carModel: value })), placeholder: "\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E" }) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-sm font-medium text-neutral-700 mb-3", children: "\u041E\u0446\u0435\u043D\u043A\u0430 *" }), _jsx("div", { className: "flex flex-row gap-2", children: [1, 2, 3, 4, 5].map((rating) => (_jsx("button", { className: `w-11 h-11 rounded-full border-2 flex items-center justify-center transition-colors ${formData.rating === rating
                                                    ? 'border-warning-500 bg-warning-100'
                                                    : 'border-neutral-300 bg-white'}`, onClick: () => setFormData((prev) => ({ ...prev, rating })), children: _jsx("span", { className: "text-2xl", children: "\u2B50" }) }, rating))) })] }), _jsx(Input, { label: "\u0412\u0430\u0448 \u043E\u0442\u0437\u044B\u0432 *", value: formData.text, onChangeText: (value) => setFormData((prev) => ({ ...prev, text: value })), placeholder: "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u0435\u0441\u044C \u0441\u0432\u043E\u0438\u043C \u043E\u043F\u044B\u0442\u043E\u043C...", multiline: true, rows: 4, required: true }), error && (_jsxs("div", { className: "bg-error-100 border border-error-300 rounded-lg p-4", children: [_jsx("p", { className: "text-sm text-error-700 mb-2", children: error }), _jsx("button", { onClick: () => setError(null), className: "text-sm text-error-600 underline", children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C" })] })), _jsx(Button, { onClick: handleSubmit, isLoading: isLoading, size: "lg", className: "mt-2", children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432" })] }))] })), _jsx("div", { className: "flex flex-row flex-wrap gap-6 mb-12", children: filteredReviews.map((review) => (_jsx(ReviewCard, { review: review, index: 0 }, review.id))) }), filteredReviews.length === 0 && (_jsx(EmptyState, { title: "\u041E\u0442\u0437\u044B\u0432\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B", description: "\u041D\u0435\u0442 \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0441 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u043C \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u043E\u043C \u0438\u043B\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0435\u0439. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B.", variant: "info", actionLabel: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B", onAction: () => {
                        setFilterRating(null);
                        setFilterCategory(null);
                    } })), _jsxs(Card, { className: "bg-primary-600 p-8 mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-3 text-center", children: "\u041D\u0430\u0448\u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u043E \u0432\u044B\u043A\u0443\u043F\u0443 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), _jsx("p", { className: "text-lg text-primary-100 mb-8 text-center max-w-[800px] mx-auto", children: "\u0411\u043E\u043B\u0435\u0435 5000 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0443\u0436\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u043D\u0430\u0448\u0438\u043C\u0438 \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0443\u0436\u043D\u0443\u044E \u0443\u0441\u043B\u0443\u0433\u0443 \u0438 \u0443\u0437\u043D\u0430\u0439\u0442\u0435 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0438." }), _jsx("div", { className: "flex flex-row flex-wrap gap-4", children: [
                                { title: 'Срочный выкуп', text: 'Выкуп за 2 часа', path: '/services/urgent-buyback' },
                                { title: 'Выкуп битых авто', text: 'Любая степень повреждения', path: '/services/damaged-cars' },
                                { title: 'Выкуп после ДТП', text: 'Оценка остаточной стоимости', path: '/services/after-accident' },
                                { title: 'Выкуп кредитных авто', text: 'Помощь с банком', path: '/services/credit-cars' },
                                { title: 'Выкуп премиум авто', text: 'Элитные автомобили', path: '/services/premium-cars' },
                                { title: 'Выкуп автомобилей', text: 'Все марки и модели', path: '/services/buyback-cars' },
                            ].map((service) => (_jsxs("button", { onClick: () => handleLinkPress(service.path), className: "flex-1 min-w-[200px] bg-white/10 rounded-lg p-4 flex flex-col items-center hover:bg-white/20 transition-colors", children: [_jsx("h3", { className: "text-base font-semibold text-white mb-1", children: service.title }), _jsx("p", { className: "text-sm text-primary-100 text-center", children: service.text })] }, service.path))) })] })] }) }));
};
export default Reviews;
