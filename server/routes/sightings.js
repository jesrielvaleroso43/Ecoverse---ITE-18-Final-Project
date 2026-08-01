const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_PATH = path.join(__dirname, '..', 'data', 'sightings.json');

function readSightings() {
  if (!fs.existsSync(DATA_PATH)) return [];
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return raw ? JSON.parse(raw) : [];
}

function writeSightings(sightings) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(sightings, null, 2));
}

// GET /api/sightings - return all logged sightings, newest first
router.get('/', (req, res) => {
  try {
    const sightings = readSightings();
    res.json(sightings.slice().reverse());
  } catch (err) {
    res.status(500).json({ error: 'Failed to read sightings data.' });
  }
});

// POST /api/sightings - log a new sighting
// body: { speciesId, speciesName, note, researcherName }
router.post('/', (req, res) => {
  try {
    const { speciesId, speciesName, note, researcherName } = req.body;

    if (!speciesId || !speciesName) {
      return res.status(400).json({ error: 'speciesId and speciesName are required.' });
    }

    const sightings = readSightings();
    const newSighting = {
      id: Date.now().toString(),
      speciesId,
      speciesName,
      note: note || '',
      researcherName: researcherName || 'Anonymous Researcher',
      timestamp: new Date().toISOString(),
    };

    sightings.push(newSighting);
    writeSightings(sightings);

    res.status(201).json(newSighting);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save sighting.' });
  }
});

// DELETE /api/sightings/:id - remove a sighting (handy for cleanup/demo)
router.delete('/:id', (req, res) => {
  try {
    const sightings = readSightings();
    const filtered = sightings.filter((s) => s.id !== req.params.id);
    writeSightings(filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete sighting.' });
  }
});

module.exports = router;
