
"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/components/AppProviders'; // Assuming useAuth provides user object

function generateSessionId() {
  if (typeof window !== 'undefined') {
    let sessionId = localStorage.getItem('edtechcart_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('edtechcart_session_id', sessionId);
    }
    return sessionId;
  }
  return null;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    setSessionId(generateSessionId());
  }, []);

  useEffect(() => {
    if (pathname && sessionId) {
      const trackVisit = async () => {
        try {
          const visitData: { path: string; sessionId: string; userId?: string } = {
            path: pathname,
            sessionId: sessionId,
          };
          if (user?.id) {
            visitData.userId = user.id;
          }
          // console.log('[AnalyticsTracker] Tracking visit:', visitData);
          await axios.post('/api/track/visit', visitData);
        } catch (error) {
          console.error('Failed to track visit event:', error);
        }
      };
      trackVisit();
    }
  }, [pathname, sessionId, user]);

  return null; // This component does not render anything
}
