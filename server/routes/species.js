const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_PATH = path.join(__dirname, '..', 'data', 'species.json');

function readSpecies() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

// GET /api/species - return all species
router.get('/', (req, res) => {
  try {
    const species = readSpecies();
    res.json(species);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read species data.' });
  }
});

// GET /api/species/:id - return one species by id
router.get('/:id', (req, res) => {
  try {
    const species = readSpecies();
    const found = species.find((s) => s.id === req.params.id);
    if (!found) {
      return res.status(404).json({ error: `Species '${req.params.id}' not found.` });
    }
    res.json(found);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read species data.' });
  }
});

module.exports = router;
