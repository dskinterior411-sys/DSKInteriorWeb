-- ============================================
-- MIGRATION SCRIPT FOR NEW FEATURES
-- Run this in your Supabase SQL Editor
-- ============================================

-- WHY CHOOSE US TABLE
create table if not exists why_choose_us (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  icon text,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- JOB APPLICATIONS TABLE
create table if not exists job_applications (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text not null,
  position text not null,
  resume_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table why_choose_us enable row level security;
alter table job_applications enable row level security;

-- Why Choose Us Policies
create policy "Enable read access for all users" on why_choose_us for select using (true);
create policy "Enable insert for service role only" on why_choose_us for insert with check (true);
create policy "Enable update for service role only" on why_choose_us for update using (true);
create policy "Enable delete for service role only" on why_choose_us for delete using (true);

-- Job Applications Policies
create policy "Enable read access for service role only" on job_applications for select using (true);
create policy "Enable insert for all users" on job_applications for insert with check (true);
create policy "Enable update for service role only" on job_applications for update using (true);
create policy "Enable delete for service role only" on job_applications for delete using (true);

-- Create Storage Bucket for Resumes
insert into storage.buckets (id, name, public) 
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

-- Storage Policy: Allow Public Read for Resumes (admin only)
create policy "Resume Public Access"
  on storage.objects for select
  using ( bucket_id = 'resumes' );

-- Storage Policy: Allow Authenticated Uploads for Resumes
create policy "Resume Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'resumes' );

create policy "Resume Updates"
  on storage.objects for update
  using ( bucket_id = 'resumes' );
  
create policy "Resume Deletes"
  on storage.objects for delete
  using ( bucket_id = 'resumes' );

-- ============================================
-- OPTIONAL: Add default theme color settings
-- ============================================
-- Uncomment the lines below if you want to add default theme colors to your settings table

/*
INSERT INTO settings (key, value, description) 
VALUES 
  ('theme_primary', '#b28e5d', 'Primary brand color (gold/brown)'),
  ('theme_accent', '#FDCDCA', 'Accent/background color (pink)'),
  ('theme_dark', '#0D0000', 'Dark text/UI color')
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  description = EXCLUDED.description;
*/


