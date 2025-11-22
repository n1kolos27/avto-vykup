import React, { useState, useEffect } from 'react';
import PhoneButton from '~/components/PhoneButton';
import Button from '~/components/ui/Button';
import { APP_CONFIG } from '~/lib/config/index';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const phone1 = APP_CONFIG.PHONE_1;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        setIsVisible(scrollY > 300);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      const form = document.getElementById('evaluation');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] animate-slide-up">
      <div className="flex flex-row bg-white dark:bg-neutral-800 rounded-[28px] px-4 py-3 shadow-lg dark:shadow-dark-lg border-2 border-primary-600 dark:border-primary-400 gap-3 items-center transition-colors">
        <PhoneButton phone={phone1} variant="ghost" />
        <Button
          onClick={scrollToForm}
          size="sm"
          className="min-w-[100px]"
        >
          Оценить
        </Button>
      </div>
    </div>
  );
};

export default React.memo(FloatingCTA);
