// app.js
// Handles: clicking on an animal/plant -> fetch species info from backend -> show panel
//          submitting the "Log Sighting" form -> POST to backend

document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('info-panel');
  const panelName = document.getElementById('panel-name');
  const panelDetails = document.getElementById('panel-details');
  const panelClose = document.getElementById('panel-close');
  const logBtn = document.getElementById('log-sighting-btn');
  const statusMsg = document.getElementById('status-msg');

  let currentSpecies = null;

  // Wire up click listeners on every placed model
  SPECIES_PLACEMENT.forEach(({ entityId, speciesId }) => {
    const el = document.getElementById(entityId);
    if (!el) return;

    el.setAttribute('class', 'clickable');
    el.addEventListener('click', () => loadSpecies(speciesId));

    // Small hover feedback (cursor component handles raycasting in index.html)
    el.addEventListener('mouseenter', () => el.setAttribute('scale', el.getAttribute('scale')));
  });

  async function loadSpecies(speciesId) {
    try {
      const res = await fetch(`${API_BASE}/species/${speciesId}`);
      if (!res.ok) throw new Error('Species not found');
      const data = await res.json();
      currentSpecies = data;
      showPanel(data);
    } catch (err) {
      console.error(err);
      showStatus('Could not load species info. Is the server running?', true);
    }
  }

  function showPanel(species) {
    panelName.textContent = `${species.name} (${species.scientificName})`;
    panelDetails.innerHTML = `
      <p><strong>Type:</strong> ${species.type}</p>
      <p><strong>Diet:</strong> ${species.diet}</p>
      <p><strong>Ecosystem Role:</strong> ${species.role}</p>
      <p><strong>Fun Fact:</strong> ${species.funFact}</p>
      <p><strong>Conservation Status:</strong> ${species.conservationStatus}</p>
    `;
    panel.classList.remove('hidden');
  }

  panelClose.addEventListener('click', () => {
    panel.classList.add('hidden');
  });

  logBtn.addEventListener('click', async () => {
    if (!currentSpecies) return;

    const noteInput = document.getElementById('sighting-note');
    const nameInput = document.getElementById('researcher-name');

    try {
      const res = await fetch(`${API_BASE}/sightings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          speciesId: currentSpecies.id,
          speciesName: currentSpecies.name,
          note: noteInput.value,
          researcherName: nameInput.value,
        }),
      });

      if (!res.ok) throw new Error('Failed to save sighting');

      showStatus(`Sighting logged: ${currentSpecies.name}!`, false);
      noteInput.value = '';
    } catch (err) {
      console.error(err);
      showStatus('Could not save sighting. Is the server running?', true);
    }
  });

  function showStatus(message, isError) {
    statusMsg.textContent = message;
    statusMsg.style.color = isError ? '#ff6b6b' : '#6bff8e';
    statusMsg.classList.remove('hidden');
    setTimeout(() => statusMsg.classList.add('hidden'), 3000);
  }
});
