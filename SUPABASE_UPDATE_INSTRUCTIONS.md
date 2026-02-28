# Supabase Update Instructions

## New Features Added

The following new features require database updates:

1. **Why Choose Us** - New table for managing features in the About section
2. **Career Section** - New table for job applications and storage bucket for resumes
3. **Theme Colors** - New settings keys (optional, can be added via admin panel)

## Steps to Update Supabase

### Option 1: Run Migration Script (Recommended)

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Open the file `migrate_new_features.sql` from this project
4. Copy and paste the entire content into the SQL Editor
5. Click **Run** to execute the script
6. Verify the tables were created by checking the **Table Editor**

### Option 2: Run Full Schema (If starting fresh)

If you're setting up a new database or want to ensure everything is in sync:

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Open the file `supabase_schema.sql` from this project
4. Copy and paste the entire content into the SQL Editor
5. Click **Run** to execute the script

## What Gets Created

### Tables:
- `why_choose_us` - Stores "Why Choose Us" items for the About section
- `job_applications` - Stores job application submissions

### Storage Buckets:
- `resumes` - Private bucket for storing uploaded resumes (PDF/Word documents)

### Policies:
- All tables have appropriate RLS (Row Level Security) policies
- Storage bucket has policies for uploads and access

## Verify Installation

After running the migration:

1. **Check Tables**: Go to **Table Editor** and verify you see:
   - `why_choose_us`
   - `job_applications`

2. **Check Storage**: Go to **Storage** and verify you see:
   - `resumes` bucket

3. **Test Admin Panel**: 
   - Navigate to `/admin/why-choose-us` - should load without errors
   - Navigate to `/admin/careers` - should load without errors

## Optional: Add Theme Color Settings

Theme colors can be added via the admin panel at `/admin/general`, or you can uncomment the INSERT statements at the bottom of `migrate_new_features.sql` to add default values.

## Troubleshooting

### Error: "relation already exists"
- This means the table/bucket already exists. The script uses `IF NOT EXISTS` so it's safe to run again.

### Error: "policy already exists"
- If you see this, the policies were already created. You can safely ignore or drop and recreate them.

### Storage bucket not appearing
- Go to **Storage** → **Buckets** and manually create the `resumes` bucket if needed:
  - Name: `resumes`
  - Public: `false` (private)

## Development vs Production

**Important**: Run this migration in BOTH environments:
- ✅ Development database (for testing)
- ✅ Production database (for live site)

Make sure you're connected to the correct Supabase project before running the script!


