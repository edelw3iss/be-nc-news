const { rows } = require('pg/lib/defaults');
const db = require('../db/connection');

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`)
    .then(({ rows }) => {
    return rows;
    })
}
