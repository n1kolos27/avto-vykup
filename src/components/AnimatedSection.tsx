import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'fade-slide' | 'bounce' | 'rotate' | 'stagger';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  className = '',
  animationType = 'fade-slide',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
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
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              setTimeout(() => setIsVisible(true), delay);
              observer.disconnect();
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '100px',
        }
      );

      const element = sectionRef.current;
      if (element) {
        observer.observe(element);
      }

      return () => {
        observer.disconnect();
      };
    } else {
      setTimeout(() => setIsVisible(true), delay);
    }
  }, [delay, isVisible, prefersReducedMotion]);

  const getAnimationClasses = (): string => {
    if (prefersReducedMotion) {
      return 'opacity-100';
    }

    if (!isVisible) {
      switch (animationType) {
        case 'fade':
          return 'opacity-0';
        case 'slide':
          return 'opacity-0 translate-y-8';
        case 'scale':
          return 'opacity-0 scale-95';
        case 'fade-slide':
          return 'opacity-0 translate-y-8';
        case 'bounce':
          return 'opacity-0 translate-y-12';
        case 'rotate':
          return 'opacity-0 rotate-[-5deg] scale-95';
        case 'stagger':
          return 'opacity-0 translate-y-8';
        default:
          return 'opacity-0 translate-y-8';
      }
    }
    
    const baseTransition = 'transition-all duration-700 ease-out';
    
    switch (animationType) {
      case 'fade':
        return `opacity-100 ${baseTransition}`;
      case 'slide':
        return `opacity-100 translate-y-0 ${baseTransition}`;
      case 'scale':
        return `opacity-100 scale-100 spring-scale`;
      case 'fade-slide':
        return `opacity-100 translate-y-0 ${baseTransition}`;
      case 'bounce':
        return `opacity-100 translate-y-0 spring-bounce`;
      case 'rotate':
        return `opacity-100 rotate-0 scale-100 ${baseTransition}`;
      case 'stagger':
        return `opacity-100 translate-y-0 stagger-item`;
      default:
        return `opacity-100 translate-y-0 ${baseTransition}`;
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`${getAnimationClasses()} ${!prefersReducedMotion ? 'will-change-transform will-change-opacity' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default React.memo(AnimatedSection);
