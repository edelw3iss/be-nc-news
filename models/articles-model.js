const db = require("../db/connection");

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `SELECT * FROM articles
  WHERE article_id = $1`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      return rows[0];
    });
};

exports.alterArticleVotesById = (articleId, votesToAdd) => {
  const { inc_votes: incVotes } = votesToAdd;
  return db
    .query(
      `SELECT * FROM articles
  WHERE article_id = $1;`,
      [articleId]
    )
    .then(({ rows }) => {
      const article = rows[0];
      const newVotes = article.votes + incVotes;
      return db.query(
        `UPDATE articles
      SET votes = $1
      WHERE article_id = $2
      RETURNING *;`,
        [newVotes, articleId]
      );
    })
    .then(({ rows }) => {
      return rows[0];
    });
};
