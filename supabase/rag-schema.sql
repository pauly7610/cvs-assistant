-- RAG Schema for CVS Care Companion
-- Run this after enabling pgvector extension

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Health documents table for RAG
CREATE TABLE IF NOT EXISTS health_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  source TEXT NOT NULL,
  embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for similarity search
CREATE INDEX IF NOT EXISTS health_documents_embedding_idx 
ON health_documents 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Function to search health documents by similarity
CREATE OR REPLACE FUNCTION match_health_documents(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  category TEXT,
  source TEXT,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    health_documents.id,
    health_documents.title,
    health_documents.content,
    health_documents.category,
    health_documents.source,
    1 - (health_documents.embedding <=> query_embedding) AS similarity
  FROM health_documents
  WHERE 1 - (health_documents.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;

-- Sample health content (run after table creation)
-- You would populate this with real health content
INSERT INTO health_documents (title, content, category, source) VALUES
(
  'Common Cold Overview',
  'The common cold is a viral infection of your nose and throat. Symptoms include runny nose, sore throat, cough, congestion, mild body aches, sneezing, and low-grade fever. Most people recover within 7-10 days. Rest, fluids, and over-the-counter medications can help relieve symptoms.',
  'conditions',
  'CVS Health Library'
),
(
  'When to See a Doctor for Cold Symptoms',
  'See a doctor if: symptoms last more than 10 days, you have a fever above 103°F, you have difficulty breathing, you have severe headache or sinus pain, or symptoms improve then worsen again. These could indicate a more serious condition requiring medical attention.',
  'conditions',
  'CVS Health Library'
),
(
  'Over-the-Counter Cold Remedies',
  'Common OTC cold remedies include: pain relievers (acetaminophen, ibuprofen) for aches and fever, decongestants (pseudoephedrine, phenylephrine) for stuffy nose, antihistamines (diphenhydramine, loratadine) for runny nose and sneezing, and cough suppressants (dextromethorphan) for dry cough. Always read labels and consult a pharmacist if unsure.',
  'medications',
  'CVS Pharmacy'
),
(
  'MinuteClinic Services',
  'CVS MinuteClinic offers walk-in care for minor illnesses and injuries, vaccinations, health screenings, and wellness services. No appointment needed for most services. Common visits include cold/flu treatment, skin conditions, minor wounds, and preventive care. Most insurance accepted.',
  'services',
  'CVS MinuteClinic'
),
(
  'Prescription Refill Process',
  'To refill a prescription at CVS: use the CVS app or website, call the pharmacy, or visit in person. Most refills are ready within 1-2 hours. Set up automatic refills for maintenance medications. Contact your doctor if refills are not available or the prescription has expired.',
  'services',
  'CVS Pharmacy'
);
