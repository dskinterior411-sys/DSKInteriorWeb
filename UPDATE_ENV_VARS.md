# Update Environment Variables - Development

**This file is for LOCAL DEVELOPMENT only. For production, see `PRODUCTION_ENV_VARS.md`**

## Development Supabase Project

Your **development** Supabase project details:
- **URL**: `https://YOUR_DEV_PROJECT_ID.supabase.co`
- **Anon Key**: `YOUR_DEV_ANON_KEY`
- **Service Role Key**: `YOUR_DEV_SERVICE_ROLE_KEY`

## Steps to Setup:

1. **Copy `.env.example` to `.env.local`:**
   ```bash
   cp .env.example .env.local
   ```

2. **Or manually create `.env.local` with these variables:**
   ```env
# Development Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_DEV_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_DEV_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_DEV_SERVICE_ROLE_KEY
   
   # Admin Password
   ADMIN_PASSWORD=your-secure-password-here
   ```

3. **Save the file**

4. **Restart your dev server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

5. **Clear browser cache** (optional but recommended):
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

6. **Test the services page again**

## Verify the Fix:

After restarting, check:
- The services page should load
- Browser console (F12) should show no connection errors
- The URL in error messages should match: `dksbskydjrmkyvoaeelc.supabase.co`

## Environment Separation

- ✅ **Development**: Uses your dev project (local `.env.local`)
- ✅ **Production**: Uses your prod project (Vercel environment variables)

See `PRODUCTION_ENV_VARS.md` for production setup.


