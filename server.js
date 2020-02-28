const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const parser = require('xml2json');

const app = express();
app.use(cors());

const jsonParser = bodyParser.json();

const fetchDataBase = () => {
  return fs.promises
    .readFile('./users.xml')
    .then(data => JSON.parse(parser.toJson(data, { reversible: true })))
    .then(dataBase => dataBase.users);
};

app.get('/sign-up', (req, res) => {
  res.json('sign-up page');
});

app.post('/sign-up', jsonParser, async (req, res) => {
  const { userList } = await fetchDataBase();
  console.log(userList);
  res.json('sign-up page');
});

const PORT = 5000;

app.listen(PORT, () => `Server is running on port ${PORT}`);
