-- Prescription Notifications Schema
-- Run after schema.sql

CREATE TABLE IF NOT EXISTS prescription_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  prescription_id TEXT NOT NULL,
  prescription_name TEXT NOT NULL,
  pharmacy TEXT NOT NULL,
  notify_when TEXT NOT NULL CHECK (notify_when IN ('ready', 'reminder')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON prescription_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON prescription_notifications(status);

ALTER TABLE prescription_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own notifications" ON prescription_notifications
  FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');
