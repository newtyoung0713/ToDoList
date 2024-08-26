const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Setting MiddleWare
app.use(cors());
app.use(bodyParser.json());

// Initial the SQLite DataBase
const db = new sqlite3.Database('./todos.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT,
    completed INTEGER,
    create_at DATETIME DEFAULT CURRENT_TIMESTAMP)`
  , (err) => {
    if (err) console.error('Error creating table', err.message);
    else console.log('Table created or already exists');
  });
});

// Get all the to-do items
app.get('/todos', (req, res) => {
  db.all("SELECT * FROM todos", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ todos: rows });
  });
});

// Create a new to-do item
app.post('/todos', (req, res) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ error: 'Description is required' });
  db.run("INSERT INTO todos (description, completed) VALUES (?, ?)", [description, false], function (err) {
    if (err) {
      console.error(err.message);   // print the wrong message
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, description, completed: false });
  });
});

// Update a to-do item
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { description, completed } = req.body;
  if (completed === undefined) return res.status(400).json({ error: 'Completed status is required' });
  // Checking description is null or not, if null then keep the current value
  db.run("UPDATE todos SET description = COALESCE(?, description), completed = ? WHERE id = ?", [description, completed, id], function (err) {
    if (err) {
      console.error('Error updating data', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, description, completed });
  });
});

// Delete a to-do item
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});