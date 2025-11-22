import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import PhoneButton from '../PhoneButton';
import { APP_CONFIG } from '../../lib/config';
const CTASection = ({ variant = 'primary', title, subtitle, buttonText = 'УЗНАТЬ ЦЕНУ →', buttonAction, showPhone = false, phoneVariant = 'secondary', customContent, className = '', }) => {
    const navigate = useNavigate();
    const phone1 = APP_CONFIG.PHONE_1;
    const handleButtonClick = () => {
        if (buttonAction) {
            buttonAction();
        }
        else {
            navigate('/calculator');
        }
    };
    const getContainerClasses = () => {
        const baseClasses = 'relative overflow-hidden py-24 px-5 md:px-6';
        switch (variant) {
            case 'primary':
                return `${baseClasses} cta-primary-gradient`;
            case 'secondary':
                return `${baseClasses} bg-gradient-to-b from-white dark:from-neutral-900 to-neutral-50 dark:to-neutral-950 border-t border-b border-neutral-200 dark:border-neutral-800`;
            case 'urgent':
                return `${baseClasses} cta-urgent-gradient`;
            case 'minimal':
                return `${baseClasses} bg-white dark:bg-neutral-900`;
            default:
                return `${baseClasses} cta-primary-gradient`;
        }
    };
    const getTitleClasses = () => {
        const baseClasses = 'text-center mb-6 text-4xl md:text-5xl font-bold leading-tight tracking-tight';
        switch (variant) {
            case 'primary':
            case 'urgent':
                return `${baseClasses} text-white drop-shadow-sm`;
            case 'secondary':
                return `${baseClasses} text-neutral-900 dark:text-neutral-100 font-extrabold`;
            case 'minimal':
                return `${baseClasses} text-neutral-900 dark:text-neutral-100 text-3xl md:text-4xl font-semibold`;
            default:
                return `${baseClasses} text-white drop-shadow-sm`;
        }
    };
    const getSubtitleClasses = () => {
        const baseClasses = 'text-center mb-12 text-lg md:text-xl max-w-[720px] leading-relaxed tracking-tight';
        switch (variant) {
            case 'primary':
            case 'urgent':
                return `${baseClasses} text-white/95 font-normal`;
            case 'secondary':
                return `${baseClasses} text-neutral-600 dark:text-neutral-300 font-normal`;
            case 'minimal':
                return `${baseClasses} text-neutral-500 dark:text-neutral-400 text-base md:text-lg`;
            default:
                return `${baseClasses} text-white/95 font-normal`;
        }
    };
    const getButtonVariant = () => {
        switch (variant) {
            case 'primary':
            case 'urgent':
                return 'secondary';
            case 'secondary':
            case 'minimal':
                return 'primary';
            default:
                return 'secondary';
        }
    };
    return (<section className={`${getContainerClasses()} ${className}`}>
      <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center z-10">
        <h2 className={getTitleClasses()}>{title}</h2>
        {subtitle && (<p className={getSubtitleClasses()}>{subtitle}</p>)}
        
        {customContent || (<div className="flex flex-row flex-wrap gap-5 justify-center items-center">
            <Button onClick={handleButtonClick} size="lg" variant={getButtonVariant()} className="min-w-[300px]">
              {buttonText}
            </Button>
            {showPhone && (<PhoneButton phone={phone1} variant={phoneVariant} size="lg"/>)}
          </div>)}
      </div>
    </section>);
};
export default React.memo(CTASection);
