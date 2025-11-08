-- Create beta_signups table for ResumeGod
CREATE TABLE IF NOT EXISTS beta_signups (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_beta_signups_email ON beta_signups(email);
CREATE INDEX IF NOT EXISTS idx_beta_signups_timestamp ON beta_signups(timestamp);
CREATE INDEX IF NOT EXISTS idx_beta_signups_status ON beta_signups(status);

-- Enable Row Level Security (RLS)
ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow insert operations (for the API)
CREATE POLICY "Allow insert for API" ON beta_signups
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow select operations (for viewing data)
CREATE POLICY "Allow select for authenticated users" ON beta_signups
  FOR SELECT
  USING (true);

-- Create email_replies table for inbound email processing
CREATE TABLE IF NOT EXISTS email_replies (
  id BIGSERIAL PRIMARY KEY,
  email_id TEXT NOT NULL,
  from_email TEXT NOT NULL,
  to_email TEXT NOT NULL,
  subject TEXT,
  received_at TIMESTAMPTZ,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for email_replies table
CREATE INDEX IF NOT EXISTS idx_email_replies_email_id ON email_replies(email_id);
CREATE INDEX IF NOT EXISTS idx_email_replies_from_email ON email_replies(from_email);
CREATE INDEX IF NOT EXISTS idx_email_replies_received_at ON email_replies(received_at);
CREATE INDEX IF NOT EXISTS idx_email_replies_processed ON email_replies(processed);

-- Enable Row Level Security for email_replies
ALTER TABLE email_replies ENABLE ROW LEVEL SECURITY;

-- Create policy to allow insert operations for email_replies
CREATE POLICY "Allow insert for API" ON email_replies
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow select operations for email_replies
CREATE POLICY "Allow select for authenticated users" ON email_replies
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Optional: Create a view for recent signups
CREATE OR REPLACE VIEW recent_beta_signups AS
SELECT 
  id,
  name,
  email,
  timestamp,
  status,
  created_at
FROM beta_signups
ORDER BY created_at DESC
LIMIT 100;

-- Insert a test record (optional)
-- INSERT INTO beta_signups (name, email, status) 
-- VALUES ('Test User', 'test@example.com', 'pending');
