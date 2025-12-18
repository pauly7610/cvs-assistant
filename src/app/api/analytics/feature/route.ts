import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, featureName } = body;

    if (!featureName) {
      return NextResponse.json(
        { error: 'Missing feature name' },
        { status: 400 }
      );
    }

    // Upsert feature usage
    const { data: existing } = await supabase
      .from('feature_usage')
      .select('id, usage_count')
      .eq('user_id', userId || 'anonymous')
      .eq('feature_name', featureName)
      .single();

    if (existing) {
      await supabase
        .from('feature_usage')
        .update({
          usage_count: existing.usage_count + 1,
          last_used_at: new Date().toISOString(),
        })
        .eq('id', existing.id);
    } else {
      await supabase.from('feature_usage').insert({
        user_id: userId || 'anonymous',
        feature_name: featureName,
        usage_count: 1,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feature tracking error:', error);
    return NextResponse.json({ success: true, logged: false });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { data } = await supabase
      .from('feature_usage')
      .select('feature_name, usage_count, first_used_at, last_used_at, user_id')
      .order('usage_count', { ascending: false });

    // Aggregate by feature
    const features: Record<string, { totalUsage: number; uniqueUsers: number }> = {};
    
    data?.forEach(row => {
      if (!features[row.feature_name]) {
        features[row.feature_name] = { totalUsage: 0, uniqueUsers: 0 };
      }
      features[row.feature_name].totalUsage += row.usage_count;
      features[row.feature_name].uniqueUsers++;
    });

    return NextResponse.json({ features });
  } catch (error) {
    console.error('Feature GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch feature data' }, { status: 500 });
  }
}
