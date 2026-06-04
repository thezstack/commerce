'use client';

import { useReportWebVitals } from 'next/web-vitals';

type WebVitalsMetric = {
  id: string;
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  navigationType?: string;
};

function reportWebVitals(metric: WebVitalsMetric) {
  window.gtag?.('event', 'web_vital', {
    event_category: 'Web Vitals',
    event_label: metric.id,
    metric_id: metric.id,
    metric_name: metric.name,
    metric_rating: metric.rating,
    metric_value: metric.value,
    navigation_type: metric.navigationType,
    page_path: window.location.pathname,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true
  });
}

export default function WebVitalsReporter() {
  useReportWebVitals(reportWebVitals);

  return null;
}
