import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface AnalyticsData {
  location?: { country: string; lat: number; lon: number } | null;
  device?: string;
  browser?: string;
  trafficSource?: string;
}

// Track page entry time for duration calculation
const pageStartTimes = new Map<string, number>();

export async function trackPageVisit(pathname: string, courseId?: string, data: AnalyticsData = {}) {
  if (!pathname) {
    console.warn('trackPageVisit: Pathname is required, skipping');
    return;
  }

  const sessionId = sessionStorage.getItem('sessionId') || uuidv4();
  sessionStorage.setItem('sessionId', sessionId);

  // Store page start time for duration tracking
  pageStartTimes.set(pathname, Date.now());

  try {
    const payload = {
      type: 'visit',
      sessionId,
      path: pathname,
      courseId,
      timestamp: new Date().toISOString(),
      ...data,
    };

    const response = await axios.post('/api/analytics/track', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('trackPageVisit: Success', response.data);
  } catch (error: any) {
    console.error('trackPageVisit: Failed to send event', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
}

export async function trackClick(
  elementType: string,
  elementText: string,
  href?: string,
  courseId?: string,
  data: AnalyticsData = {}
) {
  if (!elementType || !elementText) {
    console.warn('trackClick: elementType and elementText are required, skipping');
    return;
  }

  const sessionId = sessionStorage.getItem('sessionId') || uuidv4();
  sessionStorage.setItem('sessionId', sessionId);

  try {
    const payload = {
      type: 'click',
      sessionId,
      elementType,
      elementText,
      href,
      courseId,
      timestamp: new Date().toISOString(),
      ...data,
    };

    const response = await axios.post('/api/analytics/track', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('trackClick: Success', response.data);
  } catch (error: any) {
    console.error('trackClick: Failed to send event', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
}

// Enhanced duration tracking - call this when user leaves a page
export async function trackPageExit(pathname: string, courseId?: string) {
  if (!pathname) {
    console.warn('trackPageExit: Pathname is required, skipping');
    return;
  }

  const startTime = pageStartTimes.get(pathname);
  if (!startTime) {
    console.warn('trackPageExit: No start time found for pathname', pathname);
    return;
  }

  const duration = Math.round((Date.now() - startTime) / 1000); // Convert to seconds
  pageStartTimes.delete(pathname); // Clean up

  await trackDuration(pathname, duration, courseId);
}

export async function trackDuration(pathname: string, duration: number, courseId?: string) {
  if (!pathname || !Number.isFinite(duration) || duration < 0) {
    console.warn('trackDuration: Valid pathname and duration are required, skipping', { pathname, duration });
    return;
  }

  const sessionId = sessionStorage.getItem('sessionId') || uuidv4();
  sessionStorage.setItem('sessionId', sessionId);

  try {
    const payload = {
      type: 'duration',
      sessionId,
      path: pathname,
      duration: Math.round(duration),
      courseId,
      timestamp: new Date().toISOString(),
    };

    const response = await axios.post('/api/analytics/track', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('trackDuration: Success', response.data);
  } catch (error: any) {
    console.error('trackDuration: Failed to send event', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
}

// Utility to track page visibility changes for more accurate duration
export function setupPageVisibilityTracking() {
  let visibilityStart = Date.now();
  
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Page became hidden - pause timing
      const currentPath = window.location.pathname;
      const startTime = pageStartTimes.get(currentPath);
      if (startTime) {
        const activeTime = Date.now() - visibilityStart;
        pageStartTimes.set(currentPath, startTime + activeTime);
      }
    } else {
      // Page became visible - resume timing
      visibilityStart = Date.now();
    }
  });
  
  // Track page unload
  window.addEventListener('beforeunload', () => {
    const currentPath = window.location.pathname;
    trackPageExit(currentPath);
  });
}