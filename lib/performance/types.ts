/**
 * Performance Monitoring System - Types
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

export interface CoreWebVitals {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

