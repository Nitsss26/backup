
'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useParams, useSearchParams } from 'next/navigation';
import clientLogger from '@/lib/clientLogger';

// This tracker now has two responsibilities:
// 1. Fire a simple, direct event for every `utm_source` hit.
// 2. Continue to track session-based events for other analytics.

const trackUtmHit = async (source: string) => {
    try {
        console.log(`[FRONTEND TRACKER] Found UTM source, firing dedicated event: ${source}`);
        await fetch('/api/analytics/track-utm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source }),
            keepalive: true, // Ensures the request is sent even if the page is being unloaded.
        });
    } catch (error) {
        clientLogger.error('AnalyticsTracker: Failed to send UTM event', {
            error: (error as Error).message,
            source: source,
        });
    }
};

export function AnalyticsTracker() {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    // --- New Direct UTM Tracking ---
    const utmSource = searchParams.get('utm_source');
    if (utmSource) {
      trackUtmHit(utmSource);
    }
    // --- End of New Direct UTM Tracking ---


    // --- Existing Session-based Tracking (for other analytics) ---
    const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId);

    let courseId: string | undefined;
    if (params?.id && pathname.startsWith('/courses/') && /^[0-9a-fA-F]{24}$/.test(params.id.toString())) {
      courseId = params.id.toString();
    }
    
    const referrer = document.referrer;
    
    // The main traffic source for the session is now set here and passed around
    const determinedTrafficSource = utmSource || (referrer ? new URL(referrer).hostname : 'Direct');

    const trackEvent = async (eventPayload: Record<string, any>) => {
      try {
        const fullEvent = {
            ...eventPayload,
            sessionId,
            path: pathname,
            timestamp: new Date().toISOString(),
            courseId,
            referrer,
            trafficSource: determinedTrafficSource,
        };
        
        console.log('[FRONTEND TRACKER] Sending session event:', fullEvent);
        
        const blob = new Blob([JSON.stringify(fullEvent)], { type: 'application/json' });
        navigator.sendBeacon('/api/analytics/track', blob);
      
      } catch (error) {
        clientLogger.error('AnalyticsTracker: Failed to send session event', {
          error: (error as Error).message,
          event: eventPayload,
        });
      }
    };
    
    trackEvent({ type: 'visit' });

  }, [pathname, params, searchParams]);

  return null;
}
