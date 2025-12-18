import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { userId, sessionId, eventType, eventName, eventData, pagePath, deviceType } = body;

    if (!sessionId || !eventType || !eventName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await supabase.from('analytics_events').insert({
      user_id: userId || 'anonymous',
      session_id: sessionId,
      event_type: eventType,
      event_name: eventName,
      event_data: eventData || {},
      page_path: pagePath,
      device_type: deviceType,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '7');

  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: events } = await supabase
      .from('analytics_events')
      .select('event_type, user_id')
      .gte('created_at', startDate.toISOString());

    const uniqueUsers = new Set(events?.map(e => e.user_id) || []).size;
    const totalEvents = events?.length || 0;

    const breakdown: Record<string, number> = {};
    events?.forEach(e => {
      breakdown[e.event_type] = (breakdown[e.event_type] || 0) + 1;
    });

    return NextResponse.json({ period: `${days} days`, uniqueUsers, totalEvents, breakdown });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
