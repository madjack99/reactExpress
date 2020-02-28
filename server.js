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
    .then(data => JSON.parse(parser.toJson(data, { reversible: true })));
};

app.get('/sign-up', (req, res) => {
  res.json('sign-up page');
});

app.post('/sign-up', jsonParser, async (req, res) => {
  const database = await fetchDataBase();
  console.log(database.users);
  const { userList } = database.users;
  const { login: newLogin, email: newEmail, password, name } = req.body;

  let error = false;

  for (user of userList) {
    if (user.login === newLogin) {
      res.status(200).json({ message: 'Login already exists', error: true });
      error = true;
    } else if (user.email === newEmail) {
      res.status(200).json({ message: 'Email already exists', error: true });
      error = true;
    }
  }

  if (!error) {
    const newUser = {
      name,
      password,
      login: newLogin,
      email: newEmail,
    };

    userList.push(newUser);
    const stringified = JSON.stringify(database);
    const xml = parser.toXml(stringified);

    fs.promises
      .writeFile('./users.xml', xml)
      .then(data => console.log('wrote'))
      .catch(err => console.log(err));
  }

  if (!error)
    res.status(200).json({ message: 'New user added to DB', error: false });
});

const PORT = 5000;

app.listen(PORT, () => `Server is running on port ${PORT}`);
