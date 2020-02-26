const express = require('express');

const app = express();

app.get('/sign-up', (req, res) => {
  res.json('sign-up page');
});

const PORT = 5000;

app.listen(PORT, () => `Server is running on port ${PORT}`);
