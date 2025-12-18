import OpenAI from "openai";
import { Message, Intent, UserHealthContext } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are CVS Care Companion, a healthcare support assistant. You provide information and workflow support, not diagnoses or medical decisions. When uncertain, escalate to a human. Safety overrides helpfulness.

Guidelines:
- Be helpful, warm, and professional
- Use clear, simple language
- Never provide medical diagnoses or dosage recommendations
- For symptoms, recommend seeing a healthcare provider
- For emergencies, always direct to 911 or emergency services
- Cite sources when providing health information
- Avoid absolute statements about medical conditions
- Keep responses concise and actionable

You can help with:
- General health information and wellness tips
- Explaining how medications work (general info only)
- Navigating CVS services (pharmacy, MinuteClinic)
- Answering questions about over-the-counter products
- Providing lifestyle and preventive care guidance`;

export interface LLMResponse {
  content: string;
  tokensUsed: number;
}

function buildHealthContextPrompt(context: UserHealthContext): string {
  const parts: string[] = [];

  if (context.conditions.length > 0) {
    parts.push(`Health conditions: ${context.conditions.map(c => c.conditionName).join(", ")}`);
  }

  if (context.allergies.length > 0) {
    parts.push(`Allergies: ${context.allergies.map(a => `${a.allergen}${a.severity ? ` (${a.severity})` : ""}`).join(", ")}`);
  }

  if (context.medications.length > 0) {
    parts.push(`Current medications: ${context.medications.map(m => `${m.name} ${m.dosage}`).join(", ")}`);
  }

  if (context.recentSymptoms.length > 0) {
    const recent = context.recentSymptoms.slice(0, 3);
    parts.push(`Recent symptoms: ${recent.map(s => `${s.symptom} (severity ${s.severity}/10)`).join(", ")}`);
  }

  if (parts.length === 0) return "";

  return `\n\nUser health context (use to personalize responses, but do not diagnose):\n${parts.join("\n")}`;
}

export async function generateLLMResponse(
  userMessage: string,
  conversationHistory: Pick<Message, "role" | "content">[],
  intent: Intent,
  healthContext?: UserHealthContext
): Promise<LLMResponse> {
  const contextPrompt = healthContext ? buildHealthContextPrompt(healthContext) : "";
  const systemPrompt = SYSTEM_PROMPT + contextPrompt;

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...conversationHistory.slice(-10).map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
    { role: "user", content: userMessage },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || "I apologize, but I'm having trouble responding right now. Please try again.";
    const tokensUsed = completion.usage?.total_tokens || 0;

    return { content, tokensUsed };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate LLM response");
  }
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error("Embedding generation error:", error);
    throw new Error("Failed to generate embedding");
  }
}
