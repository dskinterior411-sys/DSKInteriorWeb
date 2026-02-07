# Deploy to Vercel - Quick Steps

Your code is on GitHub! Now let's deploy it to Vercel.

## Step 1: Sign Up/Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. **Sign up with GitHub** (recommended - easiest way)

## Step 2: Import Your Project

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories
3. Find **"dsk-interior"** (or your repo name)
4. Click **"Import"**

## Step 3: Configure Project

Vercel will auto-detect Next.js. Just verify:

- **Framework Preset**: Next.js ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅
- **Install Command**: `npm install` ✅

## Step 4: Add Environment Variables

**IMPORTANT:** Before deploying, add all environment variables:

Click **"Environment Variables"** and add these:

```
NEXT_PUBLIC_SUPABASE_URL
https://yyjqwavjkgrjnqtschoq.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
sb_publishable_qyaWe3wC8dubxPvVaK9kZA_Qw69L3II

SUPABASE_SERVICE_ROLE_KEY
sb_secret_Gzg0K_U0tRCoGIbj50iA4g_BKKAmJ1Y

RESEND_API_KEY
(re_your_resend_api_key_here - if you have it)

EMAIL_FROM
onboarding@resend.dev (or your verified domain)

EMAIL_TO
your-email@example.com

NEXT_PUBLIC_APP_URL
https://your-project.vercel.app (update after first deploy)
```

**Make sure to add for all environments:**
- ✅ Production
- ✅ Preview  
- ✅ Development

## Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your site will be live! 🎉

## Step 6: Get Your Live URL

After deployment, Vercel will give you a URL like:
- `https://dsk-interior.vercel.app`

**Update `NEXT_PUBLIC_APP_URL`** in environment variables with this URL, then redeploy.

## Step 7: Test Your Live Site

1. Visit your Vercel URL
2. Test all pages
3. Submit a form
4. Check Supabase - data should be saved
5. Check your email - notifications should arrive (if Resend is set up)

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Make sure all environment variables are set
- Verify `package.json` has all dependencies

### Forms Not Working
- Check Supabase environment variables
- Verify RLS policies are set up
- Check Vercel function logs

### Emails Not Sending
- Verify Resend API key is correct
- Check Resend dashboard for logs
- Make sure EMAIL_FROM and EMAIL_TO are set

## Next: Custom Domain (Optional)

1. In Vercel → Settings → Domains
2. Add your domain
3. Update DNS records
4. Wait for SSL (automatic)

---

**That's it!** Your website will be live in minutes! 🚀



