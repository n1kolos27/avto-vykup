import React, { useRef, useState, useEffect } from 'react';
import { initMagnetic } from '../../lib/magnetic.js';
const Button = ({ variant = 'primary', size = 'md', isLoading = false, isSuccess = false, isError = false, magnetic = false, loadingProgress, children, title, onClick, disabled = false, className = '', testID, ...props }) => {
    const displayText = title || children;
    const isDisabled = disabled || isLoading;
    const buttonRef = useRef(null);
    const [ripples, setRipples] = useState([]);
    // Initialize magnetic effect
    useEffect(() => {
        if (magnetic && buttonRef.current && !isDisabled) {
            const cleanup = initMagnetic(buttonRef.current, { strength: 0.25 });
            return cleanup;
        }
    }, [magnetic, isDisabled]);
    const handleClick = (e) => {
        if (isDisabled || isLoading)
            return;
        const button = buttonRef.current;
        if (button) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rippleId = Date.now() + Math.random();
            setRipples((prev) => [...prev, { id: rippleId, x, y }]);
            // Improved ripple cleanup with smoother animation
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== rippleId));
            }, 1000);
        }
        if (onClick) {
            onClick(e);
        }
    };
    const getVariantClasses = () => {
        if (isSuccess) {
            return 'bg-success-600 dark:bg-success-500 hover:bg-success-700 dark:hover:bg-success-600 active:bg-success-800 dark:active:bg-success-700 text-white relative overflow-hidden';
        }
        if (isError) {
            return 'bg-error-600 dark:bg-error-500 hover:bg-error-700 dark:hover:bg-error-600 active:bg-error-800 dark:active:bg-error-700 text-white relative overflow-hidden';
        }
        switch (variant) {
            case 'primary':
                return 'bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 active:bg-primary-800 dark:active:bg-primary-700 text-white relative overflow-hidden';
            case 'gradient':
                return 'gradient-primary-animated hover:shadow-primary-lg text-white relative overflow-hidden';
            case 'secondary':
                return 'bg-white dark:bg-neutral-800 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 active:bg-primary-100 dark:active:bg-primary-900/50 text-primary-600 dark:text-primary-400 relative overflow-hidden';
            case 'outline':
                return 'bg-transparent border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 active:bg-primary-100 dark:active:bg-primary-900/50 text-primary-600 dark:text-primary-400 relative overflow-hidden';
            case 'ghost':
                return 'bg-transparent hover:bg-primary-50 dark:hover:bg-primary-900/30 active:bg-primary-100 dark:active:bg-primary-900/50 text-primary-600 dark:text-primary-400 relative overflow-hidden';
            default:
                return 'bg-primary-600 dark:bg-primary-500 text-white relative overflow-hidden';
        }
    };
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-4 py-2 min-h-[48px] text-sm';
            case 'md':
                return 'px-6 py-3 min-h-[48px] text-base';
            case 'lg':
                return 'px-8 py-4 min-h-[52px] text-lg';
            default:
                return 'px-6 py-3 min-h-[48px] text-base';
        }
    };
    const baseClasses = `flex flex-row items-center justify-center radius-button font-semibold transition-all duration-300 ease-out focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed contain-layout animate-optimized hover-scale ${magnetic ? 'magnetic' : ''}`;
    const hoverClasses = !isDisabled ? 'hover:shadow-md dark:hover:shadow-dark-md active:scale-[0.98]' : '';
    return (<button ref={buttonRef} className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${hoverClasses} ${className}`} onClick={handleClick} disabled={isDisabled} data-testid={testID} aria-busy={isLoading} aria-disabled={isDisabled} {...props}>
      {ripples.map((ripple) => (<span key={ripple.id} className="absolute rounded-full bg-white/50 dark:bg-white/30 ripple pointer-events-none" style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                width: '0',
                height: '0',
                transform: 'translate(-50%, -50%)',
                animation: 'ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}/>))}
      {isLoading ? (<>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          {loadingProgress !== undefined ? (<span className="flex items-center gap-2">
              <span>Загрузка...</span>
              <span className="text-xs opacity-75">{loadingProgress}%</span>
            </span>) : (<span>Загрузка...</span>)}
          {loadingProgress !== undefined && (<div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-lg overflow-hidden">
              <div className="h-full bg-white/60 progress-bar-animated" style={{ width: `${loadingProgress}%` }}/>
            </div>)}
        </>) : isSuccess ? (<span className="relative z-10 flex items-center gap-2">
          <span className="success-check">✓</span>
          <span>{displayText}</span>
        </span>) : isError ? (<span className="relative z-10 flex items-center gap-2">
          <span>✕</span>
          <span>{displayText}</span>
        </span>) : (<span className="relative z-10">{displayText}</span>)}
    </button>);
};
export default Button;
