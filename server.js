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
  const { login: newLogin, email: newEmail, password, name } = req.body;

  let error = false;

  for (user of userList) {
    if (user.login === newLogin) {
      res.status(200).json('login already exists');
      error = true;
    } else if (user.email === newEmail) {
      res.status(200).json('email already exists');
      error = true;
    }
  }

  if (!error) res.json('final result');
});

const PORT = 5000;

app.listen(PORT, () => `Server is running on port ${PORT}`);
