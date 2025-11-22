import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import PhoneButton from '../PhoneButton';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { APP_CONFIG } from '../../lib/config';

const features = [
  {
    icon: '💳',
    title: 'Погашение автокредита',
    description: 'Помогаем решить вопрос с банком и погасить кредит',
  },
  {
    icon: '💰',
    title: 'Справедливая оценка',
    description: 'Честная рыночная цена без занижения стоимости',
  },
  {
    icon: '⏱️',
    title: 'За наш счет',
    description: 'Эвакуатор, переоформление и все расходы берем на себя',
  },
];

const UrgencySection: React.FC = () => {
  const navigate = useNavigate();
  const phone1 = APP_CONFIG.PHONE_1;
  const [slotsLeft] = useState(3);
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="cta-urgent-gradient py-20 px-4 relative">
      <div className="max-w-[1200px] w-full mx-auto relative z-10">
        {/* Срочное предложение с таймером */}
        <div className="glass-morphism-subtle rounded-3xl p-8 border border-white/30 mb-12">
          <div className="flex flex-row items-center bg-error-600/20 px-4 py-2 rounded-full mb-5 self-center gap-2">
            <span className="text-xl">⚠️</span>
            <span className="text-sm font-semibold text-white">Ограниченное предложение</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center leading-tight">
            Специальное предложение сегодня!
          </h2>
          <p className="text-lg md:text-xl text-white/95 mb-8 text-center max-w-[700px] mx-auto leading-relaxed">
            Получите бесплатную оценку и дополнительную скидку при сделке сегодня
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 max-w-[600px] mx-auto">
            <div className="flex flex-col items-center bg-white/10 p-6 rounded-2xl border border-white/20">
              <span className="text-4xl mb-3">👥</span>
              <span className="text-3xl font-bold text-white mb-2">{slotsLeft}</span>
              <span className="text-sm text-white/85 text-center">Слотов осталось</span>
            </div>

            <div className="flex flex-col items-center bg-white/10 p-6 rounded-2xl border border-white/20">
              <span className="text-4xl mb-3">⏱️</span>
              <span className="text-3xl font-bold text-white mb-2">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-sm text-white/85 text-center">До конца акции</span>
            </div>

            <div className="flex flex-col items-center bg-white/10 p-6 rounded-2xl border border-white/20">
              <span className="text-4xl mb-3">📞</span>
              <span className="text-3xl font-bold text-white mb-2">47+</span>
              <span className="text-sm text-white/85 text-center">Оценок сегодня</span>
            </div>
          </div>

          <div className="flex flex-row flex-wrap gap-4 justify-center items-center">
            <Button
              onClick={() => navigate('/calculator')}
              size="lg"
              variant="secondary"
              className="min-w-[240px] flex-1"
            >
              Получить оценку сейчас
            </Button>
            <PhoneButton phone={phone1} variant="secondary" size="lg" />
          </div>
        </div>

        {/* Информация о работе */}
        <div className="mt-4">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center leading-tight">
            Срочный выкуп авто в компании «Московский Авто Альянс» с 9:00 до 22:00 ежедневно
          </h3>

          <AnimatedSection animationType="stagger" delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <AnimatedCard key={index} delay={index * 100}>
                  <Card
                    hover3D
                    variant="outlined"
                    className="bg-white/10 dark:bg-white/5 p-8 flex flex-col items-center border border-white/30 dark:border-white/20 transition-colors h-full"
                  >
                <div className="w-[72px] h-[72px] rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center mb-5">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3 text-center">
                  {feature.title}
                </h4>
                <p className="text-base text-white/95 dark:text-white/90 text-center leading-6">
                  {feature.description}
                </p>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default React.memo(UrgencySection);
