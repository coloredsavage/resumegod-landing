# Quick Deployment Guide for Your Setup

## Your Credentials Already Configured

✅ **Supabase**: Configured in `api/.env`
✅ **Resend**: Configured with your domain `mail.resumegod.xyz`
✅ **Vercel**: Already connected to your Git repository

## Immediate Next Steps

### 1. Set Up Supabase Database
1. Go to your Supabase dashboard: https://etdnthkwlbodaqoszece.supabase.co
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase-setup.sql`
4. Run the SQL to create the `beta_signups` table

### 2. Set Environment Variables in Vercel
1. Go to your Vercel dashboard
2. Navigate to your `resumegod-landing` project
3. Go to **Settings > Environment Variables**
4. Add these variables:
   - `SUPABASE_URL`: `https://etdnthkwlbodaqoszece.supabase.co`
   - `SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZG50aGt3bGJvZGFxb3N6ZWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MjA2MzYsImV4cCI6MjA3NzI5NjYzNn0.D5J3VNZEiC8X6bEj3XPs3W2XjzEgFZPm-Fv9-UzMGLI`
   - `RESEND_API_KEY`: `re_Pm5fG6PK_GyDfamC9JAqhJqLmcfkXb7AS`
   - `ADMIN_EMAIL`: `mail.@resumegod.xyz` (or your preferred admin email)
   - `GITHUB_TOKEN`: (Optional - get from GitHub if you want GitHub backup)

### 3. Deploy to Vercel
Since Vercel is already connected to your Git, it should automatically deploy when you push these changes. Or you can manually trigger a deployment.

### 4. Test the Integration
1. Visit your deployed site
2. Click "Join the Beta"
3. Fill out the form with test data
4. Check:
   - ✅ Success message appears
   - ✅ Email received (check spam folder)
   - ✅ Data appears in Supabase table

## API Endpoint
Your API will be available at: `https://your-vercel-domain.vercel.app/api/signup`

## Troubleshooting

### If emails aren't sending:
- Verify your Resend domain `mail.resumegod.xyz` is properly configured
- Check Resend dashboard for email logs

### If Supabase connection fails:
- Verify the table `beta_signups` exists
- Check environment variables in Vercel

### If API returns CORS errors:
- The API already includes CORS headers
- Make sure you're using the correct domain

## Production Ready
Your beta signup system is now configured with:
- ✅ Supabase database storage
- ✅ Resend email delivery  
- ✅ Vercel deployment
- ✅ Professional email domain
- ✅ Error handling and validation

Push these changes to GitHub and Vercel will automatically deploy your updated landing page with the new signup functionality!
