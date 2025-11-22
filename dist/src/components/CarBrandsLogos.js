import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const brands = ['Toyota', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Ford', 'Nissan', 'Hyundai'];
const CarBrandsLogos = () => {
    return (_jsxs("div", { className: "mb-6", children: [_jsx("p", { className: "text-sm text-white/80 text-center mb-3", children: "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441\u043E \u0432\u0441\u0435\u043C\u0438 \u043C\u0430\u0440\u043A\u0430\u043C\u0438" }), _jsx("div", { className: "flex flex-row overflow-x-auto gap-3 scrollbar-hide", children: brands.map((brand, index) => (_jsx("div", { className: "px-4 py-2 mr-3 bg-white/10 rounded-lg border border-white/20 flex-shrink-0", children: _jsx("span", { className: "text-sm text-white font-medium", children: brand }) }, index))) })] }));
};
export default CarBrandsLogos;
