import React from 'react';
import Button from './Button.js';
const EmptyState = ({ title, description, icon, actionLabel, onAction, variant = 'default', }) => {
    const getIcon = () => {
        if (icon)
            return icon;
        switch (variant) {
            case 'error':
                return <span className="text-6xl mb-4">⚠️</span>;
            case 'info':
                return <span className="text-6xl mb-4">ℹ️</span>;
            default:
                return <span className="text-6xl mb-4">📭</span>;
        }
    };
    const getVariantClasses = () => {
        switch (variant) {
            case 'error':
                return 'text-error-600 dark:text-error-400';
            case 'info':
                return 'text-info-600 dark:text-info-400';
            default:
                return 'text-neutral-600 dark:text-neutral-400';
        }
    };
    return (<div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className={getVariantClasses()}>
        {getIcon()}
      </div>
      <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        {title}
      </h3>
      {description && (<p className="text-base text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
          {description}
        </p>)}
      {actionLabel && onAction && (<Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>)}
    </div>);
};
export default EmptyState;
