# Data Migration Guide: Production → Development

This guide will help you copy all data from your production Supabase database to your development database.

## ⚠️ Important Notes

- **Source**: Production database (`bupbpxipmpqbwxknsazq.supabase.co`)
- **Destination**: Development database (`dksbskydjrmkyvoaeelc.supabase.co`)
- **This is a ONE-WAY copy** - it won't affect production data
- **Development database will be overwritten** - make sure it's empty or you're okay losing existing data

## Method 1: Using Supabase Dashboard (Recommended - Easiest)

### Step 1: Export from Production

1. **Go to Production Supabase Dashboard:**
   - Visit [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your **production project** (`bupbpxipmpqbwxknsazq`)

2. **For each table, export data:**
   - Go to **Table Editor**
   - Select a table (e.g., `projects`)
   - Click **"..." menu** → **"Export as CSV"** or **"Copy rows"**
   - Repeat for: `projects`, `testimonials`, `services`, `stats`, `settings`, `locations`

3. **Or use SQL Editor:**
   - Go to **SQL Editor**
   - Run the queries from `export_production_data.sql`
   - Copy the INSERT statements

### Step 2: Import to Development

1. **Go to Development Supabase Dashboard:**
   - Select your **development project** (`dksbskydjrmkyvoaeelc`)

2. **Ensure schema exists:**
   - Go to **SQL Editor**
   - Run `supabase_schema.sql` (if not already done)
   - This creates all tables with proper structure

3. **Import data:**
   - **Option A: Using Table Editor**
     - Go to **Table Editor** → Select table
     - Click **"Insert row"** → Paste data manually (for small datasets)
   
   - **Option B: Using SQL Editor** (Recommended for large datasets)
     - Go to **SQL Editor**
     - Paste the INSERT statements from Step 1
     - Click **"Run"**

## Method 2: Using SQL Scripts (Automated)

### Step 1: Generate Export Script

1. **In Production Supabase:**
   - Go to **SQL Editor**
   - Run this query to generate INSERT statements:

```sql
-- Copy all projects
SELECT 
  'INSERT INTO projects (id, title, description, category, images, location, year, featured, created_at) VALUES (' ||
  quote_literal(id::text) || ', ' ||
  quote_literal(title) || ', ' ||
  COALESCE(quote_literal(description), 'NULL') || ', ' ||
  COALESCE(quote_literal(category), 'NULL') || ', ' ||
  quote_literal(images::text) || '::text[], ' ||
  COALESCE(quote_literal(location), 'NULL') || ', ' ||
  COALESCE(year::text, 'NULL') || ', ' ||
  featured::text || ', ' ||
  quote_literal(created_at::text) || ');' as insert_statement
FROM projects
ORDER BY created_at;
```

2. **Copy all the INSERT statements** from the results

3. **Repeat for other tables:**
   - `testimonials`
   - `services`
   - `stats`
   - `settings`
   - `locations` (if exists)

### Step 2: Import to Development

1. **In Development Supabase:**
   - Go to **SQL Editor**
   - Paste all the INSERT statements
   - Click **"Run"**

## Method 3: Using pg_dump (Advanced)

If you have access to `pg_dump`:

```bash
# Export from production
pg_dump "postgresql://postgres:[PASSWORD]@db.bupbpxipmpqbwxknsazq.supabase.co:5432/postgres" \
  --data-only \
  --table=projects \
  --table=testimonials \
  --table=services \
  --table=stats \
  --table=settings \
  --table=locations \
  > production_data.sql

# Import to development
psql "postgresql://postgres:[PASSWORD]@db.dksbskydjrmkyvoaeelc.supabase.co:5432/postgres" \
  < production_data.sql
```

## Quick Copy Script (All Tables)

**⚠️ IMPORTANT:** The `locations` table might not exist in production yet (it was just added). Use `migrate_without_locations.sql` if you get an error.

Run this in **Production SQL Editor** to generate all INSERT statements:

```sql
-- Projects
SELECT 'INSERT INTO projects (id, title, description, category, images, location, year, featured, created_at) VALUES (' ||
       quote_literal(id::text) || ', ' ||
       quote_literal(title) || ', ' ||
       COALESCE(quote_literal(description), 'NULL') || ', ' ||
       COALESCE(quote_literal(category), 'NULL') || ', ' ||
       quote_literal(images::text) || '::text[], ' ||
       COALESCE(quote_literal(location), 'NULL') || ', ' ||
       COALESCE(year::text, 'NULL') || ', ' ||
       featured::text || ', ' ||
       quote_literal(created_at::text) || ');'
FROM projects;

-- Testimonials
SELECT 'INSERT INTO testimonials (id, name, role, company, content, rating, image, created_at) VALUES (' ||
       quote_literal(id::text) || ', ' ||
       quote_literal(name) || ', ' ||
       COALESCE(quote_literal(role), 'NULL') || ', ' ||
       COALESCE(quote_literal(company), 'NULL') || ', ' ||
       quote_literal(content) || ', ' ||
       rating::text || ', ' ||
       COALESCE(quote_literal(image), 'NULL') || ', ' ||
       quote_literal(created_at::text) || ');'
FROM testimonials;

-- Services
SELECT 'INSERT INTO services (id, title, description, icon, "order", link, created_at) VALUES (' ||
       quote_literal(id::text) || ', ' ||
       quote_literal(title) || ', ' ||
       quote_literal(description) || ', ' ||
       COALESCE(quote_literal(icon), 'NULL') || ', ' ||
       COALESCE("order"::text, '0') || ', ' ||
       COALESCE(quote_literal(link), 'NULL') || ', ' ||
       quote_literal(created_at::text) || ');'
FROM services;

-- Stats
SELECT 'INSERT INTO stats (id, label, value, "order", created_at) VALUES (' ||
       quote_literal(id::text) || ', ' ||
       quote_literal(label) || ', ' ||
       quote_literal(value) || ', ' ||
       COALESCE("order"::text, '0') || ', ' ||
       quote_literal(created_at::text) || ');'
FROM stats;

-- Settings
SELECT 'INSERT INTO settings (key, value, description, created_at) VALUES (' ||
       quote_literal(key) || ', ' ||
       COALESCE(quote_literal(value), 'NULL') || ', ' ||
       COALESCE(quote_literal(description), 'NULL') || ', ' ||
       quote_literal(created_at::text) || ');'
FROM settings;

-- Locations (if exists)
SELECT 'INSERT INTO locations (id, city, description, image, "order", created_at) VALUES (' ||
       quote_literal(id::text) || ', ' ||
       quote_literal(city) || ', ' ||
       COALESCE(quote_literal(description), 'NULL') || ', ' ||
       COALESCE(quote_literal(image), 'NULL') || ', ' ||
       COALESCE("order"::text, '0') || ', ' ||
       quote_literal(created_at::text) || ');'
FROM locations;
```

## Step-by-Step Instructions

### 1. Prepare Development Database

1. Go to **Development Supabase** (`dksbskydjrmkyvoaeelc`)
2. **SQL Editor** → Run `supabase_schema.sql`
3. This creates all tables (empty)

### 2. Export from Production

1. Go to **Production Supabase** (`bupbpxipmpqbwxknsazq`)
2. **SQL Editor** → Run the queries above
3. **Copy all INSERT statements** from results

### 3. Import to Development

1. Go back to **Development Supabase**
2. **SQL Editor** → Paste all INSERT statements
3. Click **"Run"**
4. Verify data appears in **Table Editor**

## Verification

After migration, verify in Development Supabase:

1. **Table Editor** → Check each table has data:
   - ✅ `projects` - should have your projects
   - ✅ `testimonials` - should have testimonials
   - ✅ `services` - should have services
   - ✅ `stats` - should have statistics
   - ✅ `settings` - should have settings
   - ✅ `locations` - should have locations (if exists)

2. **Test in your app:**
   - Visit `http://localhost:3000`
   - Check homepage loads data
   - Check admin panel shows data

## Troubleshooting

### Error: "relation does not exist"
- **Fix**: Run `supabase_schema.sql` in development first

### Error: "duplicate key value"
- **Fix**: Clear development tables first:
  ```sql
  TRUNCATE TABLE projects, testimonials, services, stats, settings, locations CASCADE;
  ```

### Error: "invalid input syntax"
- **Fix**: Check for special characters in data - may need to escape them

### Data not appearing
- **Fix**: Check RLS policies are set correctly (run `supabase_schema.sql`)

## Notes

- **UUIDs are preserved** - same IDs in both databases
- **Timestamps are preserved** - created_at dates stay the same
- **Images/URLs** - should work if they're public URLs
- **Storage files** - if using Supabase Storage, those need separate migration

## After Migration

1. ✅ Test your local app with development database
2. ✅ Verify all data appears correctly
3. ✅ Test admin panel functionality
4. ✅ You can now safely test without affecting production!

