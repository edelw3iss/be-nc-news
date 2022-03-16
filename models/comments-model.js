const db = require("../db/connection");

exports.fetchCommentsByArticleId = (articleId) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body FROM comments
    WHERE article_id = $1
    ORDER BY created_at desc;`,
      [articleId]
    )
    .then(({ rows }) => {
      return rows;
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


exports.removeCommentByCommentId = (commentId) => {
  return db.query(`
  DELETE FROM comments
  WHERE comment_id = $1;
  `, [commentId]);
}

exports.checkItemExists = (table, column, item) => {
  return db
    .query(`SELECT * FROM ${table} WHERE ${column} = $1;`, [item])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: `${column} not found` });
      }
    });
};
