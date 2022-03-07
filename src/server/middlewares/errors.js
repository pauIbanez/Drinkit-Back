const notFoundError = (req, res) => {
  const notFoundMessage = {
    error: true,
    message: "Resouce not found",
  };

  res.status(404).json(notFoundMessage);
};

module.exports = { notFoundError };
