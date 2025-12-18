-- CVS Care Companion Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  intent TEXT,
  escalated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  intent TEXT,
  card JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Patient profiles table (linked to Clerk user IDs)
CREATE TABLE IF NOT EXISTS patient_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  member_id TEXT,
  pharmacy_location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prescriptions table (mock data per patient)
CREATE TABLE IF NOT EXISTS prescriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ready', 'processing', 'pending', 'requires_action')),
  ready_time TEXT,
  pharmacy TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversation logs for eval sampling (1%)
CREATE TABLE IF NOT EXISTS conversation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  messages JSONB NOT NULL,
  intent TEXT,
  escalated BOOLEAN DEFAULT FALSE,
  sampled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Policies
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;

-- Conversations: Users can only see their own
CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

CREATE POLICY "Users can insert own conversations" ON conversations
  FOR INSERT WITH CHECK (user_id = current_setting('request.jwt.claims')::json->>'sub');

-- Messages: Users can only see messages from their conversations
CREATE POLICY "Users can view messages from own conversations" ON messages
  FOR SELECT USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = current_setting('request.jwt.claims')::json->>'sub'
    )
  );

CREATE POLICY "Users can insert messages to own conversations" ON messages
  FOR INSERT WITH CHECK (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = current_setting('request.jwt.claims')::json->>'sub'
    )
  );

-- Patient profiles: Users can only see their own
CREATE POLICY "Users can view own profile" ON patient_profiles
  FOR SELECT USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

CREATE POLICY "Users can update own profile" ON patient_profiles
  FOR UPDATE USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

-- Prescriptions: Users can only see their own
CREATE POLICY "Users can view own prescriptions" ON prescriptions
  FOR SELECT USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_user_id ON prescriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_conversation_logs_conversation_id ON conversation_logs(conversation_id);
