const express = require("express");
const {
  handle500s,
  handlePsqlErrors,
  handleCustomErrors,
} = require("./controllers/error-controllers");
const { getArticlebyId, changeArticleVotesById, getArticles } = require("./controllers/articles-controller");
const { getTopics } = require("./controllers/topics-controller");
const { getUsers } = require("./controllers/users-controller");
const { getCommentsByArticleId, postCommentByArticleId, deleteCommentByCommentId } = require("./controllers/comments-controller");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlebyId);
app.patch("/api/articles/:article_id", changeArticleVotesById);
app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);
app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.get("/api/users", getUsers);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handle500s);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;
