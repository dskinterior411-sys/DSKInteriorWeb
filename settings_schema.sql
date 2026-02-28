-- SETTINGS TABLE
create table if not exists settings (
  key text primary key,
  value text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Settings Policies
alter table settings enable row level security;

create policy "Enable read access for all users" on settings for select using (true);
create policy "Enable insert for service role only" on settings for insert with check (true);
create policy "Enable update for service role only" on settings for update using (true);
create policy "Enable delete for service role only" on settings for delete using (true);

-- Seed Default Settings
insert into settings (key, value, description) values
('contact_phone', '+91 92261 46504', 'Main contact phone number'),
('contact_email', 'dskinteriorsofficial@gmail.com', 'Primary contact email'),
('contact_address', 'Shop No 3, Aaradhya Nakshtra, Near Ashoka College, Chandshi, Nashik 422003', 'Physical office address'),
('social_instagram', 'https://instagram.com/dskinteriorsofficial?igsh=Yml0dThwdm1lMTZo&utm_source=qr', 'Instagram profile URL'),
('social_facebook', 'https://www.facebook.com/dskinteriors', 'Facebook profile URL'),
('social_linkedin', 'https://www.linkedin.com/company/dsk-interiors', 'LinkedIn profile URL'),
('social_youtube', 'https://www.youtube.com/@DskInteriors', 'YouTube channel URL'),
('hero_title', 'ELEVATING YOUR SPACE', 'Main heading on the home page'),
('hero_subtitle', 'Inspired Interiors for Modern Living', 'Subtitle on the home page'),
('hero_image', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000', 'Background image for the hero section'),
('about_image', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000', 'Main image in the About section'),
('about_story', 'At DSK Interiors, we believe that luxury is not just about aesthetics, but about the feeling of belonging. With over 6 years of experience transforming spaces in Nashik, Pune, and Mumbai, we blend functionality with sophisticated design to create homes and offices that inspire.', 'Company story text')
on conflict (key) do nothing;
