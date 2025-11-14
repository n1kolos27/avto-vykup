/**
 * Analytics System - Funnel Tracking
 * 
 * Отслеживание воронок продаж и конверсий
 */

import { trackEvent } from './google-analytics';
import { trackEventYandex } from './yandex-metrika';

export type FunnelStage = 
  | 'page_view'
  | 'form_start'
  | 'form_progress'
  | 'form_submit'
  | 'phone_click'
  | 'chat_open'
  | 'conversion';

export interface FunnelEvent {
  stage: FunnelStage;
  funnelName: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Отслеживание этапа воронки
 */
export function trackFunnelStage(event: FunnelEvent): void {
  const { stage, funnelName, value, metadata } = event;

  // Google Analytics
  trackEvent({
    action: 'funnel_stage',
    category: 'funnel',
    label: `${funnelName}_${stage}`,
    value,
    ...metadata,
  });

  // Yandex Metrika
  trackEventYandex({
    action: 'funnel_stage',
    category: 'funnel',
    label: `${funnelName}_${stage}`,
    value,
    ...metadata,
  });
}

/**
 * Отслеживание воронки оценки автомобиля
 */
export function trackEvaluationFunnel(stage: FunnelStage, metadata?: Record<string, unknown>): void {
  trackFunnelStage({
    stage,
    funnelName: 'evaluation',
    metadata,
  });
}

/**
 * Отслеживание воронки контактов
 */
export function trackContactFunnel(stage: FunnelStage, metadata?: Record<string, unknown>): void {
  trackFunnelStage({
    stage,
    funnelName: 'contact',
    metadata,
  });
}

/**
 * Отслеживание прогресса заполнения формы
 */
export function trackFormProgress(
  formName: string,
  progress: number,
  fieldName?: string
): void {
  trackFunnelStage({
    stage: 'form_progress',
    funnelName: formName,
    value: progress,
    metadata: {
      field: fieldName,
      progress_percent: progress,
    },
  });
}

