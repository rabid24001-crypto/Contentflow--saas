const express = require('express');
const cors = require('cors');
const { injectSpeedInsights } = require('@vercel/speed-insights');

const app = express();
app.use(cors());
app.use(express.json());

// Inject Vercel Speed Insights
injectSpeedInsights();

// Import routes
const aiRoutes = require('./routes/ai');

// Use routes
app.use('/api/ai', aiRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('✅ IdeaVortex is running!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
