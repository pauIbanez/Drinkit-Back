const placeholder = (req, res, next) => {
  req.user = {
    id: "622f00e91e85099995d63b07",
  };
  next();
};

module.exports = placeholder;
