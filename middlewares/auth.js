const ExpressError = require("./../utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).json({
      status: "fail",
      data: "Anauthorized Operation",
    });
    return;
  }
  next();
};
