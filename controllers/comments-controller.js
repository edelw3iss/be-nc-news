const { fetchCommentsByArticleId, checkArticleExists, addCommentByArticleId } = require("../models/comments-model");


exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id: articleId } = req.params;
  Promise.all([fetchCommentsByArticleId(articleId), checkArticleExists(articleId)])
    .then(([comments]) => {
    res.status(200).send({ comments });
  })
    .catch(next);
}

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id: articleId } = req.params;
  const commentToAdd = req.body;
  addCommentByArticleId(articleId, commentToAdd)
    .then((comment) => {
      res.status(201).send({ comment });
    })
  .catch(next)
}
