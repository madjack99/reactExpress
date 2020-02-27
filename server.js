const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

const jsonParser = bodyParser.json();

app.get('/sign-up', (req, res) => {
  res.json('sign-up page');
});

app.post('/sign-up', jsonParser, (req, res) => {
  console.log(typeof req.body);
  res.json('sign-up page');
});

const PORT = 5000;

app.listen(PORT, () => `Server is running on port ${PORT}`);
