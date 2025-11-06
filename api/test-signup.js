// Test script for the beta signup API
// Run with: node test-signup.js

const fetch = require('node-fetch');

async function testSignup() {
  const testData = {
    name: "Test User",
    email: "test@example.com"
  };

  try {
    console.log('Testing beta signup API...');
    
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (response.ok && result.success) {
      console.log('✅ Test passed!');
    } else {
      console.log('❌ Test failed!');
    }
    
  } catch (error) {
    console.error('Test error:', error.message);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testSignup();
}

module.exports = testSignup;
