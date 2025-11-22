import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { APP_CONFIG } from '../lib/config/index.js';
const conditions = [
    { value: 'excellent', label: 'Отличное' },
    { value: 'good', label: 'Хорошее' },
    { value: 'satisfactory', label: 'Удовлетворительное' },
    { value: 'needs_repair', label: 'Требует ремонта' },
];
const transmissions = [
    { value: 'automatic', label: 'Автоматическая' },
    { value: 'manual', label: 'Механическая' },
    { value: 'robot', label: 'Робот' },
    { value: 'variator', label: 'Вариатор' },
];
const drives = [
    { value: 'front', label: 'Передний' },
    { value: 'rear', label: 'Задний' },
    { value: 'full', label: 'Полный' },
];
const Calculator = () => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        mileage: 0,
        condition: 'good',
        transmission: 'automatic',
        drive: 'front',
    });
    const [result, setResult] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [errors, setErrors] = useState({});
    const calculatePrice = useCallback(() => {
        // Базовая стоимость (примерная)
        const basePrices = {
            toyota: 1500000,
            bmw: 2000000,
            mercedes: 2200000,
            audi: 2100000,
            volkswagen: 1200000,
            default: 1000000,
        };
        const brand = formData.brand.toLowerCase();
        const basePrice = basePrices[brand] ||
            basePrices[Object.keys(basePrices).find((k) => brand.includes(k)) || 'default'] ||
            basePrices.default;
        // Множитель состояния
        const conditionMultipliers = {
            excellent: 1.0,
            good: 0.85,
            satisfactory: 0.7,
            needs_repair: 0.5,
        };
        const conditionMultiplier = conditionMultipliers[formData.condition] || 0.85;
        // Множитель пробега
        const avgMileagePerYear = 15000;
        const expectedMileage = (new Date().getFullYear() - formData.year) * avgMileagePerYear;
        const mileageRatio = formData.mileage / Math.max(expectedMileage, 1);
        const mileageMultiplier = Math.max(0.5, Math.min(1.0, 1.0 - (mileageRatio - 1) * 0.3));
        // Множитель возраста
        const age = new Date().getFullYear() - formData.year;
        const ageMultiplier = Math.max(0.3, 1.0 - age * 0.05);
        const finalPrice = Math.round(basePrice * conditionMultiplier * mileageMultiplier * ageMultiplier);
        setResult({
            basePrice,
            conditionMultiplier,
            mileageMultiplier,
            ageMultiplier,
            finalPrice,
        });
    }, [formData]);
    useEffect(() => {
        if (formData.brand &&
            formData.model &&
            formData.year &&
            formData.mileage !== undefined &&
            formData.condition) {
            calculatePrice();
        }
        else {
            setResult(null);
        }
    }, [formData, calculatePrice]);
    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };
    const scrollToForm = () => {
        if (typeof window !== 'undefined') {
            const form = document.getElementById('contact-form');
            if (form) {
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };
    return (_jsxs(Card, { className: "p-6 m-4", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center", children: "\u041A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }), _jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { className: "mb-6", children: [_jsx("div", { className: "mb-4", children: _jsx(Input, { label: "\u041C\u0430\u0440\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F *", value: formData.brand, onChangeText: (value) => updateField('brand', value), placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: Toyota", error: errors.brand }) }), _jsx("div", { className: "mb-4", children: _jsx(Input, { label: "\u041C\u043E\u0434\u0435\u043B\u044C *", value: formData.model, onChangeText: (value) => updateField('model', value), placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: Camry", error: errors.model }) }), _jsxs("div", { className: "flex flex-row gap-4 mb-4", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { label: "\u0413\u043E\u0434 \u0432\u044B\u043F\u0443\u0441\u043A\u0430 *", value: formData.year.toString(), onChangeText: (value) => updateField('year', parseInt(value) || 0), type: "number", placeholder: "2020", error: errors.year }) }), _jsx("div", { className: "flex-1", children: _jsx(Input, { label: "\u041F\u0440\u043E\u0431\u0435\u0433 (\u043A\u043C) *", value: formData.mileage.toString(), onChangeText: (value) => updateField('mileage', parseInt(value) || 0), type: "number", placeholder: "50000", error: errors.mileage }) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2 block", children: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 *" }), _jsx("div", { className: "flex flex-row flex-wrap gap-2", children: conditions.map((cond) => (_jsx("button", { className: `px-4 py-2.5 rounded-lg border min-h-[44px] flex items-center justify-center transition-colors ${formData.condition === cond.value
                                                ? 'bg-primary-600 border-primary-600 text-white font-semibold'
                                                : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200'}`, onClick: () => updateField('condition', cond.value), children: _jsx("span", { className: "text-sm", children: cond.label }) }, cond.value))) })] }), _jsxs("div", { className: "flex flex-row gap-4 mb-4", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { label: "\u041E\u0431\u044A\u0435\u043C \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044F (\u043B)", value: formData.engineVolume?.toString() || '', onChangeText: (value) => {
                                                const numValue = parseFloat(value);
                                                updateField('engineVolume', isNaN(numValue) ? undefined : numValue);
                                            }, type: "number", step: "0.1", placeholder: "2.0" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "text-sm font-semibold text-neutral-700 mb-2 block", children: "\u041A\u041F\u041F" }), _jsx("div", { className: "flex flex-row flex-wrap gap-2", children: transmissions.map((trans) => (_jsx("button", { className: `px-4 py-2.5 rounded-lg border min-h-[44px] flex items-center justify-center transition-colors ${formData.transmission === trans.value
                                                        ? 'bg-primary-600 border-primary-600 text-white font-semibold'
                                                        : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200'}`, onClick: () => updateField('transmission', trans.value), children: _jsx("span", { className: "text-sm", children: trans.label }) }, trans.value))) })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "text-sm font-semibold text-neutral-700 mb-2 block", children: "\u041F\u0440\u0438\u0432\u043E\u0434" }), _jsx("div", { className: "flex flex-row flex-wrap gap-2", children: drives.map((d) => (_jsx("button", { className: `px-4 py-2.5 rounded-lg border min-h-[44px] flex items-center justify-center transition-colors ${formData.drive === d.value
                                                ? 'bg-primary-600 border-primary-600 text-white font-semibold'
                                                : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200'}`, onClick: () => updateField('drive', d.value), children: _jsx("span", { className: "text-sm", children: d.label }) }, d.value))) })] })] }), result ? (_jsxs("div", { className: "bg-primary-50 p-6 rounded-xl border-2 border-primary-200 mt-6", children: [_jsx("h3", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4", children: "\u041F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430" }), _jsxs("p", { className: "text-4xl font-bold text-primary-600 dark:text-primary-400 mb-3", children: [result.finalPrice.toLocaleString('ru-RU'), " \u20BD"] }), _jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-300 mb-4 leading-5", children: "* \u042D\u0442\u043E \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430. \u0422\u043E\u0447\u043D\u0443\u044E \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442 \u043D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u043F\u0440\u0438 \u043E\u0441\u043C\u043E\u0442\u0440\u0435." }), _jsx("button", { onClick: () => setShowDetails(!showDetails), className: "p-3 mb-4 text-center", children: _jsx("span", { className: "text-sm font-semibold text-primary-600", children: showDetails ? 'Скрыть детали' : 'Показать детали расчета' }) }), showDetails && (_jsxs("div", { className: "bg-white dark:bg-neutral-800 p-4 rounded-lg mb-4", children: [_jsxs("div", { className: "flex flex-row justify-between py-2 border-b border-neutral-200 dark:border-neutral-700", children: [_jsx("span", { className: "text-sm text-neutral-600 dark:text-neutral-300", children: "\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C:" }), _jsxs("span", { className: "text-sm font-semibold text-primary-600", children: [result.basePrice.toLocaleString('ru-RU'), " \u20BD"] })] }), _jsxs("div", { className: "flex flex-row justify-between py-2 border-b border-neutral-200 dark:border-neutral-700", children: [_jsx("span", { className: "text-sm text-neutral-600 dark:text-neutral-300", children: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435:" }), _jsxs("span", { className: "text-sm font-semibold text-primary-600 dark:text-primary-400", children: [Math.round(result.conditionMultiplier * 100), "%"] })] }), _jsxs("div", { className: "flex flex-row justify-between py-2 border-b border-neutral-200 dark:border-neutral-700", children: [_jsx("span", { className: "text-sm text-neutral-600 dark:text-neutral-300", children: "\u041F\u0440\u043E\u0431\u0435\u0433:" }), _jsxs("span", { className: "text-sm font-semibold text-primary-600 dark:text-primary-400", children: [Math.round(result.mileageMultiplier * 100), "%"] })] }), _jsxs("div", { className: "flex flex-row justify-between py-2 border-b border-neutral-200 dark:border-neutral-700", children: [_jsx("span", { className: "text-sm text-neutral-600 dark:text-neutral-300", children: "\u0412\u043E\u0437\u0440\u0430\u0441\u0442:" }), _jsxs("span", { className: "text-sm font-semibold text-primary-600 dark:text-primary-400", children: [Math.round(result.ageMultiplier * 100), "%"] })] }), _jsxs("div", { className: "flex flex-row justify-between pt-3 mt-2 border-t-2 border-primary-200 dark:border-primary-800", children: [_jsx("span", { className: "text-base font-semibold text-neutral-900 dark:text-neutral-100", children: "\u0418\u0442\u043E\u0433\u043E\u0432\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C:" }), _jsxs("span", { className: "text-base font-semibold text-primary-600", children: [result.finalPrice.toLocaleString('ru-RU'), " \u20BD"] })] })] })), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(Button, { onClick: scrollToForm, className: "mb-3", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0442\u043E\u0447\u043D\u0443\u044E \u043E\u0446\u0435\u043D\u043A\u0443" }), _jsxs(Button, { onClick: () => {
                                            if (typeof window !== 'undefined') {
                                                window.location.href = `tel:${APP_CONFIG.PHONE_1}`;
                                            }
                                        }, variant: "secondary", children: ["\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C: ", APP_CONFIG.PHONE_1] })] })] })) : (_jsx("div", { className: "bg-neutral-50 dark:bg-neutral-800 p-8 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 mt-6 flex items-center justify-center", children: _jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-300 text-center leading-5", children: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u0443\u044E \u043E\u0446\u0435\u043D\u043A\u0443 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }) }))] })] }));
};
export default Calculator;
