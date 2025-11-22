import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { trackChatOpen, trackChatMessage } from '../lib/analytics/events.js';
import { APP_CONFIG } from '../lib/config/index.js';
const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const phone1 = APP_CONFIG.PHONE_1;
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);
    const textareaRef = useRef(null);
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
        }
        else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);
    // Handle Escape key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
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
        if (!isOpen || !modalRef.current)
            return;
        const modal = modalRef.current;
        const handleTouchStart = (e) => {
            if (modal.contains(e.target)) {
                isDragging.current = true;
                dragStartY.current = e.touches[0].clientY;
                modal.style.transition = 'none';
            }
        };
        const handleTouchMove = (e) => {
            if (!isDragging.current)
                return;
            dragCurrentY.current = e.touches[0].clientY;
            dragOffset.current = dragCurrentY.current - dragStartY.current;
            if (dragOffset.current > 0) {
                modal.style.transform = `translateY(${dragOffset.current}px)`;
            }
        };
        const handleTouchEnd = () => {
            if (!isDragging.current)
                return;
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
        if (!isOpen || !modalRef.current)
            return;
        const modal = modalRef.current;
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const handleTabKey = (e) => {
            if (e.key !== 'Tab')
                return;
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            }
            else {
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "fixed bottom-5 right-5 w-14 h-14 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center shadow-lg dark:shadow-dark-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors z-[1000]", onClick: handleOpen, "aria-label": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0447\u0430\u0442", children: _jsx("span", { className: "text-2xl", children: "\uD83D\uDCAC" }) }), isOpen && (_jsx("div", { className: "fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md flex items-center justify-center p-5 z-[9999] animate-fade-in", onClick: handleClose, role: "dialog", "aria-modal": "true", "aria-labelledby": "chat-modal-title", children: _jsxs("div", { ref: modalRef, className: "bg-white dark:bg-neutral-800 rounded-2xl w-full max-w-[400px] max-h-[80vh] flex flex-col shadow-2xl dark:shadow-dark-2xl spring-scale", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex flex-row justify-between items-center p-5 border-b border-neutral-200 dark:border-neutral-700", children: [_jsx("h2", { id: "chat-modal-title", className: "text-xl font-bold text-neutral-900 dark:text-neutral-100", children: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C" }), _jsx("button", { ref: closeButtonRef, onClick: handleClose, className: "w-8 h-8 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors focus-ring", "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", children: _jsx("span", { className: "text-2xl text-neutral-600 dark:text-neutral-300", children: "\u2715" }) })] }), _jsxs("div", { className: "p-5 flex-1 overflow-y-auto", children: [_jsx("p", { className: "text-base text-neutral-600 dark:text-neutral-300 mb-4", children: "\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 WhatsApp" }), _jsx("textarea", { ref: textareaRef, className: "w-full border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 text-base text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400 focus:border-primary-600 dark:focus:border-primary-400", value: message, onChange: (e) => setMessage(e.target.value), placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435...", rows: 4, "aria-label": "\u0422\u0435\u043A\u0441\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F" })] }), _jsx("div", { className: "p-5 border-t border-neutral-200 dark:border-neutral-700", children: _jsx("button", { className: "w-full bg-primary-600 dark:bg-primary-500 py-3 px-6 rounded-lg text-white text-base font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors focus-ring min-h-[44px]", onClick: handleSend, disabled: !message.trim(), "aria-label": "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0432 WhatsApp", children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432 WhatsApp" }) })] }) }))] }));
};
export default React.memo(ChatWidget);
