let toastIdCounter = 0;
let toastListeners = [];
let currentToasts = [];
function notifyListeners() {
    toastListeners.forEach((listener) => listener([...currentToasts]));
}
export function showToast(message, type = 'info', duration = 5000) {
    const id = `toast-${++toastIdCounter}-${Date.now()}`;
    const toast = {
        id,
        type,
        message,
        duration,
    };
    currentToasts.push(toast);
    notifyListeners();
    return id;
}
export function removeToast(id) {
    currentToasts = currentToasts.filter((toast) => toast.id !== id);
    notifyListeners();
}
export function subscribeToToasts(callback) {
    toastListeners.push(callback);
    callback([...currentToasts]);
    return () => {
        toastListeners = toastListeners.filter((listener) => listener !== callback);
    };
}
// Удобные функции для разных типов уведомлений
export const toast = {
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration || 7000),
    info: (message, duration) => showToast(message, 'info', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
};
