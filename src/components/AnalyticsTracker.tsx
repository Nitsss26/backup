
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
  type: 'visit' | 'click' | 'duration' | 'scroll';
  sessionId: string;
  path: string;
  timestamp: string;
  duration?: number;
  geoData: GeoData;
  device: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  browser: 'Chrome' | 'Firefox' | 'Other' | 'unknown';
  referrer: string;
  trafficSource: 'Google' | 'LinkedIn' | 'Instagram' | 'X' | 'YouTube' | 'Facebook' | 'Direct' | 'Other Referral' | 'Unknown';
  courseId?: string;
  elementType?: 'button' | 'a';
  elementText?: string;
  href?: string;
  details?: Record<string, any>;
}

const getTrafficSource = (referrer: string): AnalyticsEvent['trafficSource'] => {
  if (!referrer) {
    return 'Direct';
  }
  try {
    const referrerUrl = new URL(referrer);
    // Use NEXT_PUBLIC_APP_URL for the app's hostname, default to localhost for dev
    const appHostname = new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9003').hostname;

    if (referrerUrl.hostname.includes(appHostname)) {
        return 'Direct'; // Internal navigation
    }
    
    const hostname = referrerUrl.hostname.toLowerCase();

    if (hostname.includes('google.')) return 'Google';
    if (hostname.includes('linkedin.com')) return 'LinkedIn';
    if (hostname.includes('instagram.com')) return 'Instagram';
    if (hostname.includes('t.co') || hostname.includes('x.com') || hostname.includes('twitter.com')) return 'X';
    if (hostname.includes('youtube.com')) return 'YouTube';
    if (hostname.includes('facebook.com')) return 'Facebook';
    
    return 'Other Referral';
  } catch (error) {
    console.warn("Could not parse referrer URL on client:", referrer, error);
    return 'Unknown';
  }
};


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
    
    // Prioritize `_ref` for testing, then fall back to document.referrer
    const referrer = searchParams.get('_ref') || document.referrer;
    const trafficSource = getTrafficSource(referrer);

    const getAnalyticsData = async (): Promise<Omit<AnalyticsEvent, 'type' | 'path' | 'timestamp' | 'duration' | 'courseId' | 'elementType' | 'elementText' | 'href' | 'sessionId' | 'referrer' | 'trafficSource' | 'details'>> => {
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
        const fullEvent: AnalyticsEvent = {
            ...baseData,
            ...eventPayload,
            sessionId,
            path: pathname,
            timestamp: new Date().toISOString(),
            courseId,
            referrer,
            trafficSource,
        } as AnalyticsEvent;
        
        const blob = new Blob([JSON.stringify(fullEvent)], { type: 'application/json' });
        navigator.sendBeacon('/api/analytics/track', blob);
        
        clientLogger.info('AnalyticsTracker: Sent event via Beacon', { event: fullEvent });
      
      } catch (error) {
        clientLogger.error('AnalyticsTracker: Failed to send event', {
          error: (error as Error).message,
          event: eventPayload,
        });
      }
    };
    
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
        startTimeRef.current = null;
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [pathname, params, searchParams]);

  return null;
}
