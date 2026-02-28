# Environment Setup Instructions

## ✅ Quick Setup

### Option 1: Use the Setup Script (Recommended)

```bash
./setup-dev-env.sh
```

This will automatically update your `.env.local` file with development credentials.

### Option 2: Manual Setup

1. **Open `.env.local` file** in the project root (create it if it doesn't exist)

2. **Add/Update these variables:**

```env
# Development Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_DEV_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_DEV_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_DEV_SERVICE_ROLE_KEY

# Admin Password (change this!)
ADMIN_PASSWORD=your-secure-password-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Save the file**

## 🔄 After Setup

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Set up the development database:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your **development project** (your project ID)
   - Go to SQL Editor
   - Run the SQL from `supabase_schema.sql`
   - This creates all necessary tables (projects, services, locations, etc.)

3. **Test the connection:**
   - Visit `http://localhost:3000/admin/services`
   - Should load without errors
   - Browser console should show your development project URL

## 📊 Environment Summary

| Environment | Supabase Project | Where Configured |
|------------|------------------|------------------|
| **Development** | Your Dev Project ID | `.env.local` (local file) |
| **Production** | Your Prod Project ID | Vercel Dashboard → Environment Variables |

## 🔒 Security Notes

- ✅ `.env.local` is in `.gitignore` - won't be committed
- ✅ Development credentials are safe to use locally
- ✅ Production credentials should ONLY be in Vercel
- ✅ Never commit `.env.local` to Git

## 📚 Related Files

- `.env.example` - Template for environment variables
- `PRODUCTION_ENV_VARS.md` - Production credentials reference
- `ENVIRONMENT_SETUP.md` - Detailed environment setup guide
- `UPDATE_ENV_VARS.md` - Quick reference for development setup

## 🆘 Troubleshooting

**Connection errors?**
- Check `.env.local` has correct development URL
- Restart dev server after changing `.env.local`
- Hard refresh browser (Cmd+Shift+R)

**Database errors?**
- Make sure you ran `supabase_schema.sql` on development project
- Check RLS policies are set correctly
- Verify you're using development project, not production


