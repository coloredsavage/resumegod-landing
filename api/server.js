// Local development server for testing the API
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Import the signup handler
const signupHandler = require('./signup');

// Route for beta signups
app.post('/api/signup', signupHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📝 Signup endpoint: http://localhost:${PORT}/api/signup`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
