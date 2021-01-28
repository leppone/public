const express = require('express');
const cors = require('cors');
const app = express();
const low = require('lowdb');

// Lowdb to fake db workflow
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

app.use(express.json());
// Cors for enabling unmatching origins
app.use(cors());


// Generate ID for item by scoreboard length
const generateId = () => {
  let scoreboard = db.get('scoreboard').value();
  const maxId = scoreboard.length > 0
    ? Math.max(...scoreboard.map(item => item.id))
    : 0;
  return maxId + 1;
}


// GET all items sorted by score
app.get('/api/scoreboard', (req, res) => {
  const scoreboard = db.get('scoreboard').value();

  // Init scoreboard if empty
  if( scoreboard === undefined) {
    db.defaults({ scoreboard: [] });
  }

  // Sort results by score before returning
  const sortedResults = scoreboard.sort((a, b) => b.score - a.score)
  res.json(sortedResults);
})

// POST item to database
app.post('/api/scoreboard', (req, res) => {
  const body = req.body;

  // Checking all required items exist
  if (!body.name || !body.score) {
    return response.status(400).json({ 
      error: 'Name or score missing'
    })
  }

  // Create item from request body
  const item = {
    name: body.name,
    score: body.score,
    id: generateId()
  }

  // Add item to "database"
  db.get('scoreboard')
    .push(item)
    .write();

  // Send ok response
  res.json(item);
})


const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);