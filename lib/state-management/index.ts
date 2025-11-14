/**
 * State Management System
 * 
 * Централизованное управление состоянием приложения.
 * 
 * @module lib/state-management
 */

// Store
export * from './store';

// Hooks
export * from './hooks';

// Re-export commonly used
export { AppStateProvider, useAppState } from './store';
export { useUI, useEvaluationForm, useContactForm, useUser } from './hooks';

