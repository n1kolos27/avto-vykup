import type { Toast, ToastType } from '~/components/ui/Toast';

export type { Toast, ToastType };

let toastIdCounter = 0;
let toastListeners: Array<(toasts: Toast[]) => void> = [];
let currentToasts: Toast[] = [];

function notifyListeners(): void {
  toastListeners.forEach((listener) => listener([...currentToasts]));
}

export function showToast(
  message: string,
  type: ToastType = 'info',
  duration: number = 5000
): string {
  const id = `toast-${++toastIdCounter}-${Date.now()}`;
  const toast: Toast = {
    id,
    type,
    message,
    duration,
  };

  currentToasts.push(toast);
  notifyListeners();

  return id;
}

export function removeToast(id: string) {
  currentToasts = currentToasts.filter((toast) => toast.id !== id);
  notifyListeners();
}

export function subscribeToToasts(callback: (toasts: Toast[]) => void): () => void {
  toastListeners.push(callback);
  callback([...currentToasts]);

  return () => {
    toastListeners = toastListeners.filter((listener) => listener !== callback);
  };
}

// Удобные функции для разных типов уведомлений
export const toast = {
  success: (message: string, duration?: number) => showToast(message, 'success', duration),
  error: (message: string, duration?: number) => showToast(message, 'error', duration || 7000),
  info: (message: string, duration?: number) => showToast(message, 'info', duration),
  warning: (message: string, duration?: number) => showToast(message, 'warning', duration),
};
