exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") res.status(400).send({ msg: "bad request - invalid input" });
  else if (err.code === "23503") res.status(404).send({ msg: "article not found" });
  else next(err);
}

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
  else next(err);
}

exports.handle500s = (err, req, res, next) => {
  console.log(err, "MY ERROR");
  res.status(500).send({ msg: 'server error' });
}