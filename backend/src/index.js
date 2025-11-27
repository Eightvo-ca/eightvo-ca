const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Example protected route placeholder
app.get('/api/public/services', (req, res) => {
  res.json([{ id: 1, name: 'Consulting' }, { id: 2, name: 'Training' }]);
});

// Serve static from frontend in production (if built)
// Resolve to the repo-root `frontend/dist` so deployment artifacts
// that place the frontend next to the backend are handled correctly.
if (process.env.NODE_ENV === 'production') {
  // Determine frontend dist directory. Preference order:
  // 1. Environment variable FRONTEND_DIST (absolute or relative)
  // 2. repo-root `frontend/dist` (using process.cwd())
  // This avoids relying on __dirname-relative locations which can
  // differ across deployment targets (e.g. AWS Lambda uses /var/task).
  const frontDist = process.env.FRONTEND_DIST
    ? path.resolve(process.env.FRONTEND_DIST)
    : path.resolve(process.cwd(), 'frontend', 'dist');

  console.log('Attempting to serve frontend from:', frontDist);

  if (fs.existsSync(frontDist)) {
    app.use(express.static(frontDist));
    app.get('*', (req, res) => res.sendFile(path.join(frontDist, 'index.html')));
  } else {
    console.error('Frontend dist not found at', frontDist);
  }
}

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
