"use client";

import { useEffect } from 'react';

export default function TrackScroll() {
  useEffect(() => {
    let lastScrollDepth = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      // Only send significant scroll events (e.g., every 25% increment)
      if (scrollDepth >= lastScrollDepth + 25) {
        lastScrollDepth = scrollDepth;

        // Get or generate sessionId (align with /api/analytics/track)
        const sessionId = localStorage.getItem('sessionId') || `guest-${Date.now()}-${Math.random().toString(36).substring(2)}`;
        localStorage.setItem('sessionId', sessionId); // Persist sessionId

        // Include path and optional courseId for context
        const path = window.location.pathname;
        const courseId = path.includes('/courses/') ? path.split('/courses/')[1] : undefined;

        // Send scroll event to /api/analytics/track
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'scroll',
            sessionId,
            path,
            details: { scrollDepth },
            courseId,
            timestamp: new Date().toISOString(),
          }),
        })
          .then(response => response.json())
          .then(data => console.log('Scroll event tracked:', data))
          .catch(error => console.error('Error tracking scroll:', error));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}