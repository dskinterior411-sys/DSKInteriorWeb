# Migration Troubleshooting Guide

## Common Errors and Solutions

### Error: "duplicate key value violates unique constraint"

**Problem:** Table already has data (from seed scripts or previous migration)

**Solution Options:**

#### Option 1: Use UPSERT (ON CONFLICT) - Recommended

Instead of plain INSERT, use:
```sql
INSERT INTO settings (key, value, description, created_at) VALUES 
('key_name', 'value', 'description', 'timestamp')
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  description = EXCLUDED.description;
```

This will:
- ✅ Insert if key doesn't exist
- ✅ Update if key already exists
- ✅ No errors!

#### Option 2: Clear Table First

```sql
-- Clear all data (be careful!)
TRUNCATE TABLE settings CASCADE;

-- Then run your INSERT statements
```

#### Option 3: Delete Specific Rows

```sql
-- Delete only conflicting rows
DELETE FROM settings WHERE key IN ('about_image', 'about_story', ...);

-- Then run your INSERT statements
```

### Error: "relation does not exist"

**Problem:** Table hasn't been created yet

**Solution:**
1. Run `supabase_schema.sql` first to create all tables
2. Run `settings_schema.sql` to create settings table
3. Then run your INSERT statements

### Error: "permission denied"

**Problem:** RLS policies blocking the operation

**Solution:**
1. Make sure you ran `supabase_schema.sql` which sets up RLS policies
2. Or temporarily disable RLS:
   ```sql
   ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
   -- Run your inserts
   ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
   ```

## Quick Fix for Settings

If you're getting duplicate key errors on settings:

1. **Use the fixed script:**
   - Open `fix_settings_insert.sql`
   - Copy and run in Development Supabase SQL Editor

2. **Or manually fix each INSERT:**
   - Add `ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, description = EXCLUDED.description;`
   - To the end of each INSERT statement

## Migration Best Practices

1. **Always use UPSERT for settings:**
   ```sql
   INSERT ... ON CONFLICT (key) DO UPDATE SET ...
   ```

2. **For other tables, check if data exists:**
   ```sql
   -- Check before inserting
   SELECT COUNT(*) FROM projects;
   
   -- If > 0, use ON CONFLICT or TRUNCATE first
   ```

3. **Test in small batches:**
   - Don't paste 1000 INSERT statements at once
   - Test with 5-10 first
   - Then do the rest

4. **Keep backups:**
   - Export data before clearing tables
   - Save INSERT statements to a file


