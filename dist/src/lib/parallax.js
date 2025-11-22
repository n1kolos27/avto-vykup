/**
 * Parallax effect utilities
 * Provides smooth parallax scrolling effects with performance optimization
 */
export const initParallax = (element, options = {}) => {
    const { speed = 0.5, direction = 'up', offset = 0 } = options;
    let ticking = false;
    let rafId = null;
    const updateParallax = () => {
        if (!element)
            return;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        // Calculate if element is in viewport
        const isInViewport = elementTop < windowHeight && elementTop + elementHeight > 0;
        if (isInViewport) {
            const scrolled = window.scrollY || window.pageYOffset;
            const elementOffset = elementTop + scrolled;
            const windowCenter = windowHeight / 2;
            const elementCenter = elementTop + elementHeight / 2;
            const distanceFromCenter = elementCenter - windowCenter;
            const parallaxValue = distanceFromCenter * speed * (direction === 'up' ? -1 : 1) + offset;
            element.style.transform = `translate3d(0, ${parallaxValue}px, 0)`;
        }
        ticking = false;
    };
    const onScroll = () => {
        if (!ticking) {
            rafId = requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        window.addEventListener('scroll', onScroll, { passive: true });
        updateParallax(); // Initial calculation
    }
    return () => {
        window.removeEventListener('scroll', onScroll);
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
        }
        if (element) {
            element.style.transform = '';
        }
    };
};
/**
 * Smooth scroll with momentum/inertia
 */
export const smoothScrollTo = (target, options = {}) => {
    const { duration = 800, easing = (t) => t * (2 - t), offset = 0 } = options;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        const targetElement = typeof target === 'number' ? null : target;
        const targetY = typeof target === 'number' ? target : targetElement.offsetTop;
        window.scrollTo({ top: targetY + offset, behavior: 'smooth' });
        return;
    }
    const startY = window.pageYOffset || window.scrollY;
    const targetY = typeof target === 'number'
        ? target
        : target.offsetTop + offset;
    const distance = targetY - startY;
    const startTime = performance.now();
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easing(progress);
        window.scrollTo(0, startY + distance * eased);
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    requestAnimationFrame(animate);
};
