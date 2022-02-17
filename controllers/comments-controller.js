const { fetchCommentsByArticleId, checkArticleExists, addCommentByArticleId, removeCommentByCommentId, checkItemExists } = require("../models/comments-model");


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

exports.deleteCommentByCommentId = (req, res, next) => {
  const { comment_id: commentId } = req.params;
  const table = 'comments'
  const column = 'comment_id'
  Promise.all([removeCommentByCommentId(commentId), checkItemExists(table, column, commentId)])
    .then(() => {
      res.status(204).send();
    })
  .catch(next)
}