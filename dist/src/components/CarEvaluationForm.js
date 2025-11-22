import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';
import { toast } from '../lib/toast.js';
const carBrands = [
    'Toyota', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Nissan',
    'Hyundai', 'Kia', 'Mazda', 'Honda', 'Lexus', 'Volvo', 'Skoda', 'Renault',
    'Peugeot', 'Citroen', 'Opel', 'Chevrolet', 'Mitsubishi', 'Subaru', 'Infiniti'
];
const conditions = [
    { value: 'excellent', label: 'Отличное' },
    { value: 'good', label: 'Хорошее' },
    { value: 'satisfactory', label: 'Удовлетворительное' },
    { value: 'needs_repair', label: 'Требует ремонта' },
];
const currentYear = new Date().getFullYear();
const CarEvaluationForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [brandSuggestions, setBrandSuggestions] = useState([]);
    const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: currentYear,
        mileage: 0,
        condition: 'good',
        phone: '',
        name: '',
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const validateField = useCallback((field, value) => {
        switch (field) {
            case 'brand':
                return !value ? 'Введите марку автомобиля' : undefined;
            case 'model':
                return !value ? 'Введите модель' : undefined;
            case 'year':
                return !value || value < 1900 || value > currentYear + 1 ? 'Введите корректный год' : undefined;
            case 'mileage':
                return !value || value < 0 ? 'Введите корректный пробег' : undefined;
            case 'phone':
                return !value || value.length < 10 ? 'Введите корректный номер телефона' : undefined;
            default:
                return undefined;
        }
    }, []);
    const handleBrandChange = useCallback((value) => {
        setFormData(prev => ({ ...prev, brand: value }));
        if (value.length > 0) {
            const filtered = carBrands.filter(brand => brand.toLowerCase().includes(value.toLowerCase())).slice(0, 5);
            setBrandSuggestions(filtered);
            setShowBrandSuggestions(true);
        }
        else {
            setBrandSuggestions([]);
            setShowBrandSuggestions(false);
        }
        // Real-time validation
        if (touched.brand) {
            const error = validateField('brand', value);
            setErrors(prev => ({ ...prev, brand: error }));
        }
    }, [touched.brand, validateField]);
    const validateForm = () => {
        const newErrors = {};
        if (!formData.brand)
            newErrors.brand = 'Введите марку автомобиля';
        if (!formData.model)
            newErrors.model = 'Введите модель';
        if (!formData.year || formData.year < 1900 || formData.year > currentYear + 1) {
            newErrors.year = 'Введите корректный год';
        }
        if (!formData.mileage || formData.mileage < 0) {
            newErrors.mileage = 'Введите корректный пробег';
        }
        if (!formData.phone || formData.phone.length < 10) {
            newErrors.phone = 'Введите корректный номер телефона';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const onSubmit = async () => {
        if (!validateForm()) {
            toast.error('Заполните все обязательные поля');
            return;
        }
        setIsLoading(true);
        try {
            // Получаем CSRF токен
            const { getCSRFToken } = await import('../lib/csrf.js');
            const csrfToken = await getCSRFToken();
            const response = await fetch('/api/evaluation', {
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
            let result = await response.json();
            // Если получили ошибку CSRF, пробуем получить новый токен и повторить запрос
            if (response.status === 403 && result.code === 'CSRF_TOKEN_INVALID') {
                const { getCSRFToken, clearCSRFTokenCache } = await import('../lib/csrf.js');
                clearCSRFTokenCache();
                const newCsrfToken = await getCSRFToken();
                const retryResponse = await fetch('/api/evaluation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(newCsrfToken && { 'X-CSRF-Token': newCsrfToken }),
                    },
                    body: JSON.stringify({
                        ...formData,
                        ...(newCsrfToken && { csrfToken: newCsrfToken }),
                    }),
                });
                result = await retryResponse.json();
                if (!retryResponse.ok && !result.success) {
                    toast.error(result.message || 'Ошибка при отправке заявки');
                    return;
                }
            }
            if (result.success) {
                setIsSubmitted(true);
                toast.success('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
                setFormData({
                    brand: '',
                    model: '',
                    year: currentYear,
                    mileage: 0,
                    condition: 'good',
                    phone: '',
                    name: '',
                });
            }
            else {
                toast.error(result.message || 'Ошибка при отправке заявки');
            }
        }
        catch {
            toast.error('Ошибка при отправке заявки. Попробуйте позже.');
        }
        finally {
            setIsLoading(false);
        }
    };
    const formProgress = useMemo(() => {
        let filled = 0;
        if (formData.brand)
            filled++;
        if (formData.model)
            filled++;
        if (formData.year)
            filled++;
        if (formData.mileage)
            filled++;
        if (formData.condition)
            filled++;
        if (formData.phone)
            filled++;
        return Math.round((filled / 6) * 100);
    }, [formData]);
    if (isSubmitted) {
        return (_jsxs(Card, { className: "p-8 flex flex-col items-center", children: [_jsx("span", { className: "text-6xl text-success-500 mb-4", children: "\u2713" }), _jsx("h3", { className: "text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3", children: "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430!" }), _jsxs("p", { className: "text-base text-neutral-600 dark:text-neutral-300 text-center mb-6", children: ["\u041C\u044B \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443 ", formData.phone] }), _jsx(Button, { onClick: () => setIsSubmitted(false), variant: "outline", children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0435\u0449\u0435 \u043E\u0434\u043D\u0443 \u0437\u0430\u044F\u0432\u043A\u0443" })] }));
    }
    return (_jsxs(Card, { className: "p-6 m-4 md:p-8 md:m-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2", children: "\u041E\u0446\u0435\u043D\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }), _jsx("p", { className: "text-base text-neutral-600 dark:text-neutral-300 mb-4", children: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0443 \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 \u0437\u0430 5 \u043C\u0438\u043D\u0443\u0442" }), formProgress > 0 && (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 transition-all duration-500 ease-out rounded-full", style: { width: `${formProgress}%` }, "data-progress": formProgress, "data-csp-inline": "width", role: "progressbar", "aria-valuenow": formProgress, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": `Прогресс заполнения формы: ${formProgress}%` }) }), _jsxs("span", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-1 block", children: ["\u0417\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E: ", formProgress, "%"] })] }))] }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "mb-4 relative", children: [_jsx(Input, { label: "\u041C\u0430\u0440\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F", value: formData.brand, onChangeText: handleBrandChange, onBlur: () => {
                                    setTouched(prev => ({ ...prev, brand: true }));
                                    const error = validateField('brand', formData.brand);
                                    setErrors(prev => ({ ...prev, brand: error }));
                                }, placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: Toyota", error: errors.brand, success: touched.brand && !errors.brand && formData.brand.length > 0, floatingLabel: true, required: true }), showBrandSuggestions && brandSuggestions.length > 0 && (_jsx("div", { className: "absolute top-full left-0 right-0 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 mt-1 z-10 shadow-md", children: brandSuggestions.map((brand) => (_jsx("button", { className: "p-3 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 w-full text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors", onClick: () => {
                                        setFormData(prev => ({ ...prev, brand }));
                                        setShowBrandSuggestions(false);
                                    }, children: _jsx("span", { className: "text-base text-neutral-900 dark:text-neutral-100", children: brand }) }, brand))) }))] }), _jsx("div", { className: "mb-4", children: _jsx(Input, { label: "\u041C\u043E\u0434\u0435\u043B\u044C", value: formData.model, onChangeText: (value) => {
                                setFormData(prev => ({ ...prev, model: value }));
                                if (touched.model) {
                                    const error = validateField('model', value);
                                    setErrors(prev => ({ ...prev, model: error }));
                                }
                            }, onBlur: () => {
                                setTouched(prev => ({ ...prev, model: true }));
                                const error = validateField('model', formData.model);
                                setErrors(prev => ({ ...prev, model: error }));
                            }, placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: Camry", error: errors.model, success: touched.model && !errors.model && formData.model.length > 0, floatingLabel: true, required: true }) }), _jsxs("div", { className: "flex flex-row gap-3 mb-4", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { label: "\u0413\u043E\u0434 \u0432\u044B\u043F\u0443\u0441\u043A\u0430", value: formData.year.toString(), onChangeText: (value) => setFormData(prev => ({ ...prev, year: parseInt(value) || currentYear })), type: "number", placeholder: currentYear.toString(), error: errors.year, floatingLabel: true, required: true }) }), _jsx("div", { className: "flex-1", children: _jsx(Input, { label: "\u041F\u0440\u043E\u0431\u0435\u0433 (\u043A\u043C)", value: formData.mileage.toString(), onChangeText: (value) => setFormData(prev => ({ ...prev, mileage: parseInt(value) || 0 })), type: "number", placeholder: "0", error: errors.mileage, floatingLabel: true, required: true }) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2 block", children: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F" }), _jsx("div", { className: "flex flex-row flex-wrap gap-2", children: conditions.map((condition) => (_jsx("button", { className: `px-4 py-2.5 rounded-lg border min-h-[44px] flex items-center justify-center transition-colors ${formData.condition === condition.value
                                        ? 'bg-primary-600 border-primary-600 text-white font-semibold'
                                        : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200'}`, onClick: () => setFormData(prev => ({ ...prev, condition: condition.value })), children: _jsx("span", { className: "text-sm", children: condition.label }) }, condition.value))) })] }), _jsx("div", { className: "mb-4", children: _jsx(Input, { label: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F", value: formData.name || '', onChangeText: (value) => setFormData(prev => ({ ...prev, name: value })), placeholder: "\u0418\u0432\u0430\u043D", error: errors.name, floatingLabel: true }) }), _jsx("div", { className: "mb-4", children: _jsx(Input, { label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", value: formData.phone, onChangeText: (value) => {
                                setFormData(prev => ({ ...prev, phone: value }));
                                if (touched.phone) {
                                    const error = validateField('phone', value);
                                    setErrors(prev => ({ ...prev, phone: error }));
                                }
                            }, onBlur: () => {
                                setTouched(prev => ({ ...prev, phone: true }));
                                const error = validateField('phone', formData.phone);
                                setErrors(prev => ({ ...prev, phone: error }));
                            }, placeholder: "+7 (999) 123-45-67", type: "tel", error: errors.phone, success: touched.phone && !errors.phone && formData.phone.length >= 10, floatingLabel: true, required: true }) }), _jsx(Button, { onClick: onSubmit, isLoading: isLoading, disabled: isLoading || formProgress < 100, size: "lg", className: "mt-2", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043E\u0446\u0435\u043D\u043A\u0443" })] })] }));
};
export default CarEvaluationForm;
