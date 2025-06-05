const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined){
    return res.status(401).json("You are unauthorized to do that.");
  }
  next();
};

module.exports = {
  isAuthenticated,
};
