/**
 * Analytics System - Goals Tracking
 *
 * Отслеживание целей и KPI
 */

import { trackEvent } from './google-analytics';
// trackEventYandex не используется, удален импорт

export type GoalType =
  | 'phone_call'
  | 'form_submit'
  | 'chat_message'
  | 'page_view'
  | 'time_on_site'
  | 'scroll_depth'
  | 'button_click';

export interface GoalEvent {
  goalType: GoalType;
  goalName: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Отслеживание достижения цели
 */
export function trackGoal(event: GoalEvent): void {
  const { goalType, goalName, value, metadata } = event;

  // Google Analytics
  trackEvent({
    action: 'goal',
    category: 'goal',
    label: `${goalName}_${goalType}`,
    value,
    ...metadata,
  });

  // Yandex Metrika - достижение цели
  if (typeof window !== 'undefined' && window.ym) {
    const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
    if (YANDEX_METRIKA_ID) {
      const id = parseInt(YANDEX_METRIKA_ID, 10);
      if (!isNaN(id)) {
        window.ym(id, 'reachGoal', `goal_${goalName}_${goalType}`, {
          value,
          ...metadata,
        });
      }
    }
  }
}

/**
 * Предустановленные цели
 */
export const Goals = {
  // Конверсии
  PHONE_CALL: (phone: string, location?: string) => trackGoal({
    goalType: 'phone_call',
    goalName: 'phone_click',
    metadata: { phone, location },
  }),

  FORM_SUBMIT: (formType: string) => trackGoal({
    goalType: 'form_submit',
    goalName: 'form_submission',
    metadata: { form_type: formType },
  }),

  CHAT_MESSAGE: () => trackGoal({
    goalType: 'chat_message',
    goalName: 'chat_interaction',
  }),

  // Вовлеченность
  PAGE_VIEW: (path: string) => trackGoal({
    goalType: 'page_view',
    goalName: 'page_engagement',
    metadata: { path },
  }),

  TIME_ON_SITE: (seconds: number) => trackGoal({
    goalType: 'time_on_site',
    goalName: 'engagement_time',
    value: seconds,
  }),

  SCROLL_DEPTH: (depth: number) => trackGoal({
    goalType: 'scroll_depth',
    goalName: 'content_engagement',
    value: depth,
  }),

  BUTTON_CLICK: (buttonName: string, location: string) => trackGoal({
    goalType: 'button_click',
    goalName: 'cta_click',
    metadata: { button: buttonName, location },
  }),
} as const;
