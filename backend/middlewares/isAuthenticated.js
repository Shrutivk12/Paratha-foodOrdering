module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ success: false, message: "Unauthorized" });
};