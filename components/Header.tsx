'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { APP_CONFIG, MAIN_NAV_ITEMS } from '@/lib/config';
import { getReducedMotionConfig } from '@/lib/utils/accessibility';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setPrefersReducedMotion] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const phone1 = APP_CONFIG.PHONE_1;
  const phone2 = APP_CONFIG.PHONE_2;
  const navItems = MAIN_NAV_ITEMS;

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Save current active element
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      // Focus first focusable element in menu
      setTimeout(() => {
        const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        firstFocusable?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      // Return focus to previous element
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
        previousActiveElementRef.current = null;
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Keyboard navigation for mobile menu
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }

      if (e.key === 'Tab' && mobileMenuRef.current) {
        const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const isActive = useCallback((href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  }, [pathname]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg'
          : 'bg-white shadow-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105"
            aria-label="Выкуп авто - Главная страница"
          >
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Выкуп авто - Логотип компании"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 48px, 64px"
              />
            </div>
            <span className="text-gray-800 font-semibold hidden sm:block">
              Выкуп авто в МСК/МО
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Основная навигация">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-h-[44px] flex items-center ${
                    active
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                      initial={false}
                      transition={getReducedMotionConfig(
                        { type: 'spring', stiffness: 500, damping: 30 },
                        {}
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="#evaluation"
              className="flex items-center space-x-2 bg-gradient-to-br from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-h-[44px]"
              whileHover={getReducedMotionConfig({ scale: 1.05, y: -1 }, {})}
              whileTap={getReducedMotionConfig({ scale: 0.95 }, {})}
              aria-label="Оставить заявку на оценку автомобиля"
            >
              <span>Оставить заявку</span>
            </motion.a>
            <motion.a
              href={`tel:${phone1}`}
              className="flex items-center space-x-2 bg-white text-primary-600 border-2 border-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-h-[44px]"
              whileHover={getReducedMotionConfig({ scale: 1.05, y: -1 }, {})}
              whileTap={getReducedMotionConfig({ scale: 0.95 }, {})}
              aria-label={`Позвонить по телефону ${phone1}`}
            >
              <FiPhone aria-hidden="true" />
              <span>{phone1}</span>
            </motion.a>
          </div>

          <motion.button
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            type="button"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <FiX size={24} aria-hidden="true" /> : <FiMenu size={24} aria-hidden="true" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={closeMenu}
              />
              <motion.div
                ref={mobileMenuRef}
                id="mobile-menu"
                initial={getReducedMotionConfig({ x: '100%' }, { x: '0%' })}
                animate={getReducedMotionConfig({ x: '0%' }, {})}
                exit={getReducedMotionConfig({ x: '100%' }, {})}
                transition={getReducedMotionConfig(
                  { type: 'spring', damping: 25, stiffness: 200 },
                  {}
                )}
                className="fixed top-20 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
                role="dialog"
                aria-label="Мобильное меню"
                aria-modal="true"
              >
                <nav className="flex flex-col p-6 space-y-2">
                  {navItems.map((item, index) => {
                    const active = isActive(item.href);
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-h-[44px] flex items-center ${
                            active
                              ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                              : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                          }`}
                          onClick={closeMenu}
                          aria-current={active ? 'page' : undefined}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <div className="pt-6 mt-6 border-t border-gray-200 space-y-3">
                    <motion.a
                      href="#evaluation"
                      className="flex items-center justify-center space-x-2 bg-gradient-to-br from-primary-600 to-primary-700 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      whileTap={getReducedMotionConfig({ scale: 0.95 }, {})}
                      onClick={closeMenu}
                      aria-label="Оставить заявку на оценку автомобиля"
                    >
                      <span>Оставить заявку</span>
                    </motion.a>
                    <motion.a
                      href={`tel:${phone1}`}
                      className="flex items-center justify-center space-x-2 bg-white text-primary-600 border-2 border-primary-600 px-4 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      whileTap={getReducedMotionConfig({ scale: 0.95 }, {})}
                      onClick={closeMenu}
                      aria-label={`Позвонить по телефону ${phone1}`}
                    >
                      <FiPhone aria-hidden="true" />
                      <span>{phone1}</span>
                    </motion.a>
                    <motion.a
                      href={`tel:${phone2}`}
                      className="flex items-center justify-center space-x-2 bg-white text-primary-600 border-2 border-primary-600 px-4 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      whileTap={getReducedMotionConfig({ scale: 0.95 }, {})}
                      onClick={closeMenu}
                      aria-label={`Позвонить по телефону ${phone2}`}
                    >
                      <FiPhone aria-hidden="true" />
                      <span>{phone2}</span>
                    </motion.a>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
