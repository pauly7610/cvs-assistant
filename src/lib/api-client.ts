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

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = "ApiError";
  }
}

export const ERROR_MESSAGES: Record<string, string> = {
  UNAUTHORIZED: "Please sign in to continue.",
  RATE_LIMITED: "You're sending messages too quickly. Please wait a moment.",
  MESSAGE_TOO_LONG: "Your message is too long. Please keep it under 2000 characters.",
  EMPTY_MESSAGE: "Please enter a message.",
  SERVER_ERROR: "Something went wrong. Please try again.",
  NETWORK_ERROR: "Unable to connect. Please check your internet connection.",
  LLM_ERROR: "I'm having trouble thinking right now. Please try again.",
  TIMEOUT: "The request took too long. Please try again.",
};

export async function sendChatMessage(
  message: string,
  conversationId?: string,
  timeout = 30000
): Promise<ChatResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversationId,
      } as ChatRequest),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        throw new ApiError(ERROR_MESSAGES.UNAUTHORIZED, "UNAUTHORIZED", 401);
      }
      if (response.status === 429) {
        throw new ApiError(ERROR_MESSAGES.RATE_LIMITED, "RATE_LIMITED", 429);
      }
      if (response.status === 400) {
        throw new ApiError(error.error || ERROR_MESSAGES.EMPTY_MESSAGE, "BAD_REQUEST", 400);
      }
      throw new ApiError(error.error || ERROR_MESSAGES.SERVER_ERROR, "SERVER_ERROR", response.status);
    }

    const data: ChatResponse = await response.json();
    
    return {
      ...data,
      message: {
        ...data.message,
        timestamp: new Date(data.message.timestamp),
      },
    };
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new ApiError(ERROR_MESSAGES.TIMEOUT, "TIMEOUT", 408);
      }
      if (error.message.includes("fetch")) {
        throw new ApiError(ERROR_MESSAGES.NETWORK_ERROR, "NETWORK_ERROR", 0);
      }
    }
    
    throw new ApiError(ERROR_MESSAGES.SERVER_ERROR, "UNKNOWN", 500);
  }
}
