// Analytics tracking utility

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
  | 'error';

interface AnalyticsEvent {
  eventType: EventType;
  eventName: string;
  eventData?: Record<string, unknown>;
  pagePath?: string;
}

class Analytics {
  private sessionId: string;
  private userId: string | null = null;

  constructor() {
    this.sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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

  async track(event: AnalyticsEvent): Promise<void> {
    const payload = {
      userId: this.userId || 'anonymous',
      sessionId: this.sessionId,
      eventType: event.eventType,
      eventName: event.eventName,
      eventData: event.eventData || {},
      pagePath: event.pagePath || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      deviceType: this.getDeviceType(),
    };

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Silent fail
    }
  }

  pageView(pagePath?: string) {
    this.track({ eventType: 'page_view', eventName: 'Page Viewed', pagePath });
  }

  chatStarted() {
    this.track({ eventType: 'chat_started', eventName: 'Chat Started' });
  }

  messageSent(messageLength: number) {
    this.track({ eventType: 'message_sent', eventName: 'Message Sent', eventData: { messageLength } });
  }

  intentTriggered(intent: string) {
    this.track({ eventType: 'intent_triggered', eventName: 'Intent Triggered', eventData: { intent } });
  }

  cardAction(actionType: string, cardType: string) {
    this.track({ eventType: 'card_action', eventName: 'Card Action', eventData: { actionType, cardType } });
  }

  prescriptionChecked(name: string, status: string) {
    this.track({ eventType: 'prescription_checked', eventName: 'Prescription Checked', eventData: { name, status } });
  }

  refillRequested(name: string) {
    this.track({ eventType: 'refill_requested', eventName: 'Refill Requested', eventData: { name } });
  }

  pharmacistEscalation(reason?: string) {
    this.track({ eventType: 'pharmacist_escalation', eventName: 'Pharmacist Escalation', eventData: { reason } });
  }

  emergencyTriggered(keyword: string) {
    this.track({ eventType: 'emergency_triggered', eventName: 'Emergency Triggered', eventData: { keyword } });
  }

  getSessionId(): string {
    return this.sessionId;
  }
}

export const analytics = new Analytics();
