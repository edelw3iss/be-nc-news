const express = require("express");
const {
  handle500s,
  handlePsqlErrors,
  handleCustomErrors,
} = require("./controllers/error-controllers");
const { getArticlebyId, changeArticleVotesById } = require("./controllers/articles-controller");
const { getTopics } = require("./controllers/topics-controller");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlebyId);
app.patch("/api/articles/:article_id", changeArticleVotesById);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handle500s);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;
