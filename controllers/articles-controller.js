const { fetchArticleById, alterArticleVotesById } = require("../models/articles-model");

exports.getArticlebyId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id).then((article) => {
    res.status(200).send({ article });
  })
    .catch(next);
}

exports.changeArticleVotesById = (req, res, next) => {
  const { article_id: articleId } = req.params;
  const votesToAdd = req.body;
  alterArticleVotesById(articleId, votesToAdd).then((article) => {
    res.status(201).send({ article });
  })
    .catch(next)
}