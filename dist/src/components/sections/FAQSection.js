import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';
const faqs = [
    {
        question: 'Как быстро можно продать автомобиль?',
        answer: 'В среднем сделка занимает 2 часа от момента звонка до получения денег. Мы приезжаем на место, осматриваем автомобиль, оформляем документы и сразу производим оплату. В некоторых случаях это может занять еще меньше времени.',
    },
    {
        question: 'Какие документы нужны для выкупа?',
        answer: 'Для выкупа автомобиля вам понадобятся: паспорт транспортного средства (ПТС), свидетельство о регистрации (СТС), паспорт владельца. Если автомобиль в залоге или есть ограничения, нужно предоставить соответствующие документы. Мы поможем оформить все необходимые бумаги.',
    },
    {
        question: 'Выкупаете ли вы автомобили после ДТП?',
        answer: 'Да, мы выкупаем автомобили в любом состоянии, включая те, что побывали в ДТП. Мы оцениваем остаточную стоимость, возможность восстановления или разбора на запчасти. Даже сильно поврежденные автомобили могут иметь хорошую стоимость.',
    },
    {
        question: 'Как вы определяете цену автомобиля?',
        answer: 'Мы учитываем множество факторов: марку и модель, год выпуска, пробег, техническое состояние, наличие повреждений, комплектацию, рыночную стоимость на момент оценки. Наши специалисты имеют большой опыт и знают реальные цены на рынке.',
    },
    {
        question: 'Можно ли продать автомобиль в кредите?',
        answer: 'Да, мы работаем с кредитными автомобилями. В этом случае нужно погасить кредит или мы можем помочь с оформлением перевода долга. Все зависит от конкретной ситуации и условий кредитного договора.',
    },
    {
        question: 'Какие способы оплаты вы предлагаете?',
        answer: 'Мы предлагаем несколько способов оплаты: наличными, переводом на банковскую карту, банковским переводом. Вы можете выбрать наиболее удобный для вас вариант. Оплата производится сразу после подписания документов.',
    },
];
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (_jsxs("section", { className: "bg-neutral-50 dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto", children: [_jsx(AnimatedSection, { animationType: "fade-slide", delay: 0, children: _jsxs("div", { className: "flex flex-col items-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent", children: "\u0427\u0435\u0441\u0442\u043D\u044B\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u043D\u0430 \u0432\u0430\u0436\u043D\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B" }), _jsx("p", { className: "text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]", children: "\u041E\u0442\u0432\u0435\u0442\u044B \u043D\u0430 \u0441\u0430\u043C\u044B\u0435 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043E \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" })] }) }), _jsx("div", { className: "flex flex-col gap-4", children: faqs.map((faq, index) => (_jsx(AnimatedCard, { delay: index * 50, children: _jsxs(Card, { hover: true, className: "overflow-hidden", children: [_jsxs("button", { className: "flex flex-row justify-between items-center p-5 w-full text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors", onClick: () => toggleFAQ(index), "aria-expanded": openIndex === index, "aria-label": `${faq.question}. Нажмите для ${openIndex === index ? 'закрытия' : 'открытия'} ответа`, children: [_jsx("span", { className: "flex-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100 mr-4", children: faq.question }), _jsx("span", { className: `text-base text-primary-600 dark:text-primary-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`, children: "\u25BC" })] }), openIndex === index && (_jsx("div", { className: "px-5 pb-5 border-t border-neutral-100 dark:border-neutral-700", children: _jsx("p", { className: "text-base text-neutral-600 dark:text-neutral-300 leading-6 mt-3", children: faq.answer }) }))] }) }, index))) })] })] }));
};
export default React.memo(FAQSection);
