import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Input from '../components/ui/Input.js';
import Button from '../components/ui/Button.js';
import Card from '../components/ui/Card.js';
import PhoneButton from '../components/PhoneButton.js';
import { APP_CONFIG } from '../lib/config/index.js';
import { toast } from '../lib/toast.js';
import { trackFormSubmit } from '../lib/analytics/events.js';
import { logger } from '../lib/logger.js';
const Contacts = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async () => {
        if (!formData.name || !formData.phone || !formData.message) {
            setError('Заполните все обязательные поля');
            return;
        }
        if (formData.message.length < 10) {
            setError('Сообщение должно содержать минимум 10 символов');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // Получаем CSRF токен
            const { getCSRFToken } = await import('../lib/csrf.js');
            const csrfToken = await getCSRFToken();
            const response = await fetch('/api/contact', {
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
                const retryResponse = await fetch('/api/contact', {
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
                if (!retryResponse.ok) {
                    throw new Error(result.error || 'Ошибка при отправке сообщения');
                }
            }
            else if (!response.ok) {
                throw new Error(result.error || 'Ошибка при отправке сообщения');
            }
            trackFormSubmit('contact');
            toast.success('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
            setIsSubmitted(true);
            setFormData({ name: '', phone: '', email: '', message: '' });
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        }
        catch (error) {
            logger.error('Error submitting contact form', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            }, 'Contacts');
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
    const openMap = () => {
        const url = 'https://yandex.ru/maps/?ll=37.6173%2C55.7558&z=10';
        window.open(url, '_blank');
    };
    return (_jsx("div", { className: "flex-1 bg-neutral-50", children: _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center mb-12 mt-4", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B" }), _jsx("p", { className: "text-lg text-neutral-600 text-center max-w-[600px] leading-6", children: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u043B\u044E\u0431\u044B\u043C \u0443\u0434\u043E\u0431\u043D\u044B\u043C \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u043C. \u041C\u044B \u0432\u0441\u0435\u0433\u0434\u0430 \u0433\u043E\u0442\u043E\u0432\u044B \u043F\u043E\u043C\u043E\u0447\u044C \u0432\u0430\u043C \u043F\u0440\u043E\u0434\u0430\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C \u0431\u044B\u0441\u0442\u0440\u043E \u0438 \u0432\u044B\u0433\u043E\u0434\u043D\u043E." })] }), _jsxs("div", { className: "flex flex-row flex-wrap gap-6 mb-6", children: [_jsxs(Card, { className: "flex-1 min-w-[300px] p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-neutral-900 mb-6", children: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438" }), _jsxs("div", { className: "flex flex-row items-start gap-4 mb-6", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center", children: _jsx("span", { className: "text-2xl", children: "\uD83D\uDCDE" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-semibold text-neutral-900 mb-2", children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D\u044B" }), _jsxs("div", { className: "flex flex-row gap-3 mt-2", children: [_jsx(PhoneButton, { phone: APP_CONFIG.PHONE_1 }), _jsx(PhoneButton, { phone: APP_CONFIG.PHONE_2, variant: "secondary" })] })] })] }), _jsxs("div", { className: "flex flex-row items-start gap-4 mb-6", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center", children: _jsx("span", { className: "text-2xl", children: "\u2709\uFE0F" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-semibold text-neutral-900 mb-2", children: "Email" }), _jsx("a", { href: `mailto:${APP_CONFIG.EMAIL}`, className: "text-base text-primary-600 underline", children: APP_CONFIG.EMAIL })] })] }), _jsxs("div", { className: "flex flex-row items-start gap-4 mb-6", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center", children: _jsx("span", { className: "text-2xl", children: "\uD83D\uDCCD" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-semibold text-neutral-900 mb-2", children: "\u0420\u0435\u0433\u0438\u043E\u043D \u0440\u0430\u0431\u043E\u0442\u044B" }), _jsx("p", { className: "text-base text-neutral-700", children: "\u041C\u043E\u0441\u043A\u0432\u0430 \u0438 \u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C" })] })] }), _jsxs("div", { className: "flex flex-row items-start gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center", children: _jsx("span", { className: "text-2xl", children: "\uD83D\uDD50" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-semibold text-neutral-900 mb-2", children: "\u0420\u0435\u0436\u0438\u043C \u0440\u0430\u0431\u043E\u0442\u044B" }), _jsx("p", { className: "text-base text-neutral-700", children: "\u0415\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E: 9:00 - 21:00" }), _jsx("p", { className: "text-sm text-neutral-600 mt-1", children: "\u0411\u0435\u0437 \u0432\u044B\u0445\u043E\u0434\u043D\u044B\u0445" })] })] })] }), _jsxs(Card, { className: "flex-1 min-w-[300px] p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-neutral-900 mb-6", children: "\u0424\u043E\u0440\u043C\u0430 \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438" }), isSubmitted ? (_jsxs("div", { className: "bg-success-100 border border-success-300 rounded-lg p-4", children: [_jsx("h3", { className: "text-base font-semibold text-success-800 mb-1", children: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435!" }), _jsx("p", { className: "text-sm text-success-700", children: "\u041C\u044B \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F." })] })) : (_jsxs("div", { className: "flex flex-col gap-4", children: [error && (_jsxs("div", { className: "bg-error-100 border border-error-300 rounded-lg p-4 mb-4", children: [_jsx("h3", { className: "text-base font-semibold text-error-800 mb-1", children: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438" }), _jsx("p", { className: "text-sm text-error-700 mb-2", children: error }), _jsx("button", { onClick: () => setError(null), className: "text-sm text-error-600 underline", children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C" })] })), _jsx(Input, { label: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F *", value: formData.name, onChangeText: (value) => setFormData((prev) => ({ ...prev, name: value })), placeholder: "\u0418\u0432\u0430\u043D", required: true }), _jsx(Input, { label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D *", value: formData.phone, onChangeText: (value) => setFormData((prev) => ({ ...prev, phone: value })), placeholder: "+7 (999) 123-45-67", type: "tel", required: true }), _jsx(Input, { label: "Email (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)", value: formData.email || '', onChangeText: (value) => setFormData((prev) => ({ ...prev, email: value })), placeholder: "ivan@example.com", type: "email" }), _jsx(Input, { label: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 *", value: formData.message, onChangeText: (value) => setFormData((prev) => ({ ...prev, message: value })), placeholder: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435 \u0438\u043B\u0438 \u0437\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043E\u043F\u0440\u043E\u0441...", multiline: true, rows: 5, required: true }), _jsx(Button, { onClick: handleSubmit, isLoading: isLoading, size: "lg", className: "mt-2", children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" })] }))] })] }), _jsxs(Card, { className: "bg-primary-600 p-6 mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0432\u044B\u0431\u0438\u0440\u0430\u044E\u0442 \u043D\u0430\u0441?" }), _jsx("div", { className: "flex flex-col gap-3", children: ['Оценка за 5 минут', 'Честная рыночная цена', 'Моментальная оплата', 'Официальное оформление', 'Работаем с любым состоянием'].map((advantage) => (_jsxs("div", { className: "flex flex-row items-center gap-3", children: [_jsx("span", { className: "text-lg text-white font-bold", children: "\u2713" }), _jsx("span", { className: "text-base text-white", children: advantage })] }, advantage))) })] }), _jsxs("div", { className: "flex flex-row flex-wrap gap-6 mb-6", children: [_jsxs(Card, { className: "flex-1 min-w-[300px] p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-neutral-900 mb-4", children: "\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438" }), _jsx("p", { className: "text-base text-neutral-600 leading-6 mb-3", children: "\u041C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043D\u0430 \u0440\u044B\u043D\u043A\u0435 \u0432\u044B\u043A\u0443\u043F\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0431\u043E\u043B\u0435\u0435 10 \u043B\u0435\u0442. \u0417\u0430 \u044D\u0442\u043E \u0432\u0440\u0435\u043C\u044F \u043C\u044B \u043F\u043E\u043C\u043E\u0433\u043B\u0438 \u0431\u043E\u043B\u0435\u0435 5000 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C \u043F\u0440\u043E\u0434\u0430\u0442\u044C \u0441\u0432\u043E\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438 \u0431\u044B\u0441\u0442\u0440\u043E \u0438 \u0432\u044B\u0433\u043E\u0434\u043D\u043E." }), _jsx("p", { className: "text-base text-neutral-600 leading-6 mb-3", children: "\u041D\u0430\u0448\u0430 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u043D\u0430 \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0432\u0441\u0435\u0445 \u043C\u0430\u0440\u043E\u043A \u0438 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0432 \u043B\u044E\u0431\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438. \u041C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0447\u0435\u0441\u0442\u043D\u043E, \u0431\u044B\u0441\u0442\u0440\u043E \u0438 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E." }), _jsx("p", { className: "text-base text-neutral-600 leading-6", children: "\u041D\u0430\u0448\u0430 \u0446\u0435\u043B\u044C - \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E \u043F\u0440\u043E\u0441\u0442\u044B\u043C \u0438 \u0432\u044B\u0433\u043E\u0434\u043D\u044B\u043C \u0434\u043B\u044F \u043D\u0430\u0448\u0438\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432." })] }), _jsxs(Card, { className: "flex-1 min-w-[300px] p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-neutral-900 mb-4", children: "\u0417\u043E\u043D\u044B \u0440\u0430\u0431\u043E\u0442\u044B" }), _jsx("p", { className: "text-base text-neutral-600 leading-6 mb-4", children: "\u041C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043F\u043E \u0432\u0441\u0435\u0439 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438. \u041D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0438\u0435\u0445\u0430\u0442\u044C \u043A \u0432\u0430\u043C \u0432 \u043B\u044E\u0431\u043E\u0435 \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E." }), _jsx("h3", { className: "text-lg font-semibold text-neutral-900 mb-2 mt-4", children: "\u041C\u043E\u0441\u043A\u0432\u0430:" }), _jsx("p", { className: "text-base text-neutral-600 leading-6 mb-4", children: "\u0412\u0441\u0435 \u0440\u0430\u0439\u043E\u043D\u044B \u0438 \u043E\u043A\u0440\u0443\u0433\u0430. \u0412\u044B\u0435\u0437\u0434 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 1-2 \u0447\u0430\u0441\u043E\u0432." }), _jsx("h3", { className: "text-lg font-semibold text-neutral-900 mb-2", children: "\u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C:" }), _jsx("p", { className: "text-base text-neutral-600 leading-6 mb-4", children: "\u0412\u0441\u0435 \u0433\u043E\u0440\u043E\u0434\u0430 \u0438 \u0440\u0430\u0439\u043E\u043D\u044B \u041C\u041E. \u0412\u0440\u0435\u043C\u044F \u0432\u044B\u0435\u0437\u0434\u0430 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043D\u043E\u0441\u0442\u0438." }), _jsx("div", { className: "bg-primary-50 rounded-lg p-4 mt-4", children: _jsx("p", { className: "text-sm text-info-800 font-medium leading-5", children: "\uD83D\uDCA1 \u041C\u044B \u043C\u043E\u0436\u0435\u043C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u0442\u044C \u044D\u0432\u0430\u043A\u0443\u0430\u0442\u043E\u0440 \u0434\u043B\u044F \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F, \u0435\u0441\u043B\u0438 \u043E\u043D \u043D\u0435 \u043D\u0430 \u0445\u043E\u0434\u0443 \u0438\u043B\u0438 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0434\u0430\u043B\u0435\u043A\u043E." }) })] })] }), _jsxs(Card, { className: "p-6 mb-6 flex flex-col items-center", children: [_jsx("h2", { className: "text-2xl font-bold text-neutral-900 mb-3 text-center", children: "\u0417\u043E\u043D\u044B \u0440\u0430\u0431\u043E\u0442\u044B \u043D\u0430 \u043A\u0430\u0440\u0442\u0435" }), _jsx("p", { className: "text-base text-neutral-600 text-center mb-6 max-w-[600px]", children: "\u041C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043F\u043E \u0432\u0441\u0435\u0439 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043A\u043D\u043E\u043F\u043A\u0443 \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u043A\u0430\u0440\u0442\u044B." }), _jsx(Button, { onClick: openMap, variant: "secondary", className: "min-w-[200px]", children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u0443" })] }), _jsxs(Card, { className: "bg-primary-600 p-8 mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-3 text-center", children: "\u041D\u0430\u0448\u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u043E \u0432\u044B\u043A\u0443\u043F\u0443 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), _jsx("p", { className: "text-lg text-primary-100 text-center mb-8 max-w-[800px] mx-auto", children: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438 \u043F\u043E \u043B\u044E\u0431\u043E\u0439 \u0438\u0437 \u043D\u0430\u0448\u0438\u0445 \u0443\u0441\u043B\u0443\u0433. \u041A\u0430\u0436\u0434\u0430\u044F \u0443\u0441\u043B\u0443\u0433\u0430 \u0438\u043C\u0435\u0435\u0442 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0441 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439." }), _jsx("div", { className: "flex flex-row flex-wrap gap-4", children: [
                                { title: 'Срочный выкуп', text: 'Выкуп за 2 часа', path: '/services/urgent-buyback' },
                                { title: 'Выкуп битых авто', text: 'Любая степень повреждения', path: '/services/damaged-cars' },
                                { title: 'Выкуп после ДТП', text: 'Оценка остаточной стоимости', path: '/services/after-accident' },
                                { title: 'Выкуп кредитных авто', text: 'Помощь с банком', path: '/services/credit-cars' },
                                { title: 'Выкуп премиум авто', text: 'Элитные автомобили', path: '/services/premium-cars' },
                                { title: 'Выкуп автомобилей', text: 'Все марки и модели', path: '/services/buyback-cars' },
                            ].map((service) => (_jsxs("button", { onClick: () => handleLinkPress(service.path), className: "flex-1 min-w-[200px] bg-white/10 rounded-lg p-4 flex flex-col items-center hover:bg-white/20 transition-colors", children: [_jsx("h3", { className: "text-base font-semibold text-white mb-2 text-center", children: service.title }), _jsx("p", { className: "text-sm text-primary-100 text-center", children: service.text })] }, service.path))) })] })] }) }));
};
export default Contacts;
