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
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [articleId])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
    });
};

exports.addCommentByArticleId = (articleId, commentToAdd) => {
  const { username, body } = commentToAdd;
  if (!username || !body) {
    return Promise.reject({ status: 400, msg: "bad request - invalid input" });
  }
      return db
      .query(
        `
    INSERT INTO comments
    (author, article_id, body)
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `,
        [username, articleId, body]
      )
    .then(({ rows }) => {
      return rows[0];
    });
};
