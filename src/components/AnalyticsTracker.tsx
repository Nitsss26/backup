
'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useParams, useSearchParams } from 'next/navigation';
import clientLogger from '@/lib/clientLogger';

const trackUtmHit = async (source: string) => {
    try {
        console.log(`[FRONTEND TRACKER] Found UTM source, firing dedicated event: ${source}`);
        // Use keepalive to ensure the request is sent even if the page is being unloaded.
        await fetch('/api/analytics/track-utm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source }),
            keepalive: true,
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
  const utmTrackedRef = useRef(false); // Ref to prevent duplicate tracking in React StrictMode

  useEffect(() => {
    // --- Direct UTM Tracking ---
    const utmSource = searchParams.get('utm_source');

    // Only track if a source exists and it hasn't been tracked for this page load yet.
    if (utmSource && !utmTrackedRef.current) {
      trackUtmHit(utmSource);
      utmTrackedRef.current = true; // Set the flag to true after tracking
    }
    
    // --- Existing Session-based Tracking (for other analytics) ---
    // This part remains for other analytics like page duration, clicks, etc.
    const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId);

    let courseId: string | undefined;
    if (params?.id && pathname.startsWith('/courses/') && /^[0-9a-fA-F]{24}$/.test(params.id.toString())) {
      courseId = params.id.toString();
    }
    
    const referrer = document.referrer || 'Direct';
    const determinedTrafficSource = utmSource || (new URL(document.referrer || 'http://localhost').hostname);

    const trackSessionEvent = async (eventPayload: Record<string, any>) => {
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
    
    trackSessionEvent({ type: 'visit' });

  }, [pathname, params, searchParams]);

  return null;
}
