import { getServiceClient } from "@/lib/supabase";
import { Message, Intent } from "@/types";

const SAMPLE_RATE = 0.01; // 1% sampling rate

export interface ConversationLog {
  id: string;
  conversation_id: string;
  user_id: string;
  messages: Message[];
  intent: Intent | null;
  escalated: boolean;
  sampled_at: string;
}

export function shouldSample(): boolean {
  return Math.random() < SAMPLE_RATE;
}

export async function logConversation(
  conversationId: string,
  userId: string,
  messages: Message[],
  intent: Intent | null,
  escalated: boolean
): Promise<boolean> {
  if (!shouldSample()) {
    return false;
  }

  const supabase = getServiceClient();

  const { error } = await supabase.from("conversation_logs").insert({
    conversation_id: conversationId,
    user_id: userId,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
      intent: m.intent,
      timestamp: m.timestamp,
    })),
    intent,
    escalated,
  });

  if (error) {
    console.error("Error logging conversation:", error);
    return false;
  }

  console.log(`[Eval] Sampled conversation ${conversationId}`);
  return true;
}

export async function getRecentLogs(limit = 50): Promise<ConversationLog[]> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("conversation_logs")
    .select()
    .order("sampled_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching logs:", error);
    return [];
  }

  return data || [];
}
