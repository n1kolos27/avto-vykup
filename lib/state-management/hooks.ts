/**
 * State Management System - Hooks
 * 
 * Специализированные хуки для управления состоянием
 */

import { useAppState } from './store';

/**
 * Хук для управления UI состоянием
 */
export function useUI() {
  const { ui, setMenuOpen, setChatOpen, setTheme } = useAppState();
  
  return {
    ...ui,
    setMenuOpen,
    setChatOpen,
    setTheme,
  };
}

/**
 * Хук для управления формой оценки
 */
export function useEvaluationForm() {
  const {
    forms: { evaluation },
    setEvaluationFormData,
    setEvaluationFormErrors,
    setEvaluationFormSubmitting,
  } = useAppState();

  return {
    data: evaluation.data,
    errors: evaluation.errors,
    isSubmitting: evaluation.isSubmitting,
    setData: setEvaluationFormData,
    setErrors: setEvaluationFormErrors,
    setIsSubmitting: setEvaluationFormSubmitting,
  };
}

/**
 * Хук для управления контактной формой
 */
export function useContactForm() {
  const {
    forms: { contact },
    setContactFormData,
    setContactFormErrors,
    setContactFormSubmitting,
  } = useAppState();

  return {
    data: contact.data,
    errors: contact.errors,
    isSubmitting: contact.isSubmitting,
    setData: setContactFormData,
    setErrors: setContactFormErrors,
    setIsSubmitting: setContactFormSubmitting,
  };
}

/**
 * Хук для управления пользователем
 */
export function useUser() {
  const { user, setUser } = useAppState();
  
  return {
    user,
    setUser,
  };
}

