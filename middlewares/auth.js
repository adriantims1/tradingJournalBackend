const ExpressError = require("./../utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    throw new ExpressError("Need to login first", 401);
  }
  next();
};
