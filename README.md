# EcoVerse 🌿 — An Interactive Virtual Rainforest Explorer

## Project Story
EcoVerse drops you into a 3D rainforest as a field researcher. As you walk through
the jungle, you'll encounter a jaguar stalking the undergrowth, a capybara grazing
near the water, a frog hopping on the riverbank, a hummingbird hovering over a banana
tree, and a crocodile lurking nearby. Clicking on any plant or animal pulls up real
ecological facts (diet, role in the ecosystem, conservation status) fetched live from
a backend API. You can also log your own "field sighting" — a note that gets saved
to the server and shows up permanently in the Field Journal page, turning a one-time
VR walkthrough into a small, growing research log.

The goal is to make ecosystem education tactile: instead of reading about a food web,
you walk through one.

## Concept / Theme
**3D Model Manipulation for Educational / Virtual Learning contexts** — built with A-Frame.

## Development Stack
| Layer       | Technology                          |
|-------------|--------------------------------------|
| Frontend    | A-Frame (WebVR), HTML, CSS, vanilla JS |
| Backend     | Node.js, Express                     |
| Data Layer  | JSON file storage (`species.json`, `sightings.json`) — swappable for SQLite/Firebase |
| Deployment  | Vercel (or GitHub Pages for frontend + Render/Railway for backend) |

### Why this stack
A-Frame was used directly per the course lecture series (custom ground/sky, gltf model
loading, animation component, lighting). Express was chosen for the backend because it's
lightweight and easy to reason about. JSON-file storage was used as the data layer to
keep setup friction near-zero for a solo developer, while still satisfying the
frontend → API → persisted-data full-stack requirement. The structure makes it trivial
to swap in a real database later (just change the two functions in each route file).

## Project Structure
```
ecoverse/
├── public/              # Frontend (A-Frame) — deploy as static site
│   ├── index.html        # main 3D rainforest scene
│   ├── journal.html       # lists saved sightings from the backend
│   ├── assets/
│   │   ├── models/       # .glb files (forest, animals, plants)
│   │   └── textures/     # ground + sky textures
│   ├── css/style.css
│   └── js/
│       ├── scene-data.js  # species-to-model mapping + API base URL
│       └── app.js         # click-to-learn + sighting submission logic
├── server/
│   ├── server.js          # Express entry point
│   ├── routes/
│   │   ├── species.js     # GET /api/species, /api/species/:id
│   │   └── sightings.js   # GET/POST/DELETE /api/sightings
│   └── data/
│       ├── species.json   # species facts (acts as DB)
│       └── sightings.json # user-submitted sightings (acts as DB)
├── package.json
└── README.md
```

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add your 3D assets**
   Place all `.glb` files into `public/assets/models/` and texture images into
   `public/assets/textures/` (see filenames referenced in `index.html`).

3. **Run the server**
   ```bash
   npm start
   ```
   This serves the frontend AND the API at `http://localhost:3000`.

4. **Open the app**
   Visit `http://localhost:3000` in your browser.

## API Endpoints
| Method | Endpoint                | Description                          |
|--------|--------------------------|---------------------------------------|
| GET    | `/api/species`           | Get all species                       |
| GET    | `/api/species/:id`       | Get one species by id                 |
| GET    | `/api/sightings`         | Get all logged sightings              |
| POST   | `/api/sightings`         | Log a new sighting                    |
| DELETE | `/api/sightings/:id`     | Remove a sighting                     |

## Team
Solo project — developed, designed, and deployed entirely by Jesriel T. Valeroso.

## Controls
- **WASD** — walk around the rainforest
- **Mouse drag** — look around
- **Click an animal/plant** — view species info panel
- **Log Sighting button** — save a field note to the database

## Credits
- 3D Models: Sketchfab / Poly Pizza contributors
- Textures: Poly Haven
- Built with [A-Frame](https://aframe.io)
