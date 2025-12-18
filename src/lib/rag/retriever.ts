import { getServiceClient } from "@/lib/supabase";
import { generateEmbedding } from "@/lib/llm/openai";

export interface HealthDocument {
  id: string;
  title: string;
  content: string;
  category: string;
  source: string;
  similarity?: number;
}

export async function searchHealthContent(
  query: string,
  limit = 3,
  threshold = 0.7
): Promise<HealthDocument[]> {
  try {
    const embedding = await generateEmbedding(query);
    const supabase = getServiceClient();

    const { data, error } = await supabase.rpc("match_health_documents", {
      query_embedding: embedding,
      match_threshold: threshold,
      match_count: limit,
    });

    if (error) {
      console.error("RAG search error:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("RAG retrieval error:", error);
    return [];
  }
}

export function formatRetrievedContext(documents: HealthDocument[]): string {
  if (documents.length === 0) {
    return "";
  }

  const context = documents
    .map((doc) => `[Source: ${doc.source}]\n${doc.content}`)
    .join("\n\n---\n\n");

  return `Relevant health information:\n\n${context}`;
}
