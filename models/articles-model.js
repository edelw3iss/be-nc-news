const db = require("../db/connection");

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.comment_id)::int AS comment_count
      FROM articles
      LEFT JOIN comments ON comments.article_id = articles.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id;`,
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
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
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

exports.fetchArticles = (sortBy="created_at", orderBy="DESC") => {
  const validSortBys = ['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count'];
  const validOrderBys = ['ASC', 'DESC']
  if (!validSortBys.includes(sortBy) || !validOrderBys.includes(orderBy)) {
    return Promise.reject({status: 400, msg: "bad request - invalid query"})
  }
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, COUNT(comments.comment_id)::int AS comment_count 
      FROM articles 
      LEFT JOIN comments ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY ${sortBy} ${orderBy};`
    )
    .then(({ rows }) => {
      return rows;
    });
};
