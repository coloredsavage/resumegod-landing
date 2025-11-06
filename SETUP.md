# ResumeGod Beta Signup Setup Guide

This guide will help you set up the beta signup functionality that integrates with Supabase, Resend, and GitHub.

## Prerequisites

1. **Supabase Account** - For database storage
2. **Resend Account** - For email sending
3. **GitHub Account** - For storing signup data
4. **Node.js 18+** - For running the API

## Step 1: Supabase Setup

### Create Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project
2. Note your project URL and anon key from Settings > API

### Create Database Table
Run this SQL in the Supabase SQL editor:

```sql
CREATE TABLE beta_signups (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_beta_signups_email ON beta_signups(email);
CREATE INDEX idx_beta_signups_timestamp ON beta_signups(timestamp);
```

## Step 2: Resend Setup

1. Go to [Resend](https://resend.com) and create an account
2. Verify your domain (resumegod.ai) or use the provided test domain
3. Get your API key from the dashboard
4. Optionally, set up a custom "from" email address

## Step 3: GitHub Setup

1. Go to your GitHub account settings
2. Navigate to Developer settings > Personal access tokens > Tokens (classic)
3. Generate a new token with these permissions:
   - `repo` (full control of private repositories)
   - `workflow` (optional, if you want GitHub Actions)
4. Save the token securely

## Step 4: Environment Configuration

1. Copy `api/.env.example` to `api/.env`
2. Fill in your actual values:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=your-email@resumegod.ai
```

## Step 5: Deploy the API

### Option A: Vercel Deployment (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to the `api` directory: `cd api`
3. Run: `vercel`
4. Follow the prompts to deploy
5. Set environment variables in Vercel dashboard

### Option B: Netlify Functions

1. Create a `netlify.toml` file in the root:
```toml
[build]
  functions = "api"
```

2. Deploy to Netlify
3. Set environment variables in Netlify dashboard

### Option C: Local Development

1. Install dependencies: `cd api && npm install`
2. Start the server: `npm run dev`
3. The API will be available at `http://localhost:3000/api/signup`

## Step 6: Update Frontend API URL

If deploying to a different domain, update the fetch URL in `index.html`:

```javascript
// Change this line in the form submission handler
const response = await fetch('https://your-api-domain.vercel.app/api/signup', {
```

## Testing the Integration

1. Open the landing page
2. Click "Join the Beta"
3. Fill out the form and submit
4. Check:
   - Supabase table for new entry
   - Email inbox for confirmation email
   - GitHub repository for new file in `beta-signups/` folder

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your API URL is correct and CORS headers are set
2. **Supabase Connection**: Verify your URL and anon key
3. **Email Not Sending**: Check Resend API key and domain verification
4. **GitHub Push Fails**: Verify token has repo permissions

### Environment Variables Checklist

- [ ] SUPABASE_URL is correct
- [ ] SUPABASE_ANON_KEY is valid
- [ ] RESEND_API_KEY is active
- [ ] GITHUB_TOKEN has repo permissions
- [ ] ADMIN_EMAIL is verified (if using custom domain)

## Security Notes

- Never commit `.env` files to version control
- Use environment variables in production
- Regularly rotate API keys and tokens
- Monitor API usage and set rate limits if needed

## Monitoring

- Check Supabase dashboard for new signups
- Monitor Resend dashboard for email delivery
- Review GitHub repository for new files
- Set up error logging for the API endpoint
