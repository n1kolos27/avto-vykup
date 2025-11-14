/**
 * State Management System - Store
 * 
 * Централизованное управление состоянием
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

/**
 * Глобальное состояние приложения
 */
interface AppState {
  // UI состояние
  ui: {
    isMenuOpen: boolean;
    isChatOpen: boolean;
    theme: 'light' | 'dark';
  };
  // Формы
  forms: {
    evaluation: {
      data: Record<string, unknown>;
      errors: Record<string, string>;
      isSubmitting: boolean;
    };
    contact: {
      data: Record<string, unknown>;
      errors: Record<string, string>;
      isSubmitting: boolean;
    };
  };
  // Пользователь
  user: {
    phone?: string;
    name?: string;
  } | null;
}

/**
 * Действия для изменения состояния
 */
interface AppActions {
  // UI actions
  setMenuOpen: (open: boolean) => void;
  setChatOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Form actions
  setEvaluationFormData: (data: Record<string, unknown>) => void;
  setEvaluationFormErrors: (errors: Record<string, string>) => void;
  setEvaluationFormSubmitting: (isSubmitting: boolean) => void;
  
  setContactFormData: (data: Record<string, unknown>) => void;
  setContactFormErrors: (errors: Record<string, string>) => void;
  setContactFormSubmitting: (isSubmitting: boolean) => void;
  
  // User actions
  setUser: (user: { phone?: string; name?: string } | null) => void;
}

type AppContextType = AppState & AppActions;

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Провайдер состояния приложения
 */
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    ui: {
      isMenuOpen: false,
      isChatOpen: false,
      theme: 'light',
    },
    forms: {
      evaluation: {
        data: {},
        errors: {},
        isSubmitting: false,
      },
      contact: {
        data: {},
        errors: {},
        isSubmitting: false,
      },
    },
    user: null,
  });

  const actions: AppActions = {
    setMenuOpen: useCallback((open: boolean) => {
      setState((prev) => ({
        ...prev,
        ui: { ...prev.ui, isMenuOpen: open },
      }));
    }, []),

    setChatOpen: useCallback((open: boolean) => {
      setState((prev) => ({
        ...prev,
        ui: { ...prev.ui, isChatOpen: open },
      }));
    }, []),

    setTheme: useCallback((theme: 'light' | 'dark') => {
      setState((prev) => ({
        ...prev,
        ui: { ...prev.ui, theme },
      }));
    }, []),

    setEvaluationFormData: useCallback((data: Record<string, unknown>) => {
      setState((prev) => ({
        ...prev,
        forms: {
          ...prev.forms,
          evaluation: { ...prev.forms.evaluation, data },
        },
      }));
    }, []),

    setEvaluationFormErrors: useCallback((errors: Record<string, string>) => {
      setState((prev) => ({
        ...prev,
        forms: {
          ...prev.forms,
          evaluation: { ...prev.forms.evaluation, errors },
        },
      }));
    }, []),

    setEvaluationFormSubmitting: useCallback((isSubmitting: boolean) => {
      setState((prev) => ({
        ...prev,
        forms: {
          ...prev.forms,
          evaluation: { ...prev.forms.evaluation, isSubmitting },
        },
      }));
    }, []),

    setContactFormData: useCallback((data: Record<string, unknown>) => {
      setState((prev) => ({
        ...prev,
        forms: {
          ...prev.forms,
          contact: { ...prev.forms.contact, data },
        },
      }));
    }, []),

    setContactFormErrors: useCallback((errors: Record<string, string>) => {
      setState((prev) => ({
        ...prev,
        forms: {
          ...prev.forms,
          contact: { ...prev.forms.contact, errors },
        },
      }));
    }, []),

    setContactFormSubmitting: useCallback((isSubmitting: boolean) => {
      setState((prev) => ({
        ...prev,
        forms: {
          ...prev.forms,
          contact: { ...prev.forms.contact, isSubmitting },
        },
      }));
    }, []),

    setUser: useCallback((user: { phone?: string; name?: string } | null) => {
      setState((prev) => ({
        ...prev,
        user,
      }));
    }, []),
  };

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Хук для использования состояния приложения
 */
export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}

