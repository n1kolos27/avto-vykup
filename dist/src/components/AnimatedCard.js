import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef, useState } from 'react';
const AnimatedCard = ({ children, delay = 0, className = '', }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const cardRef = useRef(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            setPrefersReducedMotion(mediaQuery.matches);
            const handleChange = (e) => {
                setPrefersReducedMotion(e.matches);
            };
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);
    useEffect(() => {
        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }
        if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible) {
                        setTimeout(() => setIsVisible(true), delay);
                        observer.disconnect();
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px',
            });
            const element = cardRef.current;
            if (element) {
                observer.observe(element);
            }
            return () => {
                observer.disconnect();
            };
        }
        else {
            setTimeout(() => setIsVisible(true), delay);
        }
    }, [delay, isVisible, prefersReducedMotion]);
    return (_jsx("div", { ref: cardRef, className: `${prefersReducedMotion
            ? 'opacity-100'
            : isVisible
                ? 'opacity-100 translate-y-0 scale-100 spring-bounce'
                : 'opacity-0 translate-y-12 scale-95'} ${!prefersReducedMotion ? 'will-change-transform will-change-opacity' : ''} ${className}`, children: children }));
};
export default React.memo(AnimatedCard);
