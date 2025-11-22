import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Card from '../components/ui/Card.js';
import Input from '../components/ui/Input.js';
import Button from '../components/ui/Button.js';
import { APP_CONFIG } from '../lib/config/index.js';
const carBrands = [
    { name: 'Toyota', category: 'popular', examples: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser'] },
    { name: 'Mercedes-Benz', category: 'premium', examples: ['C-Class', 'E-Class', 'S-Class', 'GLE'] },
    { name: 'BMW', category: 'premium', examples: ['3 Series', '5 Series', 'X5', 'X3'] },
    { name: 'Audi', category: 'premium', examples: ['A4', 'A6', 'Q5', 'Q7'] },
    { name: 'Volkswagen', category: 'popular', examples: ['Passat', 'Tiguan', 'Polo', 'Golf'] },
    { name: 'Ford', category: 'popular', examples: ['Focus', 'Mondeo', 'Kuga', 'Explorer'] },
    { name: 'Nissan', category: 'popular', examples: ['Qashqai', 'X-Trail', 'Altima', 'Pathfinder'] },
    { name: 'Hyundai', category: 'budget', examples: ['Solaris', 'Tucson', 'Santa Fe', 'Elantra'] },
    { name: 'Kia', category: 'budget', examples: ['Rio', 'Sportage', 'Sorento', 'Optima'] },
    { name: 'Mazda', category: 'popular', examples: ['CX-5', '6', 'CX-9', '3'] },
    { name: 'Honda', category: 'popular', examples: ['CR-V', 'Accord', 'Civic', 'Pilot'] },
    { name: 'Lexus', category: 'premium', examples: ['RX', 'NX', 'ES', 'GX'] },
    { name: 'Volvo', category: 'premium', examples: ['XC60', 'XC90', 'S90', 'V90'] },
    { name: 'Skoda', category: 'popular', examples: ['Octavia', 'Kodiaq', 'Superb', 'Kamiq'] },
    { name: 'Renault', category: 'budget', examples: ['Logan', 'Duster', 'Kaptur', 'Arkana'] },
    { name: 'Peugeot', category: 'popular', examples: ['3008', '5008', '308', '508'] },
    { name: 'Citroen', category: 'budget', examples: ['C4', 'C5', 'Berlingo', 'C3'] },
    { name: 'Opel', category: 'popular', examples: ['Astra', 'Insignia', 'Crossland', 'Grandland'] },
    { name: 'Chevrolet', category: 'popular', examples: ['Cruze', 'Tahoe', 'Equinox', 'Traverse'] },
    { name: 'Mitsubishi', category: 'popular', examples: ['Outlander', 'Pajero', 'L200', 'ASX'] },
    { name: 'Subaru', category: 'popular', examples: ['Forester', 'Outback', 'Impreza', 'XV'] },
    { name: 'Infiniti', category: 'premium', examples: ['QX50', 'QX60', 'Q50', 'QX80'] },
    { name: 'Porsche', category: 'premium', examples: ['Cayenne', 'Macan', 'Panamera', '911'] },
    { name: 'Jaguar', category: 'premium', examples: ['F-Pace', 'XE', 'XF', 'E-Pace'] },
    { name: 'Land Rover', category: 'premium', examples: ['Range Rover', 'Discovery', 'Defender', 'Evoque'] },
    { name: 'Range Rover', category: 'premium', examples: ['Range Rover', 'Range Rover Sport', 'Range Rover Velar'] },
    { name: 'Tesla', category: 'premium', examples: ['Model 3', 'Model S', 'Model X', 'Model Y'] },
];
const CarBrands = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const filteredBrands = useMemo(() => {
        return carBrands.filter((brand) => {
            const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
            const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);
    const categories = [
        { value: 'all', label: 'Все марки' },
        { value: 'budget', label: 'Бюджетные' },
        { value: 'popular', label: 'Средний класс' },
        { value: 'premium', label: 'Премиум' },
    ];
    const getCategoryLabel = (category) => {
        if (category === 'premium')
            return 'Премиум';
        if (category === 'popular')
            return 'Средний класс';
        return 'Бюджетные';
    };
    const getCategoryColor = (category) => {
        if (category === 'premium')
            return { bg: 'bg-purple-100', text: 'text-purple-700' };
        if (category === 'popular')
            return { bg: 'bg-primary-100', text: 'text-info-800' };
        return { bg: 'bg-success-100', text: 'text-success-800' };
    };
    return (_jsx("div", { className: "flex-1 bg-neutral-50", children: _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center py-12 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u041C\u0430\u0440\u043A\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u044B \u0432\u044B\u043A\u0443\u043F\u0430\u0435\u043C" }), _jsx("p", { className: "text-lg text-neutral-600 text-center max-w-[800px] mb-8", children: "\u0412\u044B\u043A\u0443\u043F\u0430\u0435\u043C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438 \u0432\u0441\u0435\u0445 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0445 \u043C\u0430\u0440\u043E\u043A: \u043E\u0442 \u0431\u044E\u0434\u0436\u0435\u0442\u043D\u044B\u0445 \u0434\u043E \u043F\u0440\u0435\u043C\u0438\u0443\u043C \u043A\u043B\u0430\u0441\u0441\u0430. \u041D\u0430\u0439\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u044E \u043C\u0430\u0440\u043A\u0443 \u0438 \u0443\u0437\u043D\u0430\u0439\u0442\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u043C\u043E\u0434\u0435\u043B\u0435\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u044B \u0432\u044B\u043A\u0443\u043F\u0430\u0435\u043C." })] }), _jsxs(Card, { className: "p-6 mb-8", children: [_jsxs("div", { className: "flex flex-row gap-4 mb-4", children: [_jsxs("div", { className: "flex-1 flex flex-row items-center border border-neutral-300 rounded-lg px-3", children: [_jsx("span", { className: "text-xl mr-2", children: "\uD83D\uDD0D" }), _jsx(Input, { value: searchQuery, onChangeText: setSearchQuery, placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043C\u0430\u0440\u043A\u0435...", className: "border-0 p-0" })] }), _jsxs("div", { className: "flex flex-row items-center gap-2", children: [_jsx("span", { className: "text-xl text-neutral-600", children: "\uD83D\uDD3D" }), _jsx("span", { className: "text-base font-medium text-neutral-700", children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F:" })] })] }), _jsx("div", { className: "flex flex-row flex-wrap gap-2", children: categories.map((category) => (_jsx("button", { className: `px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.value
                                    ? 'bg-primary-600 text-white font-semibold'
                                    : 'bg-neutral-100 text-neutral-700 font-medium'}`, onClick: () => setSelectedCategory(category.value), children: _jsx("span", { className: "text-sm", children: category.label }) }, category.value))) })] }), _jsx("div", { className: "flex flex-row flex-wrap gap-6 mb-8", children: filteredBrands.length > 0 ? (filteredBrands.map((brand) => {
                        const categoryColor = getCategoryColor(brand.category);
                        return (_jsxs(Card, { className: "flex-1 min-w-[300px] p-6", children: [_jsx("h3", { className: "text-2xl font-bold text-neutral-900 mb-4", children: brand.name }), _jsx("div", { className: "mb-4", children: _jsx("div", { className: `inline-block px-3 py-1 rounded-xl ${categoryColor.bg}`, children: _jsx("span", { className: `text-sm font-medium ${categoryColor.text}`, children: getCategoryLabel(brand.category) }) }) }), _jsx("p", { className: "text-sm font-medium text-neutral-600 mb-2", children: "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u043C\u043E\u0434\u0435\u043B\u0438:" }), _jsx("div", { className: "flex flex-row flex-wrap gap-2 mb-4", children: brand.examples.map((model, idx) => (_jsx("div", { className: "bg-neutral-100 px-2 py-1 rounded", children: _jsx("span", { className: "text-xs text-neutral-700", children: model }) }, idx))) }), _jsxs("button", { onClick: () => navigate(`/services/buyback-cars?brand=${encodeURIComponent(brand.name)}`), className: "text-base font-semibold text-primary-600 hover:text-primary-700 transition-colors", children: ["\u0423\u0437\u043D\u0430\u0442\u044C \u0446\u0435\u043D\u0443 \u0432\u044B\u043A\u0443\u043F\u0430 ", brand.name, " \u2192"] })] }, brand.name));
                    })) : (_jsx("div", { className: "py-12 flex items-center justify-center w-full", children: _jsx("p", { className: "text-lg text-neutral-600", children: "\u041C\u0430\u0440\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B \u0438\u043B\u0438 \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441." }) })) }), _jsxs("div", { className: "bg-primary-600 rounded-xl p-8 mb-8 flex flex-col items-center", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4 text-center", children: "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E \u043C\u0430\u0440\u043A\u0443?" }), _jsx("p", { className: "text-lg text-primary-100 mb-8 text-center max-w-[600px]", children: "\u041C\u044B \u0432\u044B\u043A\u0443\u043F\u0430\u0435\u043C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438 \u0432\u0441\u0435\u0445 \u043C\u0430\u0440\u043E\u043A \u0438 \u043C\u043E\u0434\u0435\u043B\u0435\u0439. \u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u0434\u043B\u044F \u043E\u0446\u0435\u043D\u043A\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F." }), _jsxs("div", { className: "flex flex-row flex-wrap gap-4 justify-center", children: [_jsx(Button, { onClick: () => navigate('/services/buyback-cars'), variant: "secondary", className: "min-w-[200px]", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043E\u0446\u0435\u043D\u043A\u0443" }), _jsxs(Button, { onClick: () => {
                                        window.location.href = `tel:${APP_CONFIG.PHONE_1}`;
                                    }, variant: "outline", className: "min-w-[200px] bg-white/10 border-white text-white hover:bg-white/20", children: ["\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C: ", APP_CONFIG.PHONE_1] })] })] }), _jsxs(Card, { className: "p-8 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-neutral-900 mb-6 text-center", children: "\u041D\u0430\u0448\u0438 \u0443\u0441\u043B\u0443\u0433\u0438" }), _jsx("div", { className: "flex flex-row flex-wrap gap-4", children: [
                                { title: 'Выкуп автомобилей', subtitle: 'Все марки и модели', path: '/services/buyback-cars' },
                                { title: 'Срочный выкуп', subtitle: 'Выкуп за 2 часа', path: '/services/urgent-buyback' },
                                { title: 'Выкуп премиум авто', subtitle: 'Элитные автомобили', path: '/services/premium-cars' },
                            ].map((service) => (_jsxs("button", { onClick: () => navigate(service.path), className: "flex-1 min-w-[200px] bg-neutral-50 rounded-lg p-4 flex flex-col items-center hover:bg-neutral-100 transition-colors", children: [_jsx("h3", { className: "text-base font-semibold text-neutral-900 mb-1", children: service.title }), _jsx("p", { className: "text-sm text-neutral-600 text-center", children: service.subtitle })] }, service.path))) })] })] }) }));
};
export default CarBrands;
