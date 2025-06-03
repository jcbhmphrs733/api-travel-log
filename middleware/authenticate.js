const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "You are unauthorized to do that." });
  }
};

module.exports = {
  isAuthenticated,
};
