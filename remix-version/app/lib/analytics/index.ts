/**
 * Analytics System
 * 
 * Единая система аналитики для всего приложения.
 * Интеграция с Google Analytics и Yandex Metrika.
 * 
 * @module lib/analytics
 */

// Import everything first
import type {
  AnalyticsEvent,
  PageViewParams,
  ConversionType,
} from './types';

import {
  GA_TRACKING_ID,
  initGoogleAnalytics,
  trackPageView,
  trackEvent,
  trackConversion as trackConversionGA,
} from './google-analytics';

import {
  YANDEX_METRIKA_ID,
  initYandexMetrika,
  trackPageViewYandex,
  trackEventYandex,
} from './yandex-metrika';

import {
  trackUniversalEvent,
  trackPhoneClick,
  trackFormSubmit,
  trackChatOpen,
  trackChatMessage,
  trackCTAClick,
  trackScrollDepth,
  trackTimeOnPage,
  trackFormInteraction,
  trackConversion,
} from './events';

import {
  trackFunnelStage,
  trackEvaluationFunnel,
  trackContactFunnel,
  trackFormProgress,
} from './funnels';

import {
  trackGoal,
  Goals,
} from './goals';

// Export types explicitly
export type {
  AnalyticsEvent,
  PageViewParams,
  ConversionType,
};

// Export Google Analytics
export {
  GA_TRACKING_ID,
  initGoogleAnalytics,
  trackPageView,
  trackEvent,
  trackConversionGA,
};

// Export Yandex Metrika
export {
  YANDEX_METRIKA_ID,
  initYandexMetrika,
  trackPageViewYandex,
  trackEventYandex,
};

// Export Event tracking functions
export {
  trackUniversalEvent,
  trackPhoneClick,
  trackFormSubmit,
  trackChatOpen,
  trackChatMessage,
  trackCTAClick,
  trackScrollDepth,
  trackTimeOnPage,
  trackFormInteraction,
  trackConversion,
};

// Export Funnel tracking functions
export {
  trackFunnelStage,
  trackEvaluationFunnel,
  trackContactFunnel,
  trackFormProgress,
};

// Export Goal tracking functions
export {
  trackGoal,
  Goals,
};

