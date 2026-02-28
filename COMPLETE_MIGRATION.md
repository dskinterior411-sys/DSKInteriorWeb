# Complete Migration Guide - Remaining Tables

You've successfully migrated **Settings**. Now let's migrate the remaining tables:

## Tables to Migrate

- ✅ Settings (Done!)
- ⏳ Projects
- ⏳ Testimonials
- ⏳ Services
- ⏳ Stats
- ⏳ Locations (optional - can add manually)

## Step-by-Step Instructions

### Step 1: Export from Production

1. **Go to Production Supabase:**
   - [bupbpxipmpqbwxknsazq](https://supabase.com/dashboard/project/bupbpxipmpqbwxknsazq)
   - Open **SQL Editor**

2. **Run queries from `migrate_remaining_tables.sql`:**

   **For each table, run the SELECT query and copy the INSERT statements:**

   **a) Projects:**
   ```sql
   SELECT 'INSERT INTO projects (id, title, description, category, images, location, year, featured, created_at) VALUES (' ||
          quote_literal(id::text) || ', ' ||
          quote_literal(title) || ', ' ||
          COALESCE(quote_literal(description), 'NULL') || ', ' ||
          COALESCE(quote_literal(category), 'NULL') || ', ' ||
          quote_literal(COALESCE(images::text, '{}')) || '::text[], ' ||
          COALESCE(quote_literal(location), 'NULL') || ', ' ||
          COALESCE(year::text, 'NULL') || ', ' ||
          featured::text || ', ' ||
          quote_literal(created_at::text) || ');' as sql_statement
   FROM projects
   ORDER BY created_at;
   ```
   - Copy all INSERT statements from results

   **b) Testimonials:**
   ```sql
   SELECT 'INSERT INTO testimonials (id, name, role, company, content, rating, image, created_at) VALUES (' ||
          quote_literal(id::text) || ', ' ||
          quote_literal(name) || ', ' ||
          COALESCE(quote_literal(role), 'NULL') || ', ' ||
          COALESCE(quote_literal(company), 'NULL') || ', ' ||
          quote_literal(content) || ', ' ||
          rating::text || ', ' ||
          COALESCE(quote_literal(image), 'NULL') || ', ' ||
          quote_literal(created_at::text) || ');' as sql_statement
   FROM testimonials
   ORDER BY created_at;
   ```
   - Copy all INSERT statements from results

   **c) Services:**
   ```sql
   SELECT 'INSERT INTO services (id, title, description, icon, "order", link, created_at) VALUES (' ||
          quote_literal(id::text) || ', ' ||
          quote_literal(title) || ', ' ||
          quote_literal(description) || ', ' ||
          COALESCE(quote_literal(icon), 'NULL') || ', ' ||
          COALESCE("order"::text, '0') || ', ' ||
          COALESCE(quote_literal(link), 'NULL') || ', ' ||
          quote_literal(created_at::text) || ');' as sql_statement
   FROM services
   ORDER BY "order";
   ```
   - Copy all INSERT statements from results

   **d) Stats:**
   ```sql
   SELECT 'INSERT INTO stats (id, label, value, "order", created_at) VALUES (' ||
          quote_literal(id::text) || ', ' ||
          quote_literal(label) || ', ' ||
          quote_literal(value) || ', ' ||
          COALESCE("order"::text, '0') || ', ' ||
          quote_literal(created_at::text) || ');' as sql_statement
   FROM stats
   ORDER BY "order";
   ```
   - Copy all INSERT statements from results

### Step 2: Import to Development

1. **Go to Development Supabase:**
   - [dksbskydjrmkyvoaeelc](https://supabase.com/dashboard/project/dksbskydjrmkyvoaeelc)
   - Open **SQL Editor**

2. **Paste and run INSERT statements:**
   - Paste all Projects INSERT statements → Run
   - Paste all Testimonials INSERT statements → Run
   - Paste all Services INSERT statements → Run
   - Paste all Stats INSERT statements → Run

3. **Verify in Table Editor:**
   - Check each table has data
   - Projects should show your projects
   - Testimonials should show testimonials
   - Services should show services
   - Stats should show statistics

### Step 3: Add Locations (Optional)

Since locations don't exist in production, add them manually:

**Option A: Via Admin Panel**
- Visit `http://localhost:3000/admin/locations`
- Add: Nashik, Pune, Mumbai

**Option B: Via SQL**
```sql
INSERT INTO locations (city, description, image, "order") VALUES
('Nashik', 'Our home base, delivering exceptional design across the city.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', 1),
('Pune', 'Transforming residential and commercial spaces in the cultural capital.', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800', 2),
('Mumbai', 'Bringing sophisticated luxury to the bustling metropolis.', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800', 3);
```

## Quick Checklist

- [x] Settings migrated
- [ ] Projects exported from production
- [ ] Projects imported to development
- [ ] Testimonials exported from production
- [ ] Testimonials imported to development
- [ ] Services exported from production
- [ ] Services imported to development
- [ ] Stats exported from production
- [ ] Stats imported to development
- [ ] Locations added (manually)
- [ ] Verified all data in Table Editor
- [ ] Tested local app - data appears correctly

## Troubleshooting

### If you get "duplicate key" errors:
- For tables with UUIDs (projects, testimonials, services, stats), this usually means data already exists
- Check Table Editor first - maybe data is already there
- If you want to replace, use: `TRUNCATE TABLE table_name CASCADE;` first

### If you get "relation does not exist":
- Make sure you ran `supabase_schema.sql` in development first
- Check Table Editor to verify tables exist

### If INSERT statements are too long:
- Run them in smaller batches (10-20 at a time)
- Or use the Table Editor to copy/paste rows manually

## After Migration

1. **Test your local app:**
   - Visit `http://localhost:3000`
   - Homepage should show projects, testimonials, services
   - Visit `/admin/projects` - should show your projects
   - Visit `/admin/services` - should show your services

2. **Verify connection:**
   - Browser console should show: `dksbskydjrmkyvoaeelc.supabase.co`
   - All data should load correctly


