const sqlite3 = require('sqlite3').verbose();

// Initialize the database and create tables
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      name TEXT,
      avatar NUMBER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT,
      gender TEXT,
      avatar NUMBER,
      profileId INTEGER,
      FOREIGN KEY(profileId) REFERENCES profiles(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      body TEXT,
      createdAt TEXT,
      chatId TEXT,
      sender INTEGER,
      liked INTEGER
    )
  `);
});

module.exports = db;
