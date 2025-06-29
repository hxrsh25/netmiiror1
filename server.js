const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const db = new sqlite3.Database(path.join(__dirname, 'db', 'movies.db'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/api/movies', (req, res) => {
  const genre = req.query.genre;
  const sql = genre === 'All' ? 'SELECT * FROM movies' : 'SELECT * FROM movies WHERE genre = ?';
  const params = genre === 'All' ? [] : [genre];

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Netmirror running on http://localhost:${PORT}`);
});
