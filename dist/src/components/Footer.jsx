import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_CONFIG } from '../lib/config/index.js';
const Footer = () => {
    const navigate = useNavigate();
    const handlePhonePress = (phone) => {
        const phoneNumber = phone.replace(/\D/g, '');
        window.location.href = `tel:+${phoneNumber}`;
    };
    const handleEmailPress = () => {
        window.location.href = `mailto:${APP_CONFIG.EMAIL}`;
    };
    return (<footer className="bg-neutral-800 dark:bg-neutral-950 pt-10 pb-5 transition-colors">
      <div className="flex flex-col md:flex-row md:justify-around px-5 max-w-[1200px] w-full mx-auto mb-8 md:px-6">
        <div className="mb-8 md:mb-0 md:flex-1 md:mr-5">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">Выкуп авто</h2>
          <p className="text-sm md:text-base text-neutral-300 dark:text-neutral-400 leading-relaxed">
            Профессиональный выкуп автомобилей в Москве и МО
          </p>
        </div>
        
        <div className="mb-8 md:mb-0 md:flex-1 md:mr-5">
          <h3 className="text-base md:text-lg font-semibold text-white mb-4 tracking-tight">Контакты</h3>
          <button onClick={() => handlePhonePress(APP_CONFIG.PHONE_1)} className="block mb-3 text-left min-h-[44px] flex items-center" aria-label={`Позвонить по телефону ${APP_CONFIG.PHONE_1}`}>
            <span className="text-sm md:text-base text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors hover-underline-animation">
              {APP_CONFIG.PHONE_1}
            </span>
          </button>
          <button onClick={() => handlePhonePress(APP_CONFIG.PHONE_2)} className="block mb-3 text-left min-h-[44px] flex items-center" aria-label={`Позвонить по телефону ${APP_CONFIG.PHONE_2}`}>
            <span className="text-sm md:text-base text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors hover-underline-animation">
              {APP_CONFIG.PHONE_2}
            </span>
          </button>
          <button onClick={handleEmailPress} className="block mb-3 text-left min-h-[44px] flex items-center" aria-label={`Написать на email ${APP_CONFIG.EMAIL}`}>
            <span className="text-sm md:text-base text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors hover-underline-animation">
              {APP_CONFIG.EMAIL}
            </span>
          </button>
        </div>
        
        <div className="mb-8 md:mb-0 md:flex-1">
          <h3 className="text-base md:text-lg font-semibold text-white mb-4 tracking-tight">Навигация</h3>
          <button onClick={() => navigate('/')} className="block mb-3 text-left min-h-[44px] flex items-center" aria-label="Перейти на главную страницу">
            <span className="text-sm md:text-base text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors hover-underline-animation">
              Главная
            </span>
          </button>
          <button onClick={() => navigate('/calculator')} className="block mb-3 text-left min-h-[44px] flex items-center" aria-label="Перейти на страницу калькулятора">
            <span className="text-sm md:text-base text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors hover-underline-animation">
              Калькулятор
            </span>
          </button>
          <button onClick={() => navigate('/reviews')} className="block mb-3 text-left min-h-[44px] flex items-center" aria-label="Перейти на страницу отзывов">
            <span className="text-sm md:text-base text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors hover-underline-animation">
              Отзывы
            </span>
          </button>
          <button onClick={() => navigate('/contacts')} className="block mb-3 text-left min-h-[44px] flex items-center" aria-label="Перейти на страницу контактов">
            <span className="text-sm md:text-base text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors hover-underline-animation">
              Контакты
            </span>
          </button>
        </div>
      </div>
      
      <div className="border-t border-neutral-700 dark:border-neutral-800 pt-6 px-5 text-center md:px-6">
        <p className="text-sm md:text-base text-neutral-400 dark:text-neutral-500 leading-relaxed">
          © {new Date().getFullYear()} Выкуп авто. Все права защищены.
        </p>
      </div>
    </footer>);
};
export default Footer;
