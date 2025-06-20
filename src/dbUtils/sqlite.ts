import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("./konquest.db");

// Create tables if they don't exist
// Event table
// id, name, description, date, location, type, maxParticipants, geometry, imageUrl

db.execute(`CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  maxParticipants INTEGER,
  geometry TEXT,
  imageUrl TEXT
);`);

// Quest table
// id, eventId, name, type, metric, description, xp

db.execute(`CREATE TABLE IF NOT EXISTS quests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  eventId INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  metric TEXT NOT NULL,
  description TEXT NOT NULL,
  xp INTEGER NOT NULL,
  points TEXT,
  FOREIGN KEY(eventId) REFERENCES events(id)
);`);

// Add points column to quests table if it doesn't exist
try {
  db.query("SELECT points FROM quests LIMIT 1;");
} catch {
  db.execute("ALTER TABLE quests ADD COLUMN points TEXT;");
}

// User table
// id, username, appleId

db.execute(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  appleId TEXT
);`);

// Add googleId column to users table if it doesn't exist
try {
  db.query("SELECT googleId FROM users LIMIT 1;");
} catch {
  db.execute("ALTER TABLE users ADD COLUMN googleId TEXT;");
}

// Add appleId column to users table if it doesn't exist
try {
  db.query("SELECT appleId FROM users LIMIT 1;");
} catch {
  db.execute("ALTER TABLE users ADD COLUMN appleId TEXT;");
}

// User-Quest completion table
db.execute(`CREATE TABLE IF NOT EXISTS user_quests (
  userId TEXT NOT NULL,
  questId INTEGER NOT NULL,
  completedAt TEXT NOT NULL,
  FOREIGN KEY(userId) REFERENCES users(id),
  FOREIGN KEY(questId) REFERENCES quests(id),
  PRIMARY KEY (userId, questId)
);`);

export { db }; 