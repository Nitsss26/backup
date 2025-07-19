
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

const getTrafficSourceFromReferrer = (referrer: string): string => {
  if (!referrer) return 'Direct';

  try {
    const referrerUrl = new URL(referrer);
    const appHostname = new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9003').hostname;

    if (referrerUrl.hostname.includes(appHostname)) {
        return 'Direct';
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
  const pageViewRef = useRef(false);

  useEffect(() => {
    // This effect should only run once per component mount on the client.
    if (pageViewRef.current) return;
    pageViewRef.current = true;

    const sessionId = getSessionId();
    if (!sessionId) return;

    let courseId: string | undefined;
    if (params?.id && pathname.startsWith('/courses/') && /^[0-9a-fA-F]{24}$/.test(params.id.toString())) {
      courseId = params.id.toString();
    }
    
    const referrer = document.referrer || '';
    
    // --- UTM Tracking Logic ---
    const utmSource = searchParams.get('utm_source');
    if (utmSource) {
        // Direct call to the dedicated UTM tracking API
        fetch('/api/analytics/track-utm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source: utmSource }),
            keepalive: true,
        }).catch(error => {
            clientLogger.error('AnalyticsTracker: Failed to send UTM event', {
                error: (error as Error).message,
                source: utmSource,
            });
        });
    }

    const trafficSource = utmSource || getTrafficSourceFromReferrer(referrer);

    const trackEvent = async (eventPayload: Record<string, any>) => {
      try {
        const fullEvent = {
            ...eventPayload,
            sessionId,
            path: pathname,
            timestamp: new Date().toISOString(),
            courseId,
            referrer,
            trafficSource,
            device: navigator.userAgent.includes('Mobi') ? 'Mobile' : 'Desktop',
            browser: navigator.userAgent,
        };
        
        console.log('[FRONTEND TRACKER] Sending event:', fullEvent);
        
        const blob = new Blob([JSON.stringify(fullEvent)], { type: 'application/json' });
        navigator.sendBeacon('/api/analytics/track', blob);
      
      } catch (error) {
        clientLogger.error('AnalyticsTracker: Failed to send event', {
          error: (error as Error).message,
          event: eventPayload,
        });
      }
    };
    
    trackEvent({ type: 'visit' });
    
    const handlePageExit = () => {
        trackEvent({ type: 'duration', duration: 0 });
    }
    window.addEventListener('beforeunload', handlePageExit)

    return () => {
        window.removeEventListener('beforeunload', handlePageExit)
    }

  }, [pathname, params, searchParams]);

  return null;
}
