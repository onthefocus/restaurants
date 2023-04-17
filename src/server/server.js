const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
 // here
const app = express();
const port = process.env.PORT || 3011;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    modal_id TEXT,
    network_name TEXT,
    location TEXT,
    location_name TEXT,
    last_replacement TEXT,
    time TEXT,
    value TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS modalCounter (
    id INTEGER PRIMARY KEY,
    value INTEGER
  )`);

});

app.get('/api/records', (req, res) => {
  db.all('SELECT * FROM records', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.get('/api/getModals', (req, res) => {
  db.all('SELECT * FROM records GROUP BY modal_id', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.get('/api/getModalCounter', (req, res) => {
  db.get('SELECT value FROM modalCounter WHERE id = 1', [], (err, row) => {
    if (err) {
      throw err;
    }
    if (row) {
      res.json(row.value);
    } else {
      // Initialize the modalCounter table with a default value if it's empty
      const initialValue = 0;
      db.run('INSERT INTO modalCounter(id, value) VALUES(1, ?)', [initialValue], function (err) {
        if (err) {
          throw err;
        }
        res.json(initialValue);
      });
    }
  });
});


app.post('/api/saveModalCounter', (req, res) => {
  const { value } = req.body;

  db.run('UPDATE modalCounter SET value = ? WHERE id = 1', [value], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Modal counter updated successfully!' });
  });
});

app.post('/api/save', (req, res) => {
  const { modal_id, network_name, location, locationName, lastReplacement, time, value } = req.body;

  db.run(`INSERT INTO records(modal_id, network_name, location, location_name, last_replacement, time, value) VALUES(?, ?, ?, ?, ?, ?, ?)`, [modal_id, network_name, location, locationName, lastReplacement, time, value], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Value saved successfully!' });
  });
});

app.get('/api/records', (req, res) => {
  db.all('SELECT * FROM records', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/network2', (req, res) => {
  res.sendFile(path.join(__dirname, 'network2.html'));
});

// serve index.html as default fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen for incoming requests
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
