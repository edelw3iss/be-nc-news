const db = require("../db/connection");

exports.fetchCommentsByArticleId = (articleId) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body FROM comments
    WHERE article_id = $1;`,
      [articleId]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.checkArticleExists = (articleId) => {
  return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [articleId])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
    }
  })
}