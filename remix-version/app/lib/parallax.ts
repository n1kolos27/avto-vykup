/**
 * Parallax effect utilities
 * Provides smooth parallax scrolling effects with performance optimization
 */

export interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  offset?: number;
}

export const initParallax = (
  element: HTMLElement,
  options: ParallaxOptions = {}
): (() => void) => {
  const { speed = 0.5, direction = 'up', offset = 0 } = options;
  
  let ticking = false;
  let rafId: number | null = null;

  const updateParallax = () => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;

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

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();
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
