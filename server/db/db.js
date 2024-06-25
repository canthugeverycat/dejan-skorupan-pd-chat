const sqlite3 = require('sqlite3').verbose();

// Initialize the database and create tables
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      profileId INTEGER,
      FOREIGN KEY(profileId) REFERENCES profiles(id)
    )
  `);
});

module.exports = db;
