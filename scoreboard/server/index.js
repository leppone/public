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
  console.log('GET /api/scoreboard called');
  const scoreboard = db.get('scoreboard').value();

  // Init scoreboard if empty
  if( scoreboard === undefined) {
    db.defaults({ scoreboard: [] });
  }

  // Sort results by score before returning
  const sortedResults = scoreboard.sort((a, b) => b.score - a.score);
  res.json(sortedResults);
})

// GET amount of items in scoreboard
app.get('/api/scoreboard/size', (req, res) => {
  const scoreboard = db.get('scoreboard').value();
  res.json(scoreboard.length);
})

// POST item to database
app.post('/api/scoreboard', (req, res) => {
  console.log('POST /api/scoreboard called')
  const body = req.body;

  // Checking all required items exist
  if (!body.name || !body.score) {
    console.log('Invalid data received')
    return res.status(400).json({ 
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
  res.json(`${item} added`);
})


const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);