import { getServiceClient } from "@/lib/supabase";
import { Message, Intent } from "@/types";

export interface DbConversation {
  id: string;
  user_id: string;
  intent: Intent | null;
  escalated: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbMessage {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  intent: Intent | null;
  card: Record<string, unknown> | null;
  created_at: string;
}

export async function createConversation(userId: string): Promise<DbConversation | null> {
  const supabase = getServiceClient();
  
  const { data, error } = await supabase
    .from("conversations")
    .insert({ user_id: userId })
    .select()
    .single();

  if (error) {
    console.error("Error creating conversation:", error);
    return null;
  }

  return data;
}

export async function getConversation(conversationId: string, userId: string): Promise<DbConversation | null> {
  const supabase = getServiceClient();
  
  const { data, error } = await supabase
    .from("conversations")
    .select()
    .eq("id", conversationId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching conversation:", error);
    return null;
  }

  return data;
}

export async function updateConversation(
  conversationId: string,
  updates: Partial<Pick<DbConversation, "intent" | "escalated">>
): Promise<boolean> {
  const supabase = getServiceClient();
  
  const { error } = await supabase
    .from("conversations")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  if (error) {
    console.error("Error updating conversation:", error);
    return false;
  }

  return true;
}

export async function saveMessage(
  conversationId: string,
  message: Pick<Message, "role" | "content" | "intent" | "card">
): Promise<DbMessage | null> {
  const supabase = getServiceClient();
  
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      role: message.role,
      content: message.content,
      intent: message.intent || null,
      card: message.card || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving message:", error);
    return null;
  }

  return data;
}

export async function getConversationMessages(conversationId: string): Promise<DbMessage[]> {
  const supabase = getServiceClient();
  
  const { data, error } = await supabase
    .from("messages")
    .select()
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return data || [];
}

export async function getUserConversations(userId: string, limit = 10): Promise<DbConversation[]> {
  const supabase = getServiceClient();
  
  const { data, error } = await supabase
    .from("conversations")
    .select()
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching user conversations:", error);
    return [];
  }

  return data || [];
}
