# Environment Setup Guide

## Current Situation

You now have **separate Supabase projects** for development and production:
- **Development**: `YOUR_DEV_PROJECT_ID.supabase.co` (from `.env.local`)
- **Production**: `YOUR_PROD_PROJECT_ID.supabase.co` (from Vercel environment variables)

✅ **Environment separation is now configured!**

## Recommended: Separate Environments

### Option 1: Two Separate Supabase Projects (Recommended)

**Benefits:**
- ✅ Safe testing without affecting production
- ✅ Can test schema changes without risk
- ✅ Production data stays protected
- ✅ Can use different database sizes/plans

**Setup:**

1. **Create a New Supabase Project for Development:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project: `DSK Interior - Development`
   - Copy the new project URL and keys

2. **Update Local Development (`.env.local`):**
   ```env
   # Development Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_DEV_PROJECT_ID.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_DEV_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY=YOUR_DEV_SERVICE_ROLE_KEY
   ```
   
   **✅ Already configured!** Your `.env.local` should use these development credentials.

3. **Keep Production Supabase in Vercel:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Use production Supabase credentials for Production environment:
     - URL: `https://YOUR_PROD_PROJECT_ID.supabase.co`
     - Anon Key: `YOUR_PROD_ANON_KEY`
     - Service Role Key: `YOUR_PROD_SERVICE_ROLE_KEY`
   - See `PRODUCTION_ENV_VARS.md` for complete production setup

4. **Run Database Schema on Both:**
   - Run `supabase_schema.sql` on development project
   - Run `supabase_schema.sql` on production project
   - Keep schemas in sync

### Option 2: Same Project, Different Tables (Not Recommended)

You could use table prefixes or schemas, but this is more complex and error-prone.

## Environment Variable Strategy

### Local Development (`.env.local`)
```env
# Development Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_DEV_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_DEV_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_DEV_SERVICE_ROLE_KEY

# Admin
ADMIN_PASSWORD=your-secure-password-here

# Email (Optional - can use test domain)
RESEND_API_KEY=re_test_key
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your-test-email@example.com
```

### Vercel Environment Variables

**Production Environment:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROD_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PROD_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_PROD_SERVICE_ROLE_KEY
ADMIN_PASSWORD=strong-production-password
RESEND_API_KEY=re_prod_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=contact@yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

**Preview/Development Environment (Optional):**
- Can use development Supabase credentials
- Or use production (if you want previews to use real data)

## Migration Steps (If You Want to Separate)

1. **Create Development Supabase Project**
   - Sign up at supabase.com
   - Create new project
   - Run `supabase_schema.sql` in SQL Editor

2. **Update Local `.env.local`**
   - Change to development project credentials

3. **Keep Production in Vercel**
   - Don't change production environment variables
   - Production continues using current Supabase project

4. **Test Locally**
   - Verify everything works with dev project
   - Test admin panel, forms, etc.

5. **Deploy to Production**
   - Production still uses production Supabase
   - No changes needed

## Quick Decision Guide

**Use Same Project If:**
- ✅ You're just starting out
- ✅ You don't have much data yet
- ✅ You're okay with test data in production database
- ✅ You want simplicity

**Use Separate Projects If:**
- ✅ You have real client data
- ✅ You want to test safely
- ✅ You're making schema changes
- ✅ You want production stability

## Current Status

✅ **Environment separation is now configured!**

1. **Development Project**: `YOUR_DEV_PROJECT_ID.supabase.co` (for local testing)
2. **Production Project**: `YOUR_PROD_PROJECT_ID.supabase.co` (for live site)

### Next Steps

1. **Update your `.env.local` file** with development credentials (see `.env.example`)
2. **Run database schema** on development project:
   - Go to Supabase Dashboard → SQL Editor
   - Run `supabase_schema.sql` on the development project
3. **Verify Vercel** has production credentials (see `PRODUCTION_ENV_VARS.md`)
4. **Test locally** - everything should connect to development project
5. **Deploy to production** - will use production project automatically

### Important Notes

- ✅ Development and production are now completely separate
- ✅ Test data stays in development project
- ✅ Production data is protected
- ✅ Safe to test schema changes in development

