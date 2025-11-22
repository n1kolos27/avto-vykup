import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Card from './ui/Card';
const ReviewCard = ({ review }) => {
    return (_jsxs(Card, { className: "p-6 h-full", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-4", children: [_jsx("div", { className: "flex flex-row gap-1", children: [...Array(5)].map((_, i) => (_jsx("span", { className: `text-lg ${i < review.rating ? 'opacity-100' : 'opacity-30'}`, children: "\u2B50" }, i))) }), _jsx("span", { className: "text-sm text-neutral-600 dark:text-neutral-400 font-medium", children: review.date })] }), _jsx("p", { className: "text-base text-neutral-700 dark:text-neutral-200 leading-6 mb-4 flex-1", children: review.text }), _jsx("div", { className: "pt-4 border-t border-neutral-200 dark:border-neutral-700", children: _jsxs("div", { children: [_jsx("span", { className: "text-base font-semibold text-neutral-900 dark:text-neutral-100", children: review.name }), review.carModel && (_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400 mt-1", children: review.carModel }))] }) })] }));
};
export default React.memo(ReviewCard);
