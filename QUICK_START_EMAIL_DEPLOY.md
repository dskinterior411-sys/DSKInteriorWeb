# Quick Start: Email & Deployment

## Part 1: Set Up Email Notifications (Resend)

### Step 1: Install Resend Package

```bash
npm install resend
```

### Step 2: Create Resend Account

1. Go to [resend.com](https://resend.com) and sign up
2. Get your API key from the dashboard
3. Add to `.env.local`:

```env
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=onboarding@resend.dev  # For testing, or your verified domain
EMAIL_TO=your-email@example.com    # Where to receive form submissions
```

### Step 3: Test Email

1. Restart your dev server: `npm run dev`
2. Submit a consultation form
3. Check your email inbox
4. Check the user's email (auto-reply)

**Done!** Email notifications are now active.

---

## Part 2: Deploy to Vercel

### Step 1: Push to GitHub

```bash
# If not already done
git init
git add .
git commit -m "DSK Interior website ready for deployment"
git remote add origin https://github.com/yourusername/dsk-interior.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New Project"**
3. Import your repository
4. **Add Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY` (if using)
   - `EMAIL_FROM`
   - `EMAIL_TO`
   - `NEXT_PUBLIC_APP_URL` (update after deployment)

5. Click **"Deploy"**
6. Wait 2-3 minutes
7. Your site is live! 🎉

### Step 3: Set Custom Domain (Optional)

1. In Vercel → Settings → Domains
2. Add your domain
3. Update DNS records
4. Wait for SSL (automatic)

---

## That's It!

Your website is now:
- ✅ Live on the internet
- ✅ Sending email notifications
- ✅ Saving form submissions to database
- ✅ Fully functional

See `DEPLOYMENT.md` for detailed instructions.






