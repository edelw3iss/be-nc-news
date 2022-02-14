const express = require('express');
const { send } = require('express/lib/response');

const app = express();


app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;