# Simple Migration Steps

## The Problem
The `locations` table doesn't exist in production yet (we just added it). So the migration script fails when trying to export locations.

## Solution: Use the Safe Migration Script

### Step 1: Prepare Development Database

1. **Go to Development Supabase:**
   - [dksbskydjrmkyvoaeelc](https://supabase.com/dashboard/project/dksbskydjrmkyvoaeelc)

2. **Run schema files:**
   - **SQL Editor** → Run `supabase_schema.sql` (creates all tables)
   - **SQL Editor** → Run `settings_schema.sql` (creates settings table)

### Step 2: Export from Production (Skip Locations)

1. **Go to Production Supabase:**
   - [bupbpxipmpqbwxknsazq](https://supabase.com/dashboard/project/bupbpxipmpqbwxknsazq)

2. **Use the safe migration script:**
   - **SQL Editor** → Open `migrate_without_locations.sql`
   - **Run each query one by one:**
     - Projects query → Copy all INSERT statements
     - Testimonials query → Copy all INSERT statements
     - Services query → Copy all INSERT statements
     - Stats query → Copy all INSERT statements
     - Settings query → Copy all INSERT statements
   - **Skip Locations** (table doesn't exist in production yet)

### Step 3: Import to Development

1. **Go back to Development Supabase**

2. **SQL Editor** → Paste all INSERT statements you copied

3. **Click "Run"**

4. **Verify in Table Editor:**
   - ✅ Projects should have data
   - ✅ Testimonials should have data
   - ✅ Services should have data
   - ✅ Stats should have data
   - ✅ Settings should have data
   - ⚠️ Locations will be empty (that's okay - you can add them manually)

### Step 4: Add Locations Manually (Optional)

Since locations don't exist in production, you can:

1. **Use the admin panel:**
   - Visit `http://localhost:3000/admin/locations`
   - Add locations manually (Nashik, Pune, Mumbai)

2. **Or add via SQL:**
   ```sql
   INSERT INTO locations (city, description, image, "order") VALUES
   ('Nashik', 'Our home base, delivering exceptional design across the city.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', 1),
   ('Pune', 'Transforming residential and commercial spaces in the cultural capital.', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800', 2),
   ('Mumbai', 'Bringing sophisticated luxury to the bustling metropolis.', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800', 3);
   ```

## Quick Checklist

- [ ] Development database schema created (ran `supabase_schema.sql`)
- [ ] Settings table created (ran `settings_schema.sql`)
- [ ] Exported Projects from production
- [ ] Exported Testimonials from production
- [ ] Exported Services from production
- [ ] Exported Stats from production
- [ ] Exported Settings from production
- [ ] Imported all data to development
- [ ] Verified data appears in Table Editor
- [ ] Added locations manually (if needed)
- [ ] Tested local app - data appears correctly

## Files to Use

- ✅ **Use:** `migrate_without_locations.sql` (safe - skips locations)
- ❌ **Don't use:** `quick_migrate.sql` (will fail on locations)

## After Migration

1. **Test your local app:**
   - Visit `http://localhost:3000`
   - Check homepage shows projects, testimonials, etc.
   - Visit `/admin/services` - should show your services

2. **Verify connection:**
   - Browser console should show: `dksbskydjrmkyvoaeelc.supabase.co`
   - Network tab should show requests to development database


