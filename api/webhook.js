// Webhook endpoint for receiving inbound emails from Resend
// This will handle email replies to savage@ustpipo.resend.app

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event = req.body;

    console.log('Received webhook event:', JSON.stringify(event, null, 2));

    // Check if this is an email.received event
    if (event.type === 'email.received') {
      const emailData = event.data;
      
      // Extract relevant information
      const fromEmail = emailData.from;
      const toEmail = emailData.to[0]; // First recipient
      const subject = emailData.subject;
      const emailId = emailData.email_id;
      const createdAt = emailData.created_at;

      console.log(`Processing email from: ${fromEmail}, to: ${toEmail}, subject: "${subject}"`);

      // Store the email metadata in Supabase
      const { data: emailRecord, error: emailError } = await supabase
        .from('email_replies')
        .insert([{
          email_id: emailId,
          from_email: fromEmail,
          to_email: toEmail,
          subject: subject,
          received_at: createdAt,
          processed: false
        }])
        .select();

      if (emailError) {
        console.error('Error storing email metadata:', emailError);
        throw new Error(`Failed to store email metadata: ${emailError.message}`);
      }

      console.log('Email metadata stored successfully:', emailRecord[0]?.id);

      // TODO: You can add additional processing here:
      // - Fetch the full email content using Resend API
      // - Parse the email body for feedback
      // - Send automated responses
      // - Forward to a support system
      // - Create tasks in a project management tool

      return res.status(200).json({
        success: true,
        message: 'Email received and processed',
        data: {
          email_id: emailId,
          stored_id: emailRecord[0]?.id
        }
      });
    }

    // Handle other event types if needed
    console.log('Unhandled event type:', event.type);
    return res.status(200).json({ success: true, message: 'Event received but not processed' });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({
      error: 'Failed to process webhook',
      details: error.message
    });
  }
};
