// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const db = new sqlite3.Database('./db.sqlite', (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the in-memory SQLite database.');
// });

// db.serialize(() => {
//     db.run('CREATE TABLE records (network_name TEXT, location TEXT, location_name TEXT, last_replacement TEXT, time TEXT, value TEXT)');
//   });
  
//   app.post('/api/save', (req, res) => {
//     const { networkName, location, locationName, lastReplacement, time, value } = req.body;
  
//     db.run(`INSERT INTO records(network_name, location, location_name, last_replacement, time, value) VALUES(?, ?, ?, ?, ?, ?)`, [networkName, location, locationName, lastReplacement, time, value], function (err) {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json({ message: 'Value saved successfully!' });
//     });
//   });
  
// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });

// app.get('/api/records', (req, res) => {
//     db.all('SELECT * FROM records', [], (err, rows) => {
//       if (err) {
//         throw err;
//       }
//       res.json(rows);
//     });
//   });