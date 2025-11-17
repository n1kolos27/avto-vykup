'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { trackChatOpen, trackChatMessage } from '@/lib/analytics/events';
import { APP_CONFIG } from '@/lib/config';
import { getReducedMotionConfig } from '@/lib/utils/accessibility';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const phone1 = APP_CONFIG.PHONE_1;
  // phone2 не используется

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    trackChatOpen();
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    // Return focus to previous element
    if (previousActiveElementRef.current) {
      previousActiveElementRef.current.focus();
      previousActiveElementRef.current = null;
    }
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      const text = encodeURIComponent(message);
      trackChatMessage();
      window.open(`https://wa.me/7${phone1.replace(/\D/g, '')}?text=${text}`, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Save current active element
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      // Focus input after animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Слушаем событие открытия чата из Header
  useEffect(() => {
    const handleOpenChat = () => {
      handleOpen();
    };

    window.addEventListener('openChat', handleOpenChat);
    return () => {
      window.removeEventListener('openChat', handleOpenChat);
    };
  }, [handleOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={getReducedMotionConfig({ opacity: 0, y: 20 }, { opacity: 0 })}
            animate={getReducedMotionConfig({ opacity: 1, y: 0 }, { opacity: 1 })}
            exit={getReducedMotionConfig({ opacity: 0, y: 20 }, { opacity: 0 })}
            transition={getReducedMotionConfig({ duration: 0.3 }, { duration: 0 })}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl z-50 border border-gray-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            aria-describedby="chat-description"
          >
            <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <h3 id="chat-title" className="font-semibold">Онлайн-чат</h3>
              <button
                onClick={handleClose}
                className="hover:bg-primary-700 rounded p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Закрыть чат"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>
            <div className="p-4">
              <p id="chat-description" className="text-gray-600 mb-4 text-sm">
                Напишите нам, и мы свяжемся с вами в ближайшее время
              </p>
              <div className="space-y-2 mb-4">
                <a
                  href={`https://wa.me/7${phone1.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px]"
                  aria-label="Открыть WhatsApp чат"
                >
                  <span className="text-green-600 font-semibold">WhatsApp</span>
                </a>
                <a
                  href={`https://t.me/${phone1.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px]"
                  aria-label="Открыть Telegram чат"
                >
                  <span className="text-blue-600 font-semibold">Telegram</span>
                </a>
              </div>
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Введите сообщение..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px]"
                  aria-label="Поле ввода сообщения"
                />
                <button
                  onClick={handleSend}
                  className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Отправить сообщение"
                  disabled={!message.trim()}
                >
                  <FiSend aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={isOpen ? handleClose : handleOpen}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-w-[56px] min-h-[56px] flex items-center justify-center"
        whileHover={getReducedMotionConfig({ scale: 1.1 }, {})}
        whileTap={getReducedMotionConfig({ scale: 0.9 }, {})}
        aria-label={isOpen ? 'Закрыть чат' : 'Открыть чат'}
        aria-expanded={isOpen}
        aria-controls="chat-widget"
      >
        {isOpen ? <FiX size={24} aria-hidden="true" /> : <FiMessageCircle size={24} aria-hidden="true" />}
      </motion.button>
    </>
  );
}
