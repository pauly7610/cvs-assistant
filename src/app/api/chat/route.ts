import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { classifyIntent, isEmergency } from "@/lib/intent-classifier";
import { routeMessage } from "@/lib/llm/router";
import { Message } from "@/types";

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  message: Message;
  isEmergency: boolean;
  conversationId: string;
}

function generateConversationId(): string {
  return `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse | { error: string }>> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: ChatRequest = await request.json();
    const { message, conversationId } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 2000) {
      return NextResponse.json(
        { error: "Message too long (max 2000 characters)" },
        { status: 400 }
      );
    }

    const emergency = isEmergency(trimmedMessage);
    const intent = classifyIntent(trimmedMessage);

    const { message: response } = await routeMessage(trimmedMessage, intent);

    const activeConversationId = conversationId || generateConversationId();

    return NextResponse.json({
      message: response,
      isEmergency: emergency,
      conversationId: activeConversationId,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
