import { Message, Intent, UserHealthContext } from "@/types";
import { generateResponse } from "@/lib/response-handler";
import { generateLLMResponse } from "./openai";

const STRUCTURED_INTENTS: Intent[] = [
  "prescription_status",
  "refill_request",
  "symptom_intake",
  "book_appointment",
  "emergency",
];

const LLM_INTENTS: Intent[] = [
  "otc_question",
  "general_health",
  "medication_info",
  "health_summary",
  "unknown",
];

const HYBRID_INTENTS: Intent[] = [
  "log_symptom",
  "log_vital",
  "adherence_check",
  "appointment_history",
];

export interface RouterResponse {
  message: Message;
  usedLLM: boolean;
  tokensUsed?: number;
}

export async function routeMessage(
  userMessage: string,
  intent: Intent,
  conversationHistory: Pick<Message, "role" | "content">[] = [],
  healthContext?: UserHealthContext
): Promise<RouterResponse> {
  if (STRUCTURED_INTENTS.includes(intent)) {
    const response = generateResponse(userMessage);
    return {
      message: response,
      usedLLM: false,
    };
  }

  if (LLM_INTENTS.includes(intent)) {
    const hasApiKey = !!process.env.OPENAI_API_KEY;
    
    if (!hasApiKey) {
      const response = generateResponse(userMessage);
      return {
        message: response,
        usedLLM: false,
      };
    }

    try {
      const { content, tokensUsed } = await generateLLMResponse(
        userMessage,
        conversationHistory,
        intent,
        healthContext
      );

      return {
        message: {
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          role: "assistant",
          content,
          timestamp: new Date(),
          intent,
        },
        usedLLM: true,
        tokensUsed,
      };
    } catch (error) {
      console.error("LLM routing error, falling back to structured:", error);
      const response = generateResponse(userMessage);
      return {
        message: response,
        usedLLM: false,
      };
    }
  }

  const response = generateResponse(userMessage);
  return {
    message: response,
    usedLLM: false,
  };
}
