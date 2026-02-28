# Production Environment Variables

**⚠️ IMPORTANT: These credentials are for PRODUCTION only. Do NOT use in local development.**

## Production Supabase Project

- **URL**: `https://YOUR_PROD_PROJECT_ID.supabase.co`
- **Anon Key**: `YOUR_PROD_ANON_KEY`
- **Service Role Key**: `YOUR_PROD_SERVICE_ROLE_KEY`

## Where to Add These

### Vercel Dashboard

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables **ONLY for Production environment**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROD_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PROD_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_PROD_SERVICE_ROLE_KEY
ADMIN_PASSWORD=your-strong-production-password
```

### Additional Production Variables

```env
# Email Service (Production)
RESEND_API_KEY=re_your_production_resend_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=contact@yourdomain.com

# App URL (Production)
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Environment Separation

- **Development**: Uses your dev project (from `.env.local`)
- **Production**: Uses your prod project (from Vercel)

## Security Notes

- ✅ Never commit production keys to Git
- ✅ Never use production keys in `.env.local`
- ✅ Production keys should only be in Vercel environment variables
- ✅ Use strong `ADMIN_PASSWORD` for production


