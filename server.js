const express = require('express');

const app = express();

app.get('/signup', (req, res) => {
  res.json('signup page');
});

const PORT = 5000;

app.listen(PORT, () => `Server is running on port ${PORT}`);
