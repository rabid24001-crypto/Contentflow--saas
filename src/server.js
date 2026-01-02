// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Your main API route
app.post('/api/ai/generate', (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  const ideas = [
    `Create a viral post about ${topic} for TikTok`,
    `Write a tweet thread on ${topic}`,
    `Design a LinkedIn carousel about ${topic}`
  ];

  res.json({ ideas });
});

// Fallback for any other endpoint
app.get('/', (req, res) => {
  res.json({ message: 'AI Idea Generator API is running' });
});

// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
