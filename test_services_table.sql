-- Test query to verify services table and policies
-- Run this in Supabase SQL Editor to check if everything is set up correctly

-- 1. Check if table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'services'
) AS table_exists;

-- 2. Check RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'services';

-- 3. List all policies on services table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'services';

-- 4. Try a simple select (this should work if policies are correct)
SELECT * FROM services LIMIT 1;

-- 5. Count total services
SELECT COUNT(*) as total_services FROM services;



