# Supabase Setup Guide for DSK Interior

This guide will walk you through setting up Supabase for the DSK Interior website.

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with:
   - GitHub (recommended)
   - Email
   - Google account
4. Verify your email if required

## Step 2: Create a New Project

1. Once logged in, click **"New Project"**
2. Fill in the project details:
   - **Name**: `DSK Interior` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Select **Free** (perfect for initial development)
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be set up

## Step 3: Get Your API Keys

1. In your project dashboard, go to **Settings** (gear icon in sidebar)
2. Click on **API** in the settings menu
3. You'll see:
   - **Project URL**: Copy this (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key**: Copy this (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role key**: Click "Reveal" and copy this (this is your `SUPABASE_SERVICE_ROLE_KEY`)
   - ⚠️ **Important**: Keep the service_role key secret! Never expose it in client-side code.

## Step 4: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor** (in the sidebar)
2. Click **"New query"**
3. Copy and paste the following SQL code:

```sql
-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('residential', 'commercial', 'retail', 'corporate', 'hospitality')),
  images TEXT[] DEFAULT '{}',
  location TEXT,
  year INTEGER,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_type TEXT NOT NULL CHECK (project_type IN ('residential', 'commercial', 'retail', 'corporate', 'hospitality')),
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

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_consultation_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_created ON consultation_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultation_updated_at BEFORE UPDATE ON consultation_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. Click **"Run"** or press `Ctrl+Enter` (or `Cmd+Enter` on Mac)
5. You should see "Success. No rows returned"

## Step 5: Set Up Row Level Security (RLS)

1. Go to **Authentication** → **Policies** in the sidebar
2. Or go to **Table Editor** and click on each table

### For Projects Table (Public Read Access)

1. Go to **Table Editor** → **projects**
2. Click on **"Enable RLS"** if not already enabled
3. Click on **"New Policy"**
4. Create a policy:
   - **Policy Name**: `Allow public read access`
   - **Allowed Operation**: `SELECT`
   - **Policy Definition**: 
     ```sql
     true
     ```
   - Click **"Review"** then **"Save policy"**

### For Consultation Requests (Public Insert Only)

1. Go to **Table Editor** → **consultation_requests**
2. Click on **"Enable RLS"** if not already enabled
3. Click on **"New Policy"**
4. Create a policy:
   - **Policy Name**: `Allow public insert`
   - **Allowed Operation**: `INSERT`
   - **Policy Definition**:
     ```sql
     true
     ```
   - Click **"Review"** then **"Save policy"**

### For Contact Submissions (Public Insert Only)

1. Go to **Table Editor** → **contact_submissions**
2. Click on **"Enable RLS"** if not already enabled
3. Click on **"New Policy"**
4. Create a policy:
   - **Policy Name**: `Allow public insert`
   - **Allowed Operation**: `INSERT`
   - **Policy Definition**:
     ```sql
     true
     ```
   - Click **"Review"** then **"Save policy"**

## Step 6: Add Environment Variables

1. In your project root, create or edit `.env.local`
2. Add your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

3. Replace the values with your actual keys from Step 3
4. ⚠️ **Important**: Never commit `.env.local` to git (it's already in `.gitignore`)

## Step 7: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Try submitting a form on your website
3. Go to Supabase dashboard → **Table Editor** → **consultation_requests**
4. You should see your test submission!

## Step 8: Add Sample Data (Optional)

To test the portfolio page, you can add sample projects:

1. Go to **Table Editor** → **projects**
2. Click **"Insert"** → **"Insert row"**
3. Fill in:
   - **title**: "Modern Luxury Apartment"
   - **description**: "A stunning transformation..."
   - **category**: "residential"
   - **images**: `["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200"]`
   - **location**: "New York, NY"
   - **year**: 2024
   - **featured**: true
4. Click **"Save"**
5. Repeat for more sample projects

## Troubleshooting

### Issue: "Invalid API key"
- **Solution**: Double-check your environment variables in `.env.local`
- Make sure you're using the correct keys (anon key for client, service role for server)

### Issue: "Row Level Security policy violation"
- **Solution**: Make sure RLS policies are set up correctly (Step 5)
- Check that policies allow the operations you need

### Issue: "Table doesn't exist"
- **Solution**: Make sure you ran the SQL script in Step 4
- Check the Table Editor to verify tables were created

### Issue: "Connection refused"
- **Solution**: Check your internet connection
- Verify your Supabase project is active (not paused)
- Free tier projects pause after 1 week of inactivity

## Next Steps

Once Supabase is set up:
1. ✅ Update API routes to use Supabase (see `lib/supabase.ts`)
2. ✅ Test form submissions
3. ✅ Add real project data
4. ✅ Set up email notifications (see RESEND_SETUP.md)

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Need Help?** Check the [NOTES.md](./NOTES.md) file for common issues and solutions.






