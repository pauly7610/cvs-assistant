import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      userId,
      sessionId,
      eventType,
      eventName,
      eventData,
      pagePath,
      referrer,
      userAgent,
      deviceType,
    } = body;

    // Validate required fields
    if (!sessionId || !eventType || !eventName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert event
    const { error } = await supabase.from('analytics_events').insert({
      user_id: userId || 'anonymous',
      session_id: sessionId,
      event_type: eventType,
      event_name: eventName,
      event_data: eventData || {},
      page_path: pagePath,
      referrer: referrer,
      user_agent: userAgent,
      device_type: deviceType,
    });

    if (error) {
      console.error('Analytics insert error:', error);
      // Don't fail the request - analytics should be silent
      return NextResponse.json({ success: true, logged: false });
    }

    // Update session stats
    await updateSessionStats(sessionId, userId, eventType, deviceType);

    return NextResponse.json({ success: true, logged: true });
  } catch (error) {
    console.error('Analytics error:', error);
    // Silent fail - don't break UX
    return NextResponse.json({ success: true, logged: false });
  }
}

async function updateSessionStats(
  sessionId: string,
  userId: string,
  eventType: string,
  deviceType: string
) {
  // Check if session exists
  const { data: existingSession } = await supabase
    .from('user_sessions')
    .select('id, page_views, events_count, messages_sent')
    .eq('session_id', sessionId)
    .single();

  if (existingSession) {
    // Update existing session
    const updates: Record<string, unknown> = {
      events_count: (existingSession.events_count || 0) + 1,
    };

    if (eventType === 'page_view') {
      updates.page_views = (existingSession.page_views || 0) + 1;
    } else if (eventType === 'message_sent') {
      updates.messages_sent = (existingSession.messages_sent || 0) + 1;
    }

    await supabase
      .from('user_sessions')
      .update(updates)
      .eq('session_id', sessionId);
  } else {
    // Create new session
    await supabase.from('user_sessions').insert({
      session_id: sessionId,
      user_id: userId || 'anonymous',
      device_type: deviceType,
      page_views: eventType === 'page_view' ? 1 : 0,
      events_count: 1,
      messages_sent: eventType === 'message_sent' ? 1 : 0,
      is_authenticated: userId !== 'anonymous',
    });
  }
}

// GET endpoint for retrieving analytics (admin use)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'summary';
  const days = parseInt(searchParams.get('days') || '7');

  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    if (type === 'summary') {
      // Get summary stats
      const { data: events } = await supabase
        .from('analytics_events')
        .select('event_type, user_id, session_id')
        .gte('created_at', startDate.toISOString());

      const { data: sessions } = await supabase
        .from('user_sessions')
        .select('*')
        .gte('started_at', startDate.toISOString());

      const uniqueUsers = new Set(events?.map(e => e.user_id) || []).size;
      const totalSessions = sessions?.length || 0;
      const totalEvents = events?.length || 0;

      // Event breakdown
      const eventBreakdown: Record<string, number> = {};
      events?.forEach(e => {
        eventBreakdown[e.event_type] = (eventBreakdown[e.event_type] || 0) + 1;
      });

      return NextResponse.json({
        period: `Last ${days} days`,
        uniqueUsers,
        totalSessions,
        totalEvents,
        eventBreakdown,
      });
    }

    if (type === 'events') {
      const { data } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(100);

      return NextResponse.json({ events: data });
    }

    if (type === 'intents') {
      const { data } = await supabase
        .from('analytics_events')
        .select('event_data')
        .eq('event_type', 'intent_triggered')
        .gte('created_at', startDate.toISOString());

      const intentCounts: Record<string, number> = {};
      data?.forEach(e => {
        const intent = e.event_data?.intent;
        if (intent) {
          intentCounts[intent] = (intentCounts[intent] || 0) + 1;
        }
      });

      return NextResponse.json({ intents: intentCounts });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
