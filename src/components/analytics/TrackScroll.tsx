
"use client";

// This component is now deprecated.
// Scroll tracking logic has been moved into AnalyticsTracker.tsx for better state management and to avoid duplicate event firing.
// This file can be safely deleted.

import { useEffect } from 'react';

export default function TrackScroll() {
  useEffect(() => {
    // Logic has been moved to AnalyticsTracker.tsx
  }, []);

  return null;
}
