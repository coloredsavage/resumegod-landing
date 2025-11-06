// API endpoint for handling beta signups
// This will be deployed as a serverless function

const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

// Initialize services
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { name, email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const timestamp = new Date().toISOString();
    const signupData = {
      name: name || 'Not provided',
      email,
      timestamp,
      status: 'pending'
    };

    // 1. Store in Supabase
    let supabaseData = null;
    let supabaseError = null;
    
    try {
      const result = await supabase
        .from('beta_signups')
        .insert([signupData])
        .select();

      supabaseData = result.data;
      supabaseError = result.error;
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      // Continue with email even if database fails
    }

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      // Don't fail the entire request if database fails
      // Just log the error and continue with email
    }

    // 2. Send email via Resend
    const emailResult = await resend.emails.send({
      from: 'Savage <savage@ustpipo.resend.app>',
      to: email,
      subject: 'Welcome to resumegod Beta! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p>Hi ${name || 'there'}!</p>
          <p>I'm Savage and I built resumegod. Thanks for signing up to the beta!</p>
          <p>You can try out the platform here for free: <a href="https://platform.resumegod.xyz/" style="color: #007bff; text-decoration: none;">https://platform.resumegod.xyz/</a></p>
          <p>The platform helps you:</p>
          <ul style="margin-left: 20px;">
            <li>Optimize your resume with AI</li>
            <li>Match your resume to job descriptions</li>
            <li>Get ATS compatibility scores</li>
            <li>Export in multiple formats</li>
          </ul>
          <p>I'd love to hear your thoughts and feedback as you explore the platform. Feel free to reply directly to this email with any questions or suggestions.</p>
          <p>Cheers,<br>Savage.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            You're receiving this email because you signed up for the resumegod beta program.
          </p>
        </div>
      `
    });

    // Also send notification to admin
    await resend.emails.send({
      from: 'ResumeGod <savage@ustpipo.resend.app>',
      to: process.env.ADMIN_EMAIL || 'savage@resumegod.xyz',
      subject: 'New Beta Signup',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>New Beta Signup</h3>
          <p><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
          <p><em>You can reply to this email to add notes about this signup.</em></p>
        </div>
      `
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Successfully signed up for beta!',
      data: {
        supabase_id: supabaseData[0]?.id,
        email_sent: !!emailResult.data?.id
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      error: 'Failed to process signup',
      details: error.message
    });
  }
};
