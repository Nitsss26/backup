
'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useParams, useSearchParams } from 'next/navigation';
import clientLogger from '@/lib/clientLogger';

function getSessionId() {
  if (typeof window !== 'undefined') {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }
  return null;
}

// More specific function to get traffic source
const getTrafficSource = (searchParams: URLSearchParams, referrer: string): string => {
  const utmSource = searchParams.get('utm_source');
  if (utmSource) return utmSource.toLowerCase();

  if (!referrer) return 'Direct';

  try {
    const referrerUrl = new URL(referrer);
    // Use NEXT_PUBLIC_APP_URL for the app's hostname, default to localhost for dev
    const appHostname = new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9003').hostname;

    if (referrerUrl.hostname.includes(appHostname)) {
        return 'Direct'; // Internal navigation
    }
    
    const hostname = referrerUrl.hostname.toLowerCase();
    
    if (hostname.includes('google.')) return 'google';
    if (hostname.includes('linkedin.com')) return 'linkedin';
    if (hostname.includes('instagram.com')) return 'instagram';
    if (hostname.includes('t.co') || hostname.includes('x.com') || hostname.includes('twitter.com')) return 'x';
    if (hostname.includes('youtube.com')) return 'youtube';
    if (hostname.includes('facebook.com')) return 'facebook';
    if (hostname.includes('whatsapp.com') || hostname.includes('wa.me')) return 'whatsapp';
    
    return 'Other Referral';
  } catch (e) {
    clientLogger.warn("Could not parse referrer URL:", { referrer, error: e });
    return 'Unknown';
  }
};


export function AnalyticsTracker() {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const trackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    const fullUrl = `${pathname}?${searchParams.toString()}`;
    // Prevent re-tracking on fast re-renders (like in dev mode)
    if (trackedPathRef.current === fullUrl) {
      return;
    }

    const sessionId = getSessionId();
    if (!sessionId) return;

    trackedPathRef.current = fullUrl;

    let courseId: string | undefined;
    if (params?.id && pathname.startsWith('/courses/') && /^[0-9a-fA-F]{24}$/.test(params.id.toString())) {
      courseId = params.id.toString();
    }
    
    const referrer = document.referrer || '';
    const trafficSource = getTrafficSource(searchParams, referrer);
    
    console.log(`[FRONTEND TRACKER] Determined trafficSource: "${trafficSource}"`);

    const trackEvent = async (eventPayload: Record<string, any>) => {
      try {
        const fullEvent = {
            ...eventPayload,
            sessionId,
            path: pathname,
            timestamp: new Date().toISOString(),
            courseId,
            referrer,
            // Pass the determined source from the client
            trafficSource, 
            device: navigator.userAgent.includes('Mobi') ? 'Mobile' : 'Desktop',
            browser: navigator.userAgent,
        };
        
        console.log('[FRONTEND TRACKER] Sending event:', fullEvent);
        
        // Use sendBeacon for robustness on page exit
        const blob = new Blob([JSON.stringify(fullEvent)], { type: 'application/json' });
        navigator.sendBeacon('/api/analytics/track', blob);
      
      } catch (error) {
        clientLogger.error('AnalyticsTracker: Failed to send event', {
          error: (error as Error).message,
          event: eventPayload,
        });
      }
    };
    
    // Track the initial visit event
    trackEvent({ type: 'visit' });
    
    // Setup duration tracking on page exit
    const handlePageExit = () => {
        trackEvent({ type: 'duration', duration: 0 }); // Duration will be calculated on backend
    }
    window.addEventListener('beforeunload', handlePageExit)

    return () => {
        window.removeEventListener('beforeunload', handlePageExit)
    }

  }, [pathname, params, searchParams]);

  return null;
}
