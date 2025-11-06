# Supabase + Resend Integration - How It Works

## Current Integration Flow

### 1. Beta Signup Process (`api/signup.js`)

**When a user signs up on the landing page:**

1. **Data Storage (Supabase)**
   - User's name and email are stored in the `beta_signups` table
   - Each signup gets a unique ID, timestamp, and status
   - Data structure:
     ```sql
     id, name, email, timestamp, status, created_at
     ```

2. **Email Sending (Resend)**
   - **Welcome Email** sent to user: `Savage <savage@ustpipo.resend.app>`
   - **Admin Notification** sent to you: `ResumeGod <savage@ustpipo.resend.app>`
   - Both emails use the same reply-enabled address

3. **GitHub Backup**
   - Signup data is also pushed to GitHub as JSON files
   - Provides an additional backup layer

### 2. Inbound Email Processing (`api/webhook.js`)

**When someone replies to any email:**

1. **Resend Webhook Trigger**
   - Resend receives the email at `savage@ustpipo.resend.app`
   - Resend sends a `POST` request to: `https://www.resumegod.xyz/api/webhook`
   - Event type: `email.received`

2. **Data Processing**
   - Webhook extracts: sender email, recipient, subject, email ID, timestamp
   - Stores metadata in Supabase `email_replies` table
   - Data structure:
     ```sql
     id, email_id, from_email, to_email, subject, received_at, processed, created_at
     ```

3. **Future Processing**
   - The `processed` field is initially `false`
   - You can build additional logic to:
     - Fetch full email content using Resend API
     - Parse email body for feedback
     - Send automated responses
     - Create tasks in project management tools

## Database Schema

### `beta_signups` Table
```sql
CREATE TABLE beta_signups (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `email_replies` Table
```sql
CREATE TABLE email_replies (
  id BIGSERIAL PRIMARY KEY,
  email_id TEXT NOT NULL,
  from_email TEXT NOT NULL,
  to_email TEXT NOT NULL,
  subject TEXT,
  received_at TIMESTAMPTZ,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Environment Configuration

**Required Environment Variables:**
```env
# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Resend
RESEND_API_KEY=your-resend-api-key

# Admin
ADMIN_EMAIL=savage@resumegod.xyz
```

## Current Status

✅ **Working:**
- Beta signup form submission
- Data storage in Supabase
- Welcome email sending
- Admin notifications
- GitHub backup

🔄 **Ready for Setup:**
- Webhook endpoint for inbound emails
- Email replies storage in Supabase

🔧 **Next Steps to Activate:**
1. **Set up Resend webhook** in dashboard:
   - URL: `https://www.resumegod.xyz/api/webhook`
   - Event: `email.received`

2. **Test inbound emails** by sending to:
   - `savage@ustpipo.resend.app`

3. **Monitor webhook logs** and `email_replies` table

## Benefits of This Integration

1. **Unified Communication**: All email replies go to one place
2. **Data Tracking**: Complete audit trail of user interactions
3. **Scalable**: Ready for automated responses and feedback processing
4. **Reliable**: Multiple backup systems (Supabase + GitHub)
5. **Flexible**: Easy to extend with additional email processing logic

The system is production-ready and waiting for you to activate the webhook in Resend to start receiving and processing email replies.
