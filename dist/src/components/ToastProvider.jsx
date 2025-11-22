import React, { useEffect, useState } from 'react';
import ToastComponent from './ui/Toast.js';
import { subscribeToToasts, removeToast } from '../lib/toast.js';
const ToastProvider = () => {
    const [toasts, setToasts] = useState([]);
    useEffect(() => {
        const unsubscribe = subscribeToToasts((newToasts) => {
            setToasts(newToasts);
        });
        return unsubscribe;
    }, []);
    if (toasts.length === 0) {
        return null;
    }
    return (<div className="fixed top-5 left-4 right-4 z-[9999] flex flex-col items-stretch pointer-events-none">
      {toasts.map((toast) => (<ToastComponent key={toast.id} toast={toast} onClose={removeToast}/>))}
    </div>);
};
export default ToastProvider;
