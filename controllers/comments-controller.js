const { fetchCommentsByArticleId } = require("../models/comments-model");


exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id: articleId } = req.params;
  fetchCommentsByArticleId(articleId).then((comments) => {
    res.status(200).send({ comments });
  })
    .catch(next);
}
