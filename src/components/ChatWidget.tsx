import React, { useState, useEffect, useCallback, useRef } from 'react';
import { trackChatOpen, trackChatMessage } from '../lib/analytics/events.js';
import { APP_CONFIG } from '../lib/config/index.js';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const phone1 = APP_CONFIG.PHONE_1;
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dragStartY = useRef(0);
  const dragCurrentY = useRef(0);
  const dragOffset = useRef(0);
  const isDragging = useRef(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    trackChatOpen();
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      const text = encodeURIComponent(message);
      trackChatMessage();
      const phoneNumber = phone1.replace(/\D/g, '');
      window.open(`https://wa.me/7${phoneNumber}?text=${text}`, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleOpenChat = () => {
      handleOpen();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('openChat', handleOpenChat);
      return () => {
        window.removeEventListener('openChat', handleOpenChat);
      };
    }
  }, [handleOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus trap: focus first element when modal opens
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, handleClose]);

  // Drag-to-close for mobile
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;

    const handleTouchStart = (e: TouchEvent) => {
      if (modal.contains(e.target as Node)) {
        isDragging.current = true;
        dragStartY.current = e.touches[0].clientY;
        modal.style.transition = 'none';
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      dragCurrentY.current = e.touches[0].clientY;
      dragOffset.current = dragCurrentY.current - dragStartY.current;

      if (dragOffset.current > 0) {
        modal.style.transform = `translateY(${dragOffset.current}px)`;
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      
      if (modal) {
        modal.style.transition = 'transform 0.3s ease-out';
        modal.style.transform = 'translateY(0)';
      }

      if (dragOffset.current > 100) {
        handleClose();
      }
      dragOffset.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      if (modal) {
        modal.style.transform = '';
        modal.style.transition = '';
      }
    };
  }, [isOpen, handleClose]);

  // Focus trap: keep focus within modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

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
    };

    modal.addEventListener('keydown', handleTabKey);
    return () => {
      modal.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center shadow-lg dark:shadow-dark-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors z-[1000]"
        onClick={handleOpen}
        aria-label="Открыть чат"
      >
        <span className="text-2xl">💬</span>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md flex items-center justify-center p-5 z-[9999] animate-fade-in"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-modal-title"
        >
          <div 
            ref={modalRef}
            className="bg-white dark:bg-neutral-800 rounded-2xl w-full max-w-[400px] max-h-[80vh] flex flex-col shadow-2xl dark:shadow-dark-2xl spring-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row justify-between items-center p-5 border-b border-neutral-200 dark:border-neutral-700">
              <h2 id="chat-modal-title" className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Напишите нам</h2>
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="w-8 h-8 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors focus-ring"
                aria-label="Закрыть"
              >
                <span className="text-2xl text-neutral-600 dark:text-neutral-300">✕</span>
              </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto">
              <p className="text-base text-neutral-600 dark:text-neutral-300 mb-4">
                Отправьте сообщение через WhatsApp
              </p>
              <textarea
                ref={textareaRef}
                className="w-full border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 text-base text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400 focus:border-primary-600 dark:focus:border-primary-400"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Введите ваше сообщение..."
                rows={4}
                aria-label="Текст сообщения"
              />
            </div>

            <div className="p-5 border-t border-neutral-200 dark:border-neutral-700">
              <button
                className="w-full bg-primary-600 dark:bg-primary-500 py-3 px-6 rounded-lg text-white text-base font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors focus-ring min-h-[44px]"
                onClick={handleSend}
                disabled={!message.trim()}
                aria-label="Отправить сообщение в WhatsApp"
              >
                Отправить в WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ChatWidget);
