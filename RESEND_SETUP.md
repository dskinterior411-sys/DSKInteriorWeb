# Resend Email Setup Guide

This guide will help you set up Resend for email notifications on your DSK Interior website.

## Step 1: Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click **"Sign Up"** or **"Get Started"**
3. Sign up with:
   - Email
   - GitHub (recommended)
   - Google account
4. Verify your email address

## Step 2: Get Your API Key

1. Once logged in, go to **API Keys** in the sidebar
2. Click **"Create API Key"**
3. Give it a name: `DSK Interior Production` (or any name you prefer)
4. Select permissions: **"Sending access"**
5. Click **"Add"**
6. **Copy your API key immediately** - you won't be able to see it again!

## Step 3: Verify Your Domain (For Production)

For production emails, you need to verify your domain:

1. Go to **Domains** in the sidebar
2. Click **"Add Domain"**
3. Enter your domain (e.g., `dskinterior.com`)
4. Add the DNS records Resend provides to your domain's DNS settings
5. Wait for verification (usually a few minutes)

**Note:** For development/testing, you can use Resend's test domain without verification.

## Step 4: Add to Environment Variables

1. Open your `.env.local` file
2. Add your Resend API key:

```env
# Email Service (Resend)
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=noreply@dskinterior.com
EMAIL_TO=contact@dskinterior.com
```

**For Development/Testing:**
- You can use Resend's test domain: `onboarding@resend.dev`
- Or use your verified domain

## Step 5: Install Resend Package (If Needed)

The project already has email utilities set up. If you need to install Resend:

```bash
npm install resend
```

## Step 6: Update Email Code

The email code is already prepared in `lib/email.ts`. You just need to uncomment it in the API routes.

## Step 7: Test Email Sending

1. Submit a consultation form
2. Check your email inbox (the EMAIL_TO address)
3. Check the user's email (they should receive an auto-reply)

## Resend Free Tier Limits

- **100 emails/day** on free tier
- Perfect for small to medium businesses
- Upgrade if you need more

## Troubleshooting

### "Invalid API key"
- Double-check your API key in `.env.local`
- Make sure there are no extra spaces
- Restart your dev server after adding the key

### "Domain not verified"
- For production, verify your domain
- For testing, use `onboarding@resend.dev`

### Emails not sending
- Check Resend dashboard for logs
- Check browser console for errors
- Verify API key is correct

## Next Steps

After setting up Resend:
1. Uncomment email code in API routes
2. Test form submissions
3. Verify emails are being sent
4. Check spam folder if emails don't arrive

---

**Ready?** Follow the steps above, then we'll uncomment the email code!







