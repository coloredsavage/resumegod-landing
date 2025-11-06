# Resend Domain Verification for savage@resumegod.xyz

## What You Need to Do in Resend

To send emails from `noreply@mail.resumegod.xyz` and to `savage@resumegod.xyz`, you need to verify your domain in Resend.

### Step 1: Add Domain in Resend Dashboard

1. Go to [Resend Dashboard](https://resend.com)
2. Navigate to **Domains**
3. Click **Add Domain**
4. Enter: `resumegod.xyz`

### Step 2: Verify Domain Ownership

Resend will provide DNS records you need to add to your domain provider:

**Typical DNS records needed:**
- **TXT record** for domain verification
- **MX records** for email routing (if you want to receive emails)
- **SPF record** for email authentication

### Step 3: Update DNS Records

Go to your domain registrar (where you bought resumegod.xyz) and add the DNS records provided by Resend.

### Step 4: Wait for Verification

DNS changes can take up to 24 hours to propagate, but usually happen within minutes.

## Alternative: Use Resend's Test Domain

If you want to test immediately without domain verification, you can use Resend's test domain:

1. Change the `from` email in the API to use a Resend test domain
2. Change `ADMIN_EMAIL` to your personal Gmail for testing

**Quick test configuration:**
```env
# In api/.env - for testing only
ADMIN_EMAIL=your-personal-email@gmail.com
```

And update the `from` email in `api/signup.js` to use a Resend test domain.

## Webhook Setup for Inbound Emails

To receive email replies at `savage@ustpipo.resend.app`, you need to set up a webhook in Resend:

### Step 1: Configure Webhook in Resend Dashboard

1. Go to [Resend Webhooks](https://resend.com/webhooks)
2. Click **Add Webhook**
3. Enter your webhook URL: `https://www.resumegod.xyz/api/webhook`
4. Select the event type: `email.received`
5. Click **Add**

### Step 2: Deploy Your Application

Make sure your application is deployed and the webhook endpoint is accessible at the URL you provided.

### Step 3: Test Inbound Email

Send an email to `savage@ustpipo.resend.app` to test the webhook integration.

## Current Configuration

Your system is configured to:
- **Send welcome emails from**: `Savage <savage@ustpipo.resend.app>` (inbound capable)
- **Send admin notifications from**: `ResumeGod <savage@ustpipo.resend.app>` (inbound capable)
- **Send admin notifications to**: `savage@resumegod.xyz`
- **Webhook endpoint**: `/api/webhook` (for receiving email replies)

**Both welcome emails and admin notifications now use the same reply-enabled address, so you can receive replies to both types of emails through the webhook.**

## Testing Without Domain Verification

For immediate testing, you can:
1. Use Resend's test mode with a verified email
2. Skip email sending during initial testing (data will still go to Supabase)
3. Test the webhook locally using ngrok or similar tools

The Supabase integration will work regardless of email configuration, so you can deploy and test the form submission even while setting up Resend.
