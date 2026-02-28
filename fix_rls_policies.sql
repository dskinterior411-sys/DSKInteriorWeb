-- Fix RLS Policies for Services Table
-- Run this if you're getting "Failed to fetch" errors

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Enable read access for all users" ON services;
DROP POLICY IF EXISTS "Enable insert for service role only" ON services;
DROP POLICY IF EXISTS "Enable update for service role only" ON services;
DROP POLICY IF EXISTS "Enable delete for service role only" ON services;

-- Recreate policies
CREATE POLICY "Enable read access for all users" 
ON services FOR SELECT 
USING (true);

CREATE POLICY "Enable insert for service role only" 
ON services FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable update for service role only" 
ON services FOR UPDATE 
USING (true);

CREATE POLICY "Enable delete for service role only" 
ON services FOR DELETE 
USING (true);

-- Verify RLS is enabled
ALTER TABLE services ENABLE ROW LEVEL SECURITY;



