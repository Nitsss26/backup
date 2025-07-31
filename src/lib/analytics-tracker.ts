// Client-side analytics tracker
export class AnalyticsTracker {
  private sessionId: string;
  private uniqueUserId: string;
  private startTime: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.uniqueUserId = this.getOrCreateUniqueUserId();
    this.startTime = Date.now();
    
    // Track UTM source on initialization
    this.trackUTMSource();
    
    // Track page view on initialization
    this.trackPageView();
    
    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.trackPageView(Date.now() - this.startTime);
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getOrCreateUniqueUserId(): string {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }

  private getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    return {
      device: isMobile ? 'mobile' : 'desktop',
      browser: this.getBrowserName(userAgent),
      userAgent: userAgent
    };
  }

  private getBrowserName(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  public async trackPageView(duration: number = 0) {
    try {
      const deviceInfo = this.getDeviceInfo();
      
      const trackingData = {
        sessionId: this.sessionId,
        uniqueUserId: this.uniqueUserId,
        path: window.location.pathname,
        url: window.location.href,
        duration,
        ...deviceInfo
      };

      await fetch('/api/analytics/track-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData),
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  private async trackUTMSource() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utmsource');
      
      const utmData = {
        utmSource,
        sessionId: this.sessionId,
        userId: this.uniqueUserId,
        path: window.location.pathname,
        referrer: document.referrer
      };

      await fetch('/api/analytics/utm-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(utmData),
      });
    } catch (error) {
      console.error('Failed to track UTM source:', error);
    }
  }

  public async trackEvent(eventType: string, data: any = {}) {
    try {
      const deviceInfo = this.getDeviceInfo();
      
      const eventData = {
        sessionId: this.sessionId,
        uniqueUserId: this.uniqueUserId,
        path: window.location.pathname,
        url: window.location.href,
        eventType,
        ...data,
        ...deviceInfo
      };

      await fetch('/api/analytics/track-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }
}

// Initialize tracker when script loads
let tracker: AnalyticsTracker;

if (typeof window !== 'undefined') {
  tracker = new AnalyticsTracker();
}

export { tracker };