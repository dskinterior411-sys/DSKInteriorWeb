-- Consultation requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_type TEXT NOT NULL CHECK (project_type IN ('residential', 'commercial', 'retail', 'corporate', 'hospitality', 'modular-kitchen')),
  space_size TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  location TEXT NOT NULL,
  style_preferences TEXT[] DEFAULT '{}',
  specific_requirements TEXT,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_consultation_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_created ON consultation_requests(created_at);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_consultation_updated_at BEFORE UPDATE ON consultation_requests
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- For Consultation Requests (Public Insert Only)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert' AND tablename = 'consultation_requests'
  ) THEN
    CREATE POLICY "Allow public insert" ON consultation_requests FOR INSERT WITH CHECK (true);
  END IF;
END $$;
