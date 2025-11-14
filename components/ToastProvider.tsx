'use client';

import { useEffect, useState } from 'react';
import ToastContainer from './ui/Toast';
import { subscribeToToasts, removeToast, Toast } from '@/lib/toast';

export default function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts((newToasts) => {
      setToasts(newToasts);
    });

    return unsubscribe;
  }, []);

  return <ToastContainer toasts={toasts} onClose={removeToast} />;
}

