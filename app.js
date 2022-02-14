const express = require('express');
const { send } = require('express/lib/response');
const { getTopics } = require('./controllers/news-controllers');

const app = express();

app.get('/api/topics', getTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;