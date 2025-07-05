'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useParams } from 'next/navigation';
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
  duration: number;
  geoData: GeoData;
  device: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  browser: 'Chrome' | 'Firefox' | 'Other' | 'unknown';
  trafficSource: 'social_media' | 'organic_search' | 'referral' | 'direct' | 'unknown';
  courseId?: string;
  elementType?: 'button' | 'a';
  elementText?: string;
  href?: string;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const params = useParams();
  const startTimeRef = useRef<number | null>(null);
  const hasTrackedDurationRef = useRef(false);

  useEffect(() => {
    if (!pathname) {
      clientLogger.warn('AnalyticsTracker: Pathname is undefined, skipping tracking');
      return;
    }

    const sessionId = crypto.randomUUID();
    let courseId: string | undefined;
    if (params?.id && pathname.startsWith('/courses/') && /^[0-9a-fA-F]{24}$/.test(params.id.toString())) {
      courseId = params.id.toString();
    }

    const getAnalyticsData = async (): Promise<{
      geoData: GeoData;
      device: AnalyticsEvent['device'];
      browser: AnalyticsEvent['browser'];
      trafficSource: AnalyticsEvent['trafficSource'];
    }> => {
      try {
        const geoRes = await fetch('https://ip-api.com/json', { cache: 'no-store' });
        let geoData: GeoData = { country: 'unknown', city: 'unknown', state: 'unknown', lat: 0, lng: 0 };
        if (geoRes.ok) {
          const data = await geoRes.json();
          clientLogger.info('AnalyticsTracker: ip-api.com response', { data });
          geoData = {
            country: data.country || 'unknown',
            city: data.city || 'unknown',
            state: data.regionName || 'unknown',
            lat: data.lat || 0,
            lng: data.lon || 0,
          };
        } else {
          clientLogger.warn('AnalyticsTracker: ip-api.com request failed', { status: geoRes.status });
        }

        const device = /mobile/i.test(navigator.userAgent)
          ? 'mobile'
          : /tablet/i.test(navigator.userAgent)
          ? 'tablet'
          : 'desktop';
        const browser = navigator.userAgent.includes('Chrome')
          ? 'Chrome'
          : navigator.userAgent.includes('Firefox')
          ? 'Firefox'
          : 'Other';
        const trafficSource = document.referrer.includes('instagram.com')
          ? 'social_media'
          : document.referrer.includes('google.com')
          ? 'organic_search'
          : document.referrer
          ? 'referral'
          : 'direct';

        return { geoData, device, browser, trafficSource };
      } catch (geoError) {
        clientLogger.error('AnalyticsTracker: Failed to fetch geo data', { error: (geoError as Error).message });
        return {
          geoData: { country: 'unknown', city: 'unknown', state: 'unknown', lat: 0, lng: 0 },
          device: 'unknown',
          browser: 'unknown',
          trafficSource: 'unknown',
        };
      }
    };

    const trackEvent = async (event: AnalyticsEvent) => {
      try {
        clientLogger.info('AnalyticsTracker: Sending event', { event });
        const response = await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        clientLogger.info('AnalyticsTracker: Event tracked successfully', {
          sessionId,
          path: event.path,
          type: event.type,
        });
      } catch (error) {
        clientLogger.error('AnalyticsTracker: Failed to send event', {
          error: (error as Error).message,
          event,
        });
      }
    };

    startTimeRef.current = Date.now();
    getAnalyticsData().then((data) => {
      const event: AnalyticsEvent = {
        type: 'visit',
        sessionId,
        path: pathname,
        timestamp: new Date().toISOString(),
        duration: 0,
        geoData: data.geoData,
        device: data.device,
        browser: data.browser,
        trafficSource: data.trafficSource,
        courseId,
      };
      trackEvent(event);
    });

    const handleClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        const data = await getAnalyticsData();
        const elementType = target.tagName.toLowerCase() as 'button' | 'a';
        const elementText = target.textContent?.trim() || 'Unknown';
        const href = target.getAttribute('href') || undefined;
        let clickCourseId = courseId;
        if (!clickCourseId && href?.startsWith('/courses/')) {
          const match = href.match(/\/courses\/([0-9a-fA-F]{24})/);
          clickCourseId = match?.[1];
        }

        const clickEvent: AnalyticsEvent = {
          type: 'click',
          sessionId,
          path: pathname,
          timestamp: new Date().toISOString(),
          duration: 0,
          geoData: data.geoData,
          device: data.device,
          browser: data.browser,
          trafficSource: data.trafficSource,
          courseId: clickCourseId,
          elementType,
          elementText,
          href,
        };
        trackEvent(clickEvent);
      }
    };

    window.addEventListener('click', handleClick);

    const handleBeforeUnload = () => {
      if (startTimeRef.current && Number.isFinite(startTimeRef.current) && !hasTrackedDurationRef.current) {
        const duration = (Date.now() - startTimeRef.current) / 1000;
        if (Number.isFinite(duration) && duration >= 0) {
          hasTrackedDurationRef.current = true;
          getAnalyticsData().then((data) => {
            const durationEvent: AnalyticsEvent = {
              type: 'duration',
              sessionId,
              path: pathname,
              timestamp: new Date().toISOString(),
              duration,
              geoData: data.geoData,
              device: data.device,
              browser: data.browser,
              trafficSource: data.trafficSource,
              courseId,
            };
            trackEvent(durationEvent);
          });
        }
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, params]);

  return null;
}
