'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useParams, useSearchParams } from 'next/navigation';
import clientLogger from '@/lib/clientLogger';

interface GeoData {
  country: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

interface AnalyticsEvent {
  type: 'visit' | 'click' | 'duration';
  sessionId: string;
  path: string;
  timestamp: string;
  duration?: number;
  geoData: GeoData;
  device: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  browser: 'Chrome' | 'Firefox' | 'Other' | 'unknown';
  referrer: string;
  courseId?: string;
  elementType?: 'button' | 'a';
  elementText?: string;
  href?: string;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!pathname) {
      clientLogger.warn('AnalyticsTracker: Pathname is undefined, skipping tracking');
      return;
    }

    const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId);

    let courseId: string | undefined;
    if (params?.id && pathname.startsWith('/courses/') && /^[0-9a-fA-F]{24}$/.test(params.id.toString())) {
      courseId = params.id.toString();
    }
    
    // Test referrer override, otherwise use the real one.
    const referrer = searchParams.get('_ref') || document.referrer;

    const getAnalyticsData = async (): Promise<Omit<AnalyticsEvent, 'type' | 'path' | 'timestamp' | 'duration' | 'courseId' | 'elementType' | 'elementText' | 'href' | 'sessionId' | 'referrer'>> => {
      try {
        const geoRes = await fetch('https://ip-api.com/json', { cache: 'no-store' });
        let geoData: GeoData = { country: 'unknown', city: 'unknown', state: 'unknown', lat: 0, lng: 0 };
        if (geoRes.ok) {
          const data = await geoRes.json();
          geoData = {
            country: data.country || 'unknown',
            city: data.city || 'unknown',
            state: data.regionName || 'unknown',
            lat: data.lat || 0,
            lng: data.lon || 0,
          };
        }

        const device = /mobile/i.test(navigator.userAgent) ? 'mobile' : /tablet/i.test(navigator.userAgent) ? 'tablet' : 'desktop';
        const browser = navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Other';
        
        return { geoData, device, browser };
      } catch (geoError) {
        clientLogger.error('AnalyticsTracker: Failed to fetch geo data', { error: (geoError as Error).message });
        return {
          geoData: { country: 'unknown', city: 'unknown', state: 'unknown', lat: 0, lng: 0 },
          device: 'unknown',
          browser: 'unknown',
        };
      }
    };

    const trackEvent = async (eventPayload: Partial<AnalyticsEvent> & { type: AnalyticsEvent['type'] }) => {
      try {
        const baseData = await getAnalyticsData();
        const fullEvent = {
            ...baseData,
            ...eventPayload,
            sessionId,
            path: pathname,
            timestamp: new Date().toISOString(),
            courseId,
            referrer,
        };
        
        clientLogger.info('AnalyticsTracker: Sending event', { event: fullEvent });
        const response = await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fullEvent),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
      } catch (error) {
        clientLogger.error('AnalyticsTracker: Failed to send event', {
          error: (error as Error).message,
          event: eventPayload,
        });
      }
    };
    
    // Track initial page visit
    startTimeRef.current = Date.now();
    trackEvent({ type: 'visit' });

    const handleClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickableElement = target.closest('a, button');

      if (clickableElement) {
        const elementType = clickableElement.tagName.toLowerCase() as 'button' | 'a';
        const elementText = clickableElement.textContent?.trim() || 'Unknown';
        const href = clickableElement.getAttribute('href') || undefined;
        let clickCourseId = courseId;
        if (!clickCourseId && href?.startsWith('/courses/')) {
          const match = href.match(/\/courses\/([0-9a-fA-F]{24})/);
          clickCourseId = match?.[1];
        }

        trackEvent({
          type: 'click',
          elementType,
          elementText,
          href,
          courseId: clickCourseId
        });
      }
    };

    window.addEventListener('click', handleClick);

    const handleBeforeUnload = () => {
      if (startTimeRef.current) {
        const duration = (Date.now() - startTimeRef.current) / 1000;
        trackEvent({
          type: 'duration',
          duration,
        });
        startTimeRef.current = null; // Prevent re-tracking
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload(); // Ensure duration is tracked on component unmount (e.g., page navigation)
    };
  }, [pathname, params, searchParams]);

  return null;
}
