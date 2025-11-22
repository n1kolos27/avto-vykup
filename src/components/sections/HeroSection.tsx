import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneButton from '../PhoneButton';
import HeroCalculator from '../HeroCalculator';
import CarBrandsLogos from '../CarBrandsLogos';
import Button from '../ui/Button';
import { APP_CONFIG } from '../../lib/config';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const phone1 = APP_CONFIG.PHONE_1;

  const features = useMemo(() => [
    'Оценка за 5 минут',
    'Честная цена',
    'Оплата сразу',
  ], []);

  const trustBadges = useMemo(() => [
    { icon: '🏆', text: '5000+ клиентов' },
    { icon: '🛡️', text: '10+ лет опыта' },
    { icon: '📈', text: '98% довольных' },
  ], []);

  return (
    <section className="cta-primary-gradient py-16 px-4 relative overflow-hidden md:py-20 md:px-6">
      <div className="max-w-[1200px] w-full mx-auto relative z-10">
        <div className="glass-morphism-subtle px-4 py-2 rounded-full mb-4 border border-white/30 self-start inline-block">
          <span className="text-white text-base font-semibold">Выкуп авто в Москве и МО</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Выкуп Авто Москва — ТОП-1 ⚡ Срочный Выкуп за 2 часа
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-3 leading-relaxed">
          Быстрая оценка, честная цена, моментальная оплата. Продайте свой автомобиль за один день!
        </p>

        <p className="text-base text-white/80 mb-6 font-medium">
          ⚡ Оценка за 5 минут - бесплатно | 💰 Честная рыночная цена | ✅ Оплата сразу
        </p>

        <HeroCalculator />

        <CarBrandsLogos />

        <div className="flex flex-row gap-3 mb-6 flex-wrap">
          <Button
            onClick={() => navigate('/calculator')}
            size="lg"
            variant="secondary"
            className="flex-1 min-w-[200px]"
          >
            Оценить авто онлайн — бесплатно
          </Button>
          <PhoneButton phone={phone1} variant="secondary" />
        </div>

        <div className="flex flex-row items-center gap-3 mb-6 flex-wrap">
          <div className="flex flex-row -mr-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center -ml-2"
              >
                <span className="text-xs font-semibold text-white">
                  {String.fromCharCode(65 + i)}
                </span>
              </div>
            ))}
          </div>
          <span className="text-sm text-white/90 font-medium">47+ оценок сегодня</span>
          <span className="text-sm text-white/50">•</span>
          <span className="text-sm text-white/90 font-medium">Среднее время ответа: 2 минуты</span>
        </div>

        <div className="flex flex-row flex-wrap gap-3 mb-6">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-row items-center bg-white/10 px-4 py-2.5 rounded-lg border border-white/20 gap-2"
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className="text-sm text-white/90 font-medium">{badge.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-row flex-wrap gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-row items-center bg-white/10 px-4 py-2.5 rounded-lg border border-white/20 gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-primary-700 flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-base text-white font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
