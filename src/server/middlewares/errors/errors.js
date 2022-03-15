const chalk = require("chalk");
const debug = require("debug")("drinkit:errors");

const notFoundError = (req, res) => {
  const notFoundMessage = {
    error: true,
    message: "Resouce not found",
  };

  res.status(404).json(notFoundMessage);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const code = err.code || 500;
  const message = err.send || "Internal server error";

  const errorToSend = {
    error: true,
    code,
    message,
  };
  if (!err.send) {
    debug(chalk.redBright(`Unhandled error found!: \n ${err.message}`));
  }

  res.status(code).json(errorToSend);
};

module.exports = { notFoundError, errorHandler };
