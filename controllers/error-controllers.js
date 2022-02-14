exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") res.status(400).send({ msg: "bad request - invalid id" });
  else next(err);
}

exports.handle500s = (err, req, res, next) => {
  console.log(err, "MY ERROR");
  res.status(500).send({ msg: 'server error' });
}