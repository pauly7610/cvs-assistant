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
      funnelName,
      stepName,
      stepOrder,
      completed,
      metadata,
    } = body;

    if (!funnelName || !stepName || stepOrder === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('funnel_events').insert({
      user_id: userId || 'anonymous',
      session_id: sessionId,
      funnel_name: funnelName,
      step_name: stepName,
      step_order: stepOrder,
      completed: completed ?? true,
      dropped_off: !completed,
      metadata: metadata || {},
    });

    if (error) {
      console.error('Funnel insert error:', error);
      return NextResponse.json({ success: true, logged: false });
    }

    return NextResponse.json({ success: true, logged: true });
  } catch (error) {
    console.error('Funnel tracking error:', error);
    return NextResponse.json({ success: true, logged: false });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const funnelName = searchParams.get('funnel');
  const days = parseInt(searchParams.get('days') || '7');

  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let query = supabase
      .from('funnel_events')
      .select('*')
      .gte('created_at', startDate.toISOString());

    if (funnelName) {
      query = query.eq('funnel_name', funnelName);
    }

    const { data } = await query.order('step_order', { ascending: true });

    // Calculate funnel metrics
    const funnels: Record<string, Record<string, { total: number; completed: number; dropOff: number }>> = {};
    
    data?.forEach(event => {
      if (!funnels[event.funnel_name]) {
        funnels[event.funnel_name] = {};
      }
      if (!funnels[event.funnel_name][event.step_name]) {
        funnels[event.funnel_name][event.step_name] = { total: 0, completed: 0, dropOff: 0 };
      }
      
      funnels[event.funnel_name][event.step_name].total++;
      if (event.completed) {
        funnels[event.funnel_name][event.step_name].completed++;
      }
      if (event.dropped_off) {
        funnels[event.funnel_name][event.step_name].dropOff++;
      }
    });

    return NextResponse.json({ funnels, period: `Last ${days} days` });
  } catch (error) {
    console.error('Funnel GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch funnel data' }, { status: 500 });
  }
}
