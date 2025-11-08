// Quick test to verify Resend configuration
require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function testResend() {
  console.log('Testing Resend email sending...\n');

  try {
    const result = await resend.emails.send({
      from: 'Savage <savage@mail.resumegod.xyz>',
      to: 'savage@resumegod.xyz', // Sending to your admin email
      subject: 'Test Email from ResumeGod Setup',
      html: '<p>This is a test email to verify Resend is working correctly!</p>'
    });

    if (result.error) {
      console.error('❌ Resend Error:');
      console.error(JSON.stringify(result.error, null, 2));
      process.exit(1);
    }

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', result.data.id);
    console.log('\nCheck savage@resumegod.xyz for the test email.');

  } catch (error) {
    console.error('❌ Test failed:');
    console.error(error.message);
    console.error('\nFull error:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

testResend();
