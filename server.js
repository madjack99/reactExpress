const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const parser = require('xml2json');

const app = express();
app.use(cors());

const jsonParser = bodyParser.json();

fs.readFile('./users.xml', (err, data) => {
  const json = JSON.parse(parser.toJson(data, { reversible: true }));
  console.log(json);
});

app.get('/sign-up', (req, res) => {
  res.json('sign-up page');
});

app.post('/sign-up', jsonParser, (req, res) => {
  console.log(typeof req.body);
  res.json('sign-up page');
});

const PORT = 5000;

app.listen(PORT, () => `Server is running on port ${PORT}`);
