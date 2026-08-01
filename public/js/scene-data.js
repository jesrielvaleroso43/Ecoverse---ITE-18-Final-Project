// scene-data.js
// Maps each clickable model entity in the scene to its species id (used by app.js
// to fetch facts from the backend) and stores positions for reference/editing.

const SPECIES_PLACEMENT = [
  { entityId: 'jaguar-model', speciesId: 'jaguar', position: '5 0 -8' },
  { entityId: 'crocodile-model', speciesId: 'crocodile', position: '-6 0 -12' },
  { entityId: 'capybara-model', speciesId: 'capybara', position: '-4 0 -5' },
  { entityId: 'frog-model', speciesId: 'frog', position: '2 0.2 -3' },
  { entityId: 'colibri-model', speciesId: 'colibri', position: '0 2 -6' },
  { entityId: 'banana-tree-model', speciesId: 'banana-tree', position: '6 0 -4' },
  { entityId: 'jungle-tree-model', speciesId: 'jungle-tree', position: '-8 0 -10' },
];

// API base — change this if your backend is deployed separately from the frontend
const API_BASE = window.location.origin.includes('localhost')
  ? 'http://localhost:3000/api'
  : '/api'; // same-origin if deployed together (e.g. Vercel)
