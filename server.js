const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const parser = require('xml2json');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(
  session({
    name: 'JSExpressAuth',
    resave: false,
    saveUninitialized: false,
    secret: 'secretSignatureString',
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: false,
    },
  })
);

const jsonParser = bodyParser.json();

const fetchDataBase = () => {
  return fs.promises
    .readFile('./users.xml')
    .then(data => JSON.parse(parser.toJson(data, { reversible: true })));
};

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePasswords = async (password, hash) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};

app.get('/sign-up', (req, res) => {
  res.json('sign-up page');
});

app.post('/sign-up', jsonParser, async (req, res) => {
  const database = await fetchDataBase();
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

  const hashedPassword = await hashPassword(password);

  if (!error) {
    const newUser = {
      name,
      id: uuidv4(),
      password: hashedPassword,
      login: newLogin,
      email: newEmail,
      session: req.session,
    };

    req.session.id = newUser.id;

    userList.push(newUser);
    const stringified = JSON.stringify(database);
    const xml = parser.toXml(stringified);

    fs.promises
      .writeFile('./users.xml', xml)
      .then(data => console.log('Wrote to DB'))
      .catch(err => console.log(err));
  }

  if (!error)
    res
      .status(200)
      .json({ name, message: 'New user added to DB', error: false });
});

app.post('/log-in', jsonParser, async (req, res) => {
  const database = await fetchDataBase();
  const { userList } = database.users;
  const { login: attemptLogin, password: attemptPassword } = req.body;

  const asyncPasswordComparison = async (arr, asyncCompare) => {
    const promises = arr.map(asyncCompare);
    const results = await Promise.all(promises);
    const index = results.findIndex(item => item);
    return arr[index];
  };

  const user = await asyncPasswordComparison(userList, async item => {
    const doesPasswordMatch = await comparePasswords(
      attemptPassword,
      item.password
    );
    const doesLoginMatch = attemptLogin === item.login;
    return doesPasswordMatch && doesLoginMatch;
  });

  if (!user) {
    res.status(200).json({ message: 'Wrong credentials', error: true });
  } else {
    req.session.id = user.id;

    res
      .status(200)
      .json({ name: user.name, message: 'User logged in', error: false });
  }
});

const PORT = 5000;

app.listen(PORT, () => `Server is running on port ${PORT}`);
