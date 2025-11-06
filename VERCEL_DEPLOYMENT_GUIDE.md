# Vercel Deployment Setup Guide

## Environment Variables Required

You need to set up the following environment variables in your Vercel project:

### Required Variables:

1. **SUPABASE_URL**
   - Value: `https://etdnthkwlbodaqoszece.supabase.co`

2. **SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZG50aGt3bGJvZGFxb3N6ZWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MjA2MzYsImV4cCI6MjA3NzI5NjYzNn0.D5J3VNZEiC8X6bEj3XPs3W2XjzEgFZPm-Fv9-UzMGLI`

3. **RESEND_API_KEY**
   - Value: `re_Pm5fG6PK_GyDfamC9JAqhJqLmcfkXb7AS`

4. **ADMIN_EMAIL**
   - Value: `savage@resumegod.xyz`

### Optional Variable:

5. **GITHUB_TOKEN** (for GitHub backup functionality)
   - Value: Your GitHub personal access token (optional)

## How to Set Up Environment Variables in Vercel

### Method 1: Vercel Dashboard

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `resumegod-landing`
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **SUPABASE_URL** (Production)
   - **SUPABASE_ANON_KEY** (Production)
   - **RESEND_API_KEY** (Production)
   - **ADMIN_EMAIL** (Production)
   - **GITHUB_TOKEN** (Production) - Optional

### Method 2: Vercel CLI

```bash
# Set environment variables via CLI
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add RESEND_API_KEY
vercel env add ADMIN_EMAIL
vercel env add GITHUB_TOKEN
```

### Method 3: Deploy with Environment Variables

After setting up the environment variables, deploy again:

```bash
vercel --prod
```

## Current Deployment Status

✅ **GitHub Repository**: Updated successfully
✅ **Code**: Ready for deployment
❌ **Vercel Environment Variables**: Need to be configured

## Testing the Deployment

Once environment variables are set:

1. **Test the landing page**: Visit `https://www.resumegod.xyz`
2. **Test the signup form**: Fill out the beta signup form
3. **Test email sending**: Check if welcome emails are sent
4. **Test webhook**: Set up Resend webhook for inbound emails

## Troubleshooting

If deployment still fails:

1. **Check environment variables** in Vercel dashboard
2. **Verify Supabase connection** is working
3. **Test Resend API key** is valid
4. **Check Vercel logs** for detailed error messages

## Next Steps After Deployment

1. **Set up Resend webhook** for inbound emails
2. **Test the complete flow** from signup to email delivery
3. **Monitor Supabase tables** for signups and email replies
4. **Configure domain settings** if needed

The application is ready to deploy once the environment variables are configured in Vercel!
