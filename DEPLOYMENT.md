# Deployment Guide - Vercel

This guide will help you deploy your DSK Interior website to Vercel (free tier).

## Prerequisites

- ✅ Code pushed to GitHub (or GitLab/Bitbucket)
- ✅ Supabase database set up
- ✅ Resend account set up (optional but recommended)
- ✅ All environment variables ready

## Step 1: Push Code to GitHub

If you haven't already:

1. Initialize git (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - DSK Interior website"
   ```

2. Create a new repository on GitHub:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it: `dsk-interior` (or your preferred name)
   - Don't initialize with README
   - Click "Create repository"

3. Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/dsk-interior.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Via Vercel Website (Recommended)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (recommended) or email
   - Authorize Vercel to access your GitHub

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Select your repository (`dsk-interior`)
   - Click **"Import"**

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**
   Click **"Environment Variables"** and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://yyjqwavjkgrjnqtschoq.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   RESEND_API_KEY=your_resend_api_key (if using)
   EMAIL_FROM=noreply@yourdomain.com
   EMAIL_TO=contact@yourdomain.com
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

   ⚠️ **Important**: Add these for all environments (Production, Preview, Development)

5. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option B: Via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Add environment variables when asked

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Step 3: Set Up Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter your domain (e.g., `dskinterior.com`)

2. **Configure DNS**:
   - Vercel will provide DNS records
   - Add them to your domain registrar:
     - Type: `A` or `CNAME`
     - Name: `@` or `www`
     - Value: Vercel's provided value

3. **Wait for Propagation**:
   - DNS changes can take up to 48 hours
   - Usually works within a few minutes

4. **SSL Certificate**:
   - Vercel automatically provisions SSL certificates
   - Your site will be HTTPS automatically

## Step 4: Update Environment Variables

After deployment, update `NEXT_PUBLIC_APP_URL`:

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_APP_URL` to your actual domain:
   ```
   NEXT_PUBLIC_APP_URL=https://dskinterior.com
   ```
3. Redeploy (or it will auto-update on next push)

## Step 5: Verify Deployment

1. **Visit your site**: `https://your-domain.vercel.app`
2. **Test forms**: Submit consultation and contact forms
3. **Check database**: Verify submissions in Supabase
4. **Check emails**: Verify email notifications (if Resend is set up)
5. **Test navigation**: All links should work
6. **Mobile test**: Check responsive design

## Step 6: Continuous Deployment

Vercel automatically deploys on every push to your main branch:

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. Vercel automatically builds and deploys
4. Preview deployments are created for pull requests

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Solution: Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: "Environment variable not found"**
- Solution: Add all environment variables in Vercel dashboard
- Make sure they're added for the correct environment

**Error: "Build timeout"**
- Solution: Free tier has build time limits
- Optimize your build or upgrade plan

### Site Not Loading

**Check**:
- Build logs in Vercel dashboard
- Environment variables are set correctly
- Database connection (Supabase URL and keys)

### Forms Not Working

**Check**:
- Supabase environment variables are correct
- RLS policies are set up correctly
- API routes are working (check Vercel function logs)

### Emails Not Sending

**Check**:
- Resend API key is correct
- Domain is verified (for production)
- Check Resend dashboard for logs

## Vercel Free Tier Limits

- **100GB bandwidth/month** - Plenty for most sites
- **100 builds/month** - More than enough
- **Automatic SSL** - Included
- **Custom domains** - Unlimited
- **Preview deployments** - Unlimited

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Forms submit successfully
- [ ] Database saves submissions
- [ ] Emails are being sent (if configured)
- [ ] Custom domain working (if set up)
- [ ] SSL certificate active
- [ ] Mobile responsive
- [ ] All links work
- [ ] Analytics set up (if using)

## Monitoring

Vercel provides:
- **Analytics**: Page views, visitors (on paid plans)
- **Logs**: Function logs, build logs
- **Performance**: Core Web Vitals
- **Uptime**: Site availability

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- Check build logs in Vercel dashboard for errors

---

**Ready to deploy?** Follow the steps above and your site will be live in minutes!






