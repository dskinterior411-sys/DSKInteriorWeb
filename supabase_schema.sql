-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROJECTS TABLE
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  category text,
  images text[] default '{}',
  location text,
  year integer,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TESTIMONIALS TABLE
create table if not exists testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text,
  company text,
  content text not null,
  rating integer default 5,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SERVICES TABLE
create table if not exists services (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  icon text,
  "order" integer default 0,
  link text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- STATS TABLE
create table if not exists stats (
  id uuid default uuid_generate_v4() primary key,
  label text not null,
  value text not null,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- LOCATIONS TABLE
create table if not exists locations (
  id uuid default uuid_generate_v4() primary key,
  city text not null,
  description text,
  image text,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

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
alter table projects enable row level security;
alter table testimonials enable row level security;
alter table services enable row level security;
alter table stats enable row level security;
alter table locations enable row level security;
alter table why_choose_us enable row level security;
alter table job_applications enable row level security;

-- Create policies (Public Read, Authenticated Write)
-- Note: For simplicity in this phase, we are allowing public read. 
-- Write access will be restricted to the service role or authenticated users later.

-- Projects Policies
create policy "Enable read access for all users" on projects for select using (true);
create policy "Enable insert for service role only" on projects for insert with check (true); -- We will refine this for admin auth later
create policy "Enable update for service role only" on projects for update using (true);
create policy "Enable delete for service role only" on projects for delete using (true);

-- Testimonials Policies
create policy "Enable read access for all users" on testimonials for select using (true);
create policy "Enable insert for service role only" on testimonials for insert with check (true);
create policy "Enable update for service role only" on testimonials for update using (true);
create policy "Enable delete for service role only" on testimonials for delete using (true);

-- Services Policies
create policy "Enable read access for all users" on services for select using (true);
create policy "Enable insert for service role only" on services for insert with check (true);
create policy "Enable update for service role only" on services for update using (true);
create policy "Enable delete for service role only" on services for delete using (true);

-- Stats Policies
create policy "Enable read access for all users" on stats for select using (true);
create policy "Enable insert for service role only" on stats for insert with check (true);
create policy "Enable update for service role only" on stats for update using (true);
create policy "Enable delete for service role only" on stats for delete using (true);

-- Locations Policies
create policy "Enable read access for all users" on locations for select using (true);
create policy "Enable insert for service role only" on locations for insert with check (true);
create policy "Enable update for service role only" on locations for update using (true);
create policy "Enable delete for service role only" on locations for delete using (true);

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

-- Create Storage Bucket for Project Images
insert into storage.buckets (id, name, public) 
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- Create Storage Bucket for Resumes
insert into storage.buckets (id, name, public) 
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

-- Storage Policy: Allow Public Read
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'project-images' );

-- Storage Policy: Allow Authenticated Uploads (We'll use service role for now or implement admin auth logic)
create policy "Authenticated Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'project-images' );

create policy "Authenticated Updates"
  on storage.objects for update
  using ( bucket_id = 'project-images' );
  
create policy "Authenticated Deletes"
  on storage.objects for delete
  using ( bucket_id = 'project-images' );

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
