const { fetchCommentsByArticleId, checkArticleExists } = require("../models/comments-model");


exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id: articleId } = req.params;
  Promise.all([fetchCommentsByArticleId(articleId), checkArticleExists(articleId)])
    .then(([comments]) => {
    res.status(200).send({ comments });
  })
    .catch(next);
}
