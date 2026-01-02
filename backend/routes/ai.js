const express = require('express');
const router = express.Router();
const axios = require('axios');

// This line gets your secret key from GitHub
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

// This is the "Generate Ideas" function
router.post('/generate', async (req, res) => {
  try {
    const { niche } = req.body;

    if (!niche) {
      return res.status(400).json({ error: 'Niche is required' });
    }

    const prompt = `
      Generate 5 viral-worthy content ideas for someone in the ${niche} niche.
      Each idea should have: title, format (Reel/Post/Carousel), duration, hashtags.
      Format as JSON array.
    `;

    const response = await axios.post(API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a creative content strategist." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.8
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const aiResponse = response.data.choices[0].message.content;
    const ideas = JSON.parse(aiResponse);

    res.json({ ideas });

  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    res.status(500).json({
      error: 'Failed to generate ideas'
    });
  }
});

module.exports = router;
