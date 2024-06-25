const sqlite3 = require('sqlite3').verbose();

// Initialize the database and create tables
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    )
  `);
});

module.exports = db;
