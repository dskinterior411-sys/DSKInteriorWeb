# Row Level Security (RLS) Policies - Quick Guide

## For Projects Table (Public Read Access)

When creating the policy "Allow public read access" on `public.projects`:

**Policy Name:** `Allow public read access`  
**Allowed Operation:** `SELECT`  
**Target Roles:** `public`  
**USING expression:** 
```sql
true
```

**WITH CHECK expression:** (leave empty or use `true`)

This allows anyone to read/view all projects in the portfolio.

---

## For Consultation Requests Table (Public Insert Only)

**Policy Name:** `Allow public insert`  
**Allowed Operation:** `INSERT`  
**Target Roles:** `public`  
**USING expression:** (leave empty)  
**WITH CHECK expression:**
```sql
true
```

This allows anyone to submit consultation requests.

---

## For Contact Submissions Table (Public Insert Only)

**Policy Name:** `Allow public insert`  
**Allowed Operation:** `INSERT`  
**Target Roles:** `public`  
**USING expression:** (leave empty)  
**WITH CHECK expression:**
```sql
true
```

This allows anyone to submit contact form messages.

---

## Quick Setup via SQL (Alternative Method)

If you prefer to set up policies via SQL instead of the UI:

1. Go to **SQL Editor** in Supabase
2. Run this script:

```sql
-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Projects: Allow public read access
CREATE POLICY "Allow public read access" ON projects
    FOR SELECT
    TO public
    USING (true);

-- Consultation Requests: Allow public insert
CREATE POLICY "Allow public insert" ON consultation_requests
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Contact Submissions: Allow public insert
CREATE POLICY "Allow public insert" ON contact_submissions
    FOR INSERT
    TO public
    WITH CHECK (true);
```

This is faster than using the UI!







