import React, { useEffect, useRef, ReactNode } from 'react';
import { initMagnetic } from '../../lib/magnetic.js';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  magnetic?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  magnetic = false,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Focus first element
    setTimeout(() => {
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  // Magnetic effect
  useEffect(() => {
    if (magnetic && modalRef.current && isOpen) {
      const cleanup = initMagnetic(modalRef.current, { strength: 0.1 });
      return cleanup;
    }
  }, [magnetic, isOpen]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-[400px]',
    md: 'max-w-[500px]',
    lg: 'max-w-[700px]',
    xl: 'max-w-[900px]',
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md flex items-center justify-center p-5 z-[9999] animate-fade-in"
      onClick={closeOnBackdropClick ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        className={`bg-white dark:bg-neutral-800 rounded-2xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col shadow-2xl dark:shadow-dark-2xl spring-scale ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex flex-row justify-between items-center p-5 border-b border-neutral-200 dark:border-neutral-700">
            <h2 id="modal-title" className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {title}
            </h2>
            {showCloseButton && (
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors focus-ring"
                aria-label="Закрыть"
              >
                <span className="text-2xl text-neutral-600 dark:text-neutral-300">✕</span>
              </button>
            )}
          </div>
        )}

        <div className="p-5 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

