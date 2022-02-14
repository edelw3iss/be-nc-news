const express = require('express');
const { handle500s, handlePsqlErrors, handleCustomErrors } = require('./controllers/error-controllers');
const { getTopics, getArticle } = require('./controllers/news-controllers');

const app = express();

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticle);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handle500s);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;