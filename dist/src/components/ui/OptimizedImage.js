import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
/**
 * Оптимизированный компонент изображения с обязательным alt-текстом
 * Поддерживает lazy loading, WebP формат, srcset и fallback изображения
 */
const OptimizedImage = ({ src, alt, fallback, loading = 'lazy', className = '', webpSrc, srcSet, sizes, ...props }) => {
    const [imageError, setImageError] = useState(false);
    const [imageSrc, setImageSrc] = useState(src);
    const handleError = () => {
        if (fallback && !imageError) {
            setImageError(true);
            setImageSrc(fallback);
        }
    };
    // Генерируем picture элемент для WebP поддержки
    const hasWebP = useMemo(() => webpSrc || src.endsWith('.webp'), [webpSrc, src]);
    if (hasWebP && webpSrc) {
        return (_jsxs("picture", { children: [_jsx("source", { srcSet: webpSrc, type: "image/webp" }), _jsx("img", { src: imageSrc, alt: alt, loading: loading, className: className, srcSet: srcSet, sizes: sizes, onError: handleError, ...props })] }));
    }
    return (_jsx("img", { src: imageSrc, alt: alt, loading: loading, className: className, srcSet: srcSet, sizes: sizes, onError: handleError, ...props }));
};
export default OptimizedImage;
