-- Expanded CVS Care Companion Database Schema
-- Run after schema.sql

-- ============================================
-- HEALTH TRACKING
-- ============================================

-- Symptom logs for tracking health over time
CREATE TABLE IF NOT EXISTS symptom_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  symptom TEXT NOT NULL,
  severity INTEGER CHECK (severity >= 1 AND severity <= 10),
  duration TEXT,
  notes TEXT,
  conversation_id UUID REFERENCES conversations(id),
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vitals tracking (blood pressure, weight, glucose, etc.)
CREATE TABLE IF NOT EXISTS vitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('blood_pressure', 'weight', 'glucose', 'temperature', 'heart_rate', 'oxygen')),
  value JSONB NOT NULL,
  unit TEXT NOT NULL,
  notes TEXT,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MEDICATION MANAGEMENT
-- ============================================

-- User medications (linked to prescriptions)
CREATE TABLE IF NOT EXISTS medications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  instructions TEXT,
  prescriber TEXT,
  pharmacy TEXT,
  refills_remaining INTEGER DEFAULT 0,
  last_filled DATE,
  next_refill_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Medication reminders
CREATE TABLE IF NOT EXISTS medication_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medication_id UUID REFERENCES medications(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  reminder_time TIME NOT NULL,
  days_of_week INTEGER[] DEFAULT '{0,1,2,3,4,5,6}',
  is_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Medication adherence tracking
CREATE TABLE IF NOT EXISTS medication_adherence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medication_id UUID REFERENCES medications(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
  taken_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL CHECK (status IN ('taken', 'missed', 'skipped', 'pending')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- APPOINTMENTS
-- ============================================

-- Appointment history and scheduled appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  location TEXT NOT NULL,
  location_address TEXT,
  appointment_type TEXT NOT NULL,
  provider TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 15,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  conversation_id UUID REFERENCES conversations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USER PREFERENCES & CONTEXT
-- ============================================

-- User preferences for personalized experience
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  preferred_pharmacy TEXT,
  preferred_communication TEXT DEFAULT 'chat',
  notification_enabled BOOLEAN DEFAULT TRUE,
  reminder_time_preference TEXT DEFAULT 'morning',
  language TEXT DEFAULT 'en',
  accessibility_settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Health conditions for context
CREATE TABLE IF NOT EXISTS health_conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  condition_name TEXT NOT NULL,
  diagnosed_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'managed', 'resolved')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Allergies
CREATE TABLE IF NOT EXISTS allergies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  allergen TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('mild', 'moderate', 'severe')),
  reaction TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CONVERSATION CONTEXT
-- ============================================

-- Conversation summaries for LLM context
CREATE TABLE IF NOT EXISTS conversation_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  summary TEXT NOT NULL,
  key_topics TEXT[],
  action_items TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User intents history for personalization
CREATE TABLE IF NOT EXISTS intent_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  intent TEXT NOT NULL,
  frequency INTEGER DEFAULT 1,
  last_used TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_symptom_logs_user ON symptom_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_symptom_logs_date ON symptom_logs(logged_at);
CREATE INDEX IF NOT EXISTS idx_vitals_user ON vitals(user_id);
CREATE INDEX IF NOT EXISTS idx_vitals_type ON vitals(type);
CREATE INDEX IF NOT EXISTS idx_medications_user ON medications(user_id);
CREATE INDEX IF NOT EXISTS idx_medication_adherence_user ON medication_adherence(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_health_conditions_user ON health_conditions(user_id);
CREATE INDEX IF NOT EXISTS idx_allergies_user ON allergies(user_id);
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_user ON conversation_summaries(user_id);
CREATE INDEX IF NOT EXISTS idx_intent_history_user ON intent_history(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_adherence ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE allergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE intent_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users own symptom_logs" ON symptom_logs FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
CREATE POLICY "Users own vitals" ON vitals FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
CREATE POLICY "Users own medications" ON medications FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
CREATE POLICY "Users own medication_reminders" ON medication_reminders FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
CREATE POLICY "Users own medication_adherence" ON medication_adherence FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
CREATE POLICY "Users own appointments" ON appointments FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
CREATE POLICY "Users own user_preferences" ON user_preferences FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
CREATE POLICY "Users own health_conditions" ON health_conditions FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
CREATE POLICY "Users own allergies" ON allergies FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
CREATE POLICY "Users own conversation_summaries" ON conversation_summaries FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
CREATE POLICY "Users own intent_history" ON intent_history FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
