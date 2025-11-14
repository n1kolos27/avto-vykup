/**
 * Performance Monitoring System
 */

import type { PerformanceMetric, CoreWebVitals } from './types';

export function trackMetric(name: string, value: number): void {
  if (typeof window === 'undefined') return;
  
  const metric: PerformanceMetric = {
    name,
    value,
    timestamp: Date.now(),
  };
  
  // Здесь можно отправить метрику в аналитику
  console.log('Performance metric:', metric);
}

export function trackCoreWebVitals(vitals: CoreWebVitals): void {
  if (typeof window === 'undefined') return;
  
  Object.entries(vitals).forEach(([name, value]) => {
    if (value !== undefined) {
      trackMetric(`web-vital-${name}`, value);
    }
  });
}

