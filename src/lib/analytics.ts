// Analytics tracking utility for user journey tracking

type EventType = 
  | 'page_view'
  | 'chat_started'
  | 'message_sent'
  | 'intent_triggered'
  | 'card_action'
  | 'appointment_booked'
  | 'prescription_checked'
  | 'refill_requested'
  | 'pharmacist_escalation'
  | 'emergency_triggered'
  | 'error'
  | 'session_start'
  | 'session_end';

interface AnalyticsEvent {
  eventType: EventType;
  eventName: string;
  eventData?: Record<string, unknown>;
  pagePath?: string;
}

interface SessionData {
  sessionId: string;
  startedAt: Date;
  pageViews: number;
  messagesSent: number;
  intentsTriggered: string[];
}

class Analytics {
  private sessionId: string;
  private userId: string | null = null;
  private sessionData: SessionData;
  private isEnabled: boolean = true;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionData = {
      sessionId: this.sessionId,
      startedAt: new Date(),
      pageViews: 0,
      messagesSent: 0,
      intentsTriggered: [],
    };
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  disable() {
    this.isEnabled = false;
  }

  enable() {
    this.isEnabled = true;
  }

  async track(event: AnalyticsEvent): Promise<void> {
    if (!this.isEnabled) return;

    const payload = {
      userId: this.userId || 'anonymous',
      sessionId: this.sessionId,
      eventType: event.eventType,
      eventName: event.eventName,
      eventData: event.eventData || {},
      pagePath: event.pagePath || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      deviceType: this.getDeviceType(),
      timestamp: new Date().toISOString(),
    };

    // Update session data
    if (event.eventType === 'page_view') {
      this.sessionData.pageViews++;
    } else if (event.eventType === 'message_sent') {
      this.sessionData.messagesSent++;
    } else if (event.eventType === 'intent_triggered' && event.eventData?.intent) {
      this.sessionData.intentsTriggered.push(event.eventData.intent as string);
    }

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      // Silent fail - don't break UX for analytics
      console.debug('Analytics tracking failed:', error);
    }
  }

  // Convenience methods
  pageView(pagePath?: string) {
    this.track({
      eventType: 'page_view',
      eventName: 'Page Viewed',
      pagePath,
    });
  }

  chatStarted() {
    this.track({
      eventType: 'chat_started',
      eventName: 'Chat Session Started',
    });
  }

  messageSent(messageLength: number, isFirstMessage: boolean = false) {
    this.track({
      eventType: 'message_sent',
      eventName: 'User Message Sent',
      eventData: { messageLength, isFirstMessage },
    });
  }

  intentTriggered(intent: string, confidence?: number) {
    this.track({
      eventType: 'intent_triggered',
      eventName: 'Intent Triggered',
      eventData: { intent, confidence },
    });
  }

  cardAction(actionType: string, cardType: string, metadata?: Record<string, unknown>) {
    this.track({
      eventType: 'card_action',
      eventName: 'Card Action Clicked',
      eventData: { actionType, cardType, ...metadata },
    });
  }

  appointmentBooked(appointmentId: string, appointmentType: string) {
    this.track({
      eventType: 'appointment_booked',
      eventName: 'Appointment Booked',
      eventData: { appointmentId, appointmentType },
    });
  }

  prescriptionChecked(prescriptionName: string, status: string) {
    this.track({
      eventType: 'prescription_checked',
      eventName: 'Prescription Status Checked',
      eventData: { prescriptionName, status },
    });
  }

  refillRequested(prescriptionName: string) {
    this.track({
      eventType: 'refill_requested',
      eventName: 'Refill Requested',
      eventData: { prescriptionName },
    });
  }

  pharmacistEscalation(reason?: string) {
    this.track({
      eventType: 'pharmacist_escalation',
      eventName: 'Pharmacist Escalation Requested',
      eventData: { reason },
    });
  }

  emergencyTriggered(keyword: string) {
    this.track({
      eventType: 'emergency_triggered',
      eventName: 'Emergency Keywords Detected',
      eventData: { keyword },
    });
  }

  error(errorType: string, errorMessage: string, component?: string) {
    this.track({
      eventType: 'error',
      eventName: 'Error Occurred',
      eventData: { errorType, errorMessage, component },
    });
  }

  // Funnel tracking
  async trackFunnel(
    funnelName: string,
    stepName: string,
    stepOrder: number,
    completed: boolean = true,
    metadata?: Record<string, unknown>
  ) {
    if (!this.isEnabled) return;

    try {
      await fetch('/api/analytics/funnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: this.userId || 'anonymous',
          sessionId: this.sessionId,
          funnelName,
          stepName,
          stepOrder,
          completed,
          metadata,
        }),
      });
    } catch (error) {
      console.debug('Funnel tracking failed:', error);
    }
  }

  // Feature usage tracking
  async trackFeatureUsage(featureName: string) {
    if (!this.isEnabled) return;

    try {
      await fetch('/api/analytics/feature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: this.userId || 'anonymous',
          featureName,
        }),
      });
    } catch (error) {
      console.debug('Feature tracking failed:', error);
    }
  }

  getSessionData(): SessionData {
    return { ...this.sessionData };
  }

  getSessionId(): string {
    return this.sessionId;
  }
}

// Singleton instance
export const analytics = new Analytics();

// Export types
export type { EventType, AnalyticsEvent, SessionData };
