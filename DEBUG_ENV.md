# Debugging Environment Variables

## Issue: API calls still going to production

If you've updated `.env.local` but API calls are still going to production, follow these steps:

## Step 1: Verify .env.local File

1. **Check the file exists and has correct values:**
   ```bash
   cat .env.local
   ```

2. **Should show:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_DEV_PROJECT_ID.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_DEV_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY=YOUR_DEV_SERVICE_ROLE_KEY
   ```

3. **If it shows production URL (`bupbpxipmpqbwxknsazq`), update it:**
   ```bash
   ./setup-dev-env.sh
   # OR manually edit .env.local
   ```

## Step 2: Restart Dev Server

**CRITICAL:** Next.js only reads `.env.local` when the server starts!

1. **Stop the current dev server:**
   - Press `Ctrl+C` in the terminal where `npm run dev` is running

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Wait for it to fully start** (you'll see "Ready" message)

## Step 3: Clear Browser Cache

1. **Hard refresh the browser:**
   - Mac: `Cmd + Shift + R`
   - Windows/Linux: `Ctrl + Shift + R`

2. **Or clear cache completely:**
   - Open DevTools (F12)
   - Right-click refresh button → "Empty Cache and Hard Reload"

## Step 4: Verify Environment Variables Are Loaded

1. **Open browser console** (F12)
2. **Visit any admin page** (e.g., `/admin/services`)
3. **Check console logs** - should show:
   ```
   🔍 Debug Info: {
     supabaseUrl: "https://YOUR_DEV_PROJECT_ID.supabase.co",
     hasAnonKey: true,
     environment: "Development"
   }
   ```

4. **If it shows production URL**, the server didn't pick up `.env.local`:
   - Stop server completely
   - Check `.env.local` file again
   - Restart server
   - Hard refresh browser

## Step 5: Check Network Tab

1. **Open DevTools → Network tab**
2. **Filter by "supabase"**
3. **Check the requests** - should go to:
   - ✅ Your development project URL (development)
   - ❌ NOT your production project URL (production)

## Common Issues

### Issue 1: Server not restarted
**Symptom:** Still using old URL even after updating `.env.local`
**Fix:** Stop and restart `npm run dev`

### Issue 2: Browser cache
**Symptom:** Old JavaScript bundle with old URL
**Fix:** Hard refresh (Cmd+Shift+R) or clear cache

### Issue 3: Wrong .env.local location
**Symptom:** Changes not taking effect
**Fix:** Ensure `.env.local` is in project root (same folder as `package.json`)

### Issue 4: Typo in variable name
**Symptom:** URL not loading
**Fix:** Check variable names:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` (correct)
- ❌ `NEXT_PUBLIC_SUPABASE_URLS` (wrong - extra S)
- ❌ `SUPABASE_URL` (wrong - missing NEXT_PUBLIC_)

### Issue 5: Multiple .env files
**Symptom:** Conflicting values
**Fix:** Check for:
- `.env`
- `.env.local`
- `.env.development`
- `.env.production`

Next.js priority: `.env.local` > `.env.development` > `.env`

## Quick Test

Run this in your terminal to verify `.env.local`:
```bash
# Check if file exists and has correct URL
grep "NEXT_PUBLIC_SUPABASE_URL" .env.local

# Should output:
# NEXT_PUBLIC_SUPABASE_URL=https://YOUR_DEV_PROJECT_ID.supabase.co
```

## Still Not Working?

1. **Delete `.next` folder** (Next.js cache):
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Check for typos** in `.env.local`:
   - No extra spaces
   - No quotes around values (unless needed)
   - Correct variable names

3. **Verify file encoding:**
   - Should be UTF-8
   - No special characters

4. **Check terminal output** when starting dev server:
   - Should NOT show any environment variable warnings
   - Should show "Ready" message


