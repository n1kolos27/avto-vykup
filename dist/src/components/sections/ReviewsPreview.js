import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
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
const ReviewsPreview = () => {
    const navigate = useNavigate();
    return (_jsx("section", { className: "bg-neutral-50 dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors", children: _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsxs("div", { className: "flex flex-col items-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center", children: "\u041E\u0442\u0437\u044B\u0432\u044B \u043D\u0430\u0448\u0438\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" }), _jsx("p", { className: "text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]", children: "\u0411\u043E\u043B\u0435\u0435 1000 \u0434\u043E\u0432\u043E\u043B\u044C\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0443\u0436\u0435 \u043F\u0440\u043E\u0434\u0430\u043B\u0438 \u0441\u0432\u043E\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438 \u0447\u0435\u0440\u0435\u0437 \u043D\u0430\u0441" })] }), _jsx("div", { className: "flex flex-row flex-wrap gap-6 mb-8", children: reviews.map((review) => (_jsxs(Card, { className: "flex-1 min-w-[250px] p-6", children: [_jsx("div", { className: "flex flex-row mb-3", children: [...Array(review.rating)].map((_, i) => (_jsx("span", { className: "text-xl", children: "\u2B50" }, i))) }), _jsx("p", { className: "text-base text-neutral-700 dark:text-neutral-200 leading-6 mb-4", children: review.text }), _jsxs("div", { className: "flex flex-row justify-between items-center", children: [_jsx("span", { className: "text-base font-semibold text-neutral-900 dark:text-neutral-100", children: review.name }), _jsx("span", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: review.date })] })] }, review.id))) }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { onClick: () => navigate('/reviews'), variant: "outline", size: "lg", className: "min-w-[250px]", children: "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u2192" }) })] }) }));
};
export default React.memo(ReviewsPreview);
