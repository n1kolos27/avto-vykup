import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import { initParallax } from '../lib/parallax';
const carBrands = [
    'Toyota', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Nissan',
    'Hyundai', 'Kia', 'Mazda', 'Honda', 'Lexus', 'Volvo', 'Skoda', 'Renault',
    'Peugeot', 'Citroen', 'Opel', 'Chevrolet', 'Mitsubishi', 'Subaru', 'Infiniti'
];
const currentYear = new Date().getFullYear();
const HeroCalculator = () => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: currentYear,
    });
    const [brandSuggestions, setBrandSuggestions] = useState([]);
    const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const calculatorRef = useRef(null);
    // Parallax effect for hero calculator
    useEffect(() => {
        if (calculatorRef.current) {
            const cleanup = initParallax(calculatorRef.current, { speed: 0.05, direction: 'up' });
            return cleanup;
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
    }, []);
    const handleShowAmount = useCallback(() => {
        if (!formData.brand || !formData.model || !formData.year) {
            return;
        }
        setIsCalculating(true);
        setTimeout(() => {
            setIsCalculating(false);
        }, 300);
    }, [formData]);
    const isFormValid = useMemo(() => {
        return formData.brand.length > 0 && formData.model.length > 0 && formData.year > 0;
    }, [formData]);
    return (_jsxs("div", { ref: calculatorRef, className: "bg-white/95 dark:bg-neutral-800/95 rounded-xl p-6 mb-8 shadow-lg glass-morphism-subtle will-change-transform", children: [_jsx("h2", { className: "text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-2 heading-gradient", children: "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F \u043E\u043D\u043B\u0430\u0439\u043D" }), _jsx("p", { className: "text-base text-neutral-600 dark:text-neutral-300 text-center mb-6", children: "\u0412\u044B\u043A\u0443\u043F \u0430\u0432\u0442\u043E \u043F\u043E \u0440\u044B\u043D\u043E\u0447\u043D\u043E\u0439 \u0446\u0435\u043D\u0435" }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx(Input, { label: "\u041C\u0430\u0440\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F", value: formData.brand, onChangeText: handleBrandChange, placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: Toyota" }), showBrandSuggestions && brandSuggestions.length > 0 && (_jsx("div", { className: "absolute top-full left-0 right-0 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 mt-1 z-10 shadow-md", children: brandSuggestions.map((brand) => (_jsx("button", { className: "p-3 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 w-full text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors", onClick: () => {
                                        setFormData(prev => ({ ...prev, brand }));
                                        setShowBrandSuggestions(false);
                                    }, children: _jsx("span", { className: "text-base text-neutral-900 dark:text-neutral-100", children: brand }) }, brand))) }))] }), _jsx("div", { children: _jsx(Input, { label: "\u041C\u043E\u0434\u0435\u043B\u044C", value: formData.model, onChangeText: (value) => setFormData(prev => ({ ...prev, model: value })), placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: Camry" }) }), _jsx("div", { children: _jsx(Input, { label: "\u0413\u043E\u0434 \u0432\u044B\u043F\u0443\u0441\u043A\u0430", value: formData.year.toString(), onChangeText: (value) => {
                                const year = parseInt(value) || currentYear;
                                setFormData(prev => ({ ...prev, year }));
                            }, type: "number", placeholder: currentYear.toString() }) }), _jsx(Button, { onClick: handleShowAmount, disabled: !isFormValid || isCalculating, isLoading: isCalculating, size: "lg", children: "\u0423\u0437\u043D\u0430\u0442\u044C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u2192" })] })] }));
};
export default HeroCalculator;
