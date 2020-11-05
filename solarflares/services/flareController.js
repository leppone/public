// Node/Express-server for accessing Nasa-API data
const fetch = require('node-fetch');
const express = require('express');
const app = express();

app.get('/api/solarflares', (req, res) => {

  // For this task, limit time frame for specific year (could be parameterized)
  const year = '2016';

  // api key to env vars?
  // https://www.twilio.com/blog/react-app-with-node-js-server-proxy
  var url = `https://api.nasa.gov/DONKI/FLR?startDate=${year}-01-01&endDate=${year}-12-31&api_key=QWOCvYG2Y6S4QSFtVQu5k1nUoZJCiwWSnxAe5mg6`;
  console.log(`[INFO] -- Setting up container for solar flares data using url: ${url}`)

  fetch(url)
  .then(res => res.json())
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.send(err);
  });
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);