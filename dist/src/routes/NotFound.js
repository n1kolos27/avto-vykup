import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.js';
const NotFound = () => {
    const navigate = useNavigate();
    return (_jsx("div", { className: "flex-1 flex items-center justify-center p-5", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("h1", { className: "text-7xl font-bold text-primary-600 mb-4", children: "404" }), _jsx("p", { className: "text-lg text-neutral-600 mb-6", children: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430" }), _jsx(Button, { onClick: () => navigate('/'), children: "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" })] }) }));
};
export default NotFound;
