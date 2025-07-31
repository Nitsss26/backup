
'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import clientLogger from '@/lib/clientLogger';
import { useAuth } from '@/components/AppProviders';
import { debounce } from 'lodash';

// --- Session and User ID Management ---
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server-session';
  let sessionId = sessionStorage.getItem('edtechcart_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem('edtechcart_session_id', sessionId);
  }
  return sessionId;
}

function getUniqueUserId(): string {
  if (typeof window === 'undefined') return 'server-user';
  let userId = localStorage.getItem('edtechcart_unique_user_id');
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem('edtechcart_unique_user_id', userId);
  }
  return userId;
}

// --- Traffic Source Logic ---
const getTrafficSourceFromReferrer = (referrer: string): string => {
  if (!referrer) return 'Direct';
  try {
    const referrerUrl = new URL(referrer);
    if (referrerUrl.hostname.includes(window.location.hostname)) return 'Direct';
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

const sendBeacon = (eventData: Record<string, any>) => {
    try {
        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(eventData)], { type: 'application/json' });
            navigator.sendBeacon('/api/analytics/track', blob);
        } else {
            // Fallback for browsers that don't support sendBeacon
            fetch('/api/analytics/track', {
                method: 'POST',
                body: JSON.stringify(eventData),
                headers: { 'Content-Type': 'application/json' },
                keepalive: true
            });
        }
    } catch(e) {
        console.error("Failed to send analytics data", e);
    }
}


// --- Main Tracker Component ---
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageViewRef = useRef<{ path: string; startTime: number } | null>(null);
  const { user } = useAuth(); // Get authenticated user

  // --- UTM Tracking Function ---
  const trackUTMSource = useCallback(async () => {
    try {
      const utmSource = searchParams.get('utmsource') || searchParams.get('utm_source');
      const sessionId = getSessionId();
      const uniqueUserId = getUniqueUserId();
      
      const utmData = {
        utmSource,
        sessionId,
        userId: user?.id || uniqueUserId,
        path: pathname,
        referrer: document.referrer || ''
      };

      await fetch('/api/analytics/utm-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(utmData),
      });
    } catch (error) {
      clientLogger.error('AnalyticsTracker: Failed to track UTM source', {
        error: (error as Error).message,
      });
    }
  }, [searchParams, user, pathname]);

  // --- Core Tracking Function ---
  const trackEvent = useCallback(async (eventData: Record<string, any>, useBeacon: boolean = false) => {
    try {
      const sessionId = getSessionId();
      const uniqueUserId = getUniqueUserId();
      const referrer = document.referrer || '';
      const utmSource = searchParams.get('utmsource') || searchParams.get('utm_source');
      const trafficSource = utmSource || getTrafficSourceFromReferrer(referrer);
      
      const fullEvent = {
        ...eventData,
        sessionId,
        uniqueUserId,
        userId: user?.id,
        timestamp: new Date().toISOString(),
        device: navigator.userAgent.includes('Mobi') ? 'Mobile' : 'Desktop',
        browser: navigator.userAgent,
        trafficSource,
      };
      
      if (useBeacon) {
          sendBeacon(fullEvent);
      } else {
          await fetch('/api/analytics/track', {
              method: 'POST',
              body: JSON.stringify(fullEvent),
              headers: { 'Content-Type': 'application/json' },
          });
      }

    } catch (error) {
      clientLogger.error('AnalyticsTracker: Failed to send event', {
        error: (error as Error).message,
        event: eventData,
      });
    }
  }, [searchParams, user]);
  
  // --- Scroll Tracking ---
  useEffect(() => {
    const scrollTracker = {
      path: pathname,
      thresholds: { 25: false, 50: false, 75: false, 95: false }
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      
      for (const threshold of [25, 50, 75, 95]) {
          if (scrollPercentage >= threshold && !scrollTracker.thresholds[threshold as keyof typeof scrollTracker.thresholds]) {
              scrollTracker.thresholds[threshold as keyof typeof scrollTracker.thresholds] = true;
              trackEvent({
                  type: 'scroll',
                  details: { path: scrollTracker.path, scrollDepth: threshold },
              });
          }
      }
    };
    
    const debouncedScrollHandler = debounce(handleScroll, 200);
    window.addEventListener('scroll', debouncedScrollHandler);
    return () => window.removeEventListener('scroll', debouncedScrollHandler);
  }, [pathname, trackEvent]);


  // --- Page View and Duration Tracking ---
  useEffect(() => {
    const handleUnload = () => {
        if(pageViewRef.current) {
            const duration = (Date.now() - pageViewRef.current.startTime) / 1000;
            trackEvent({ type: 'duration', path: pageViewRef.current.path, details: { duration: Math.round(duration) } }, true);
        }
    };
    
    if (pageViewRef.current && pageViewRef.current.path !== pathname) {
       handleUnload();
    }
    
    pageViewRef.current = { path: pathname, startTime: Date.now() };
    const courseId = pathname.includes('/courses/') ? pathname.split('/courses/')[1] : undefined;
    
    // Track UTM source on page view
    trackUTMSource();
    
    // Track regular page view
    trackEvent({ type: 'page_view', path: pathname, courseId });
    
    window.addEventListener('beforeunload', handleUnload);

    return () => {
        window.removeEventListener('beforeunload', handleUnload);
        handleUnload();
    };

  }, [pathname, trackEvent, trackUTMSource]);


  // --- Click Tracking ---
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      let element = event.target as HTMLElement;
      let section: string | null = null;
      let elementText: string | null = null;

      while (element && element !== document.body) {
        if (element.hasAttribute('data-analytics-section')) {
          section = element.getAttribute('data-analytics-section');
          break;
        }
        element = element.parentElement as HTMLElement;
      }
      
      element = event.target as HTMLElement;
      elementText = element.textContent?.trim().slice(0, 50) || element.ariaLabel || element.id || 'Unnamed Element';
      const courseId = pathname.includes('/courses/') ? pathname.split('/courses/')[1] : undefined;
      
      trackEvent({
        type: 'click',
        details: {
            path: pathname,
            section: section || 'unknown',
            elementType: element.tagName,
            elementText,
            href: (element as HTMLAnchorElement).href,
        },
        courseId,
      });
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [trackEvent, pathname]);
  
  return null;
}
