const express = require('express');
const cors = require('cors');
const path = require('path');

const speciesRoutes = require('./routes/species');
const sightingsRoutes = require('./routes/sightings');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve the A-Frame frontend as static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes
app.use('/api/species', speciesRoutes);
app.use('/api/sightings', sightingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'EcoVerse API is running.' });
});

// Export for Vercel serverless — Vercel calls the exported app as a handler.
// When running locally with `npm start`, the listen() call below still works.
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`EcoVerse server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
