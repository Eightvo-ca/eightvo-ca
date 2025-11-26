const express = require('express');
const path = require('path');

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
if (process.env.NODE_ENV === 'production') {
  const frontDist = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontDist));
  app.get('*', (req, res) => res.sendFile(path.join(frontDist, 'index.html')));
}

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
