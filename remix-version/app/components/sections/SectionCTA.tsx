import React from 'react';
import { useNavigate } from 'react-router';
import Button from '~/components/ui/Button';
import PhoneButton from '~/components/PhoneButton';
import { APP_CONFIG } from '~/lib/config';

interface SectionCTAProps {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
}

const SectionCTA: React.FC<SectionCTAProps> = ({
  title,
  description,
  variant = 'primary',
}) => {
  const navigate = useNavigate();

  return (
    <div className={`${variant === 'primary' ? 'gradient-animated-primary' : 'cta-urgent-gradient'} rounded-2xl p-8 flex flex-col items-center transition-all duration-300 relative overflow-hidden`}>
      <h3 className="text-3xl font-bold text-white mb-3 text-center relative z-10">{title}</h3>
      {description && (
        <p className="text-base text-white/90 dark:text-white/95 mb-6 text-center relative z-10">{description}</p>
      )}
      <div className="flex flex-row gap-3 flex-wrap justify-center relative z-10">
        <Button
          onClick={() => navigate('/calculator')}
          size="lg"
          variant={variant === 'primary' ? 'primary' : 'secondary'}
          className="min-w-[200px]"
        >
          Оценить авто онлайн
        </Button>
        <PhoneButton phone={APP_CONFIG.PHONE_1} variant={variant === 'primary' ? 'secondary' : 'primary'} />
      </div>
    </div>
  );
};

export default React.memo(SectionCTA);
