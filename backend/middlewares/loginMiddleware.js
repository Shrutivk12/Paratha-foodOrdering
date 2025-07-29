const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.json({
        success: false,
        message: info?.message || 'Login failed',
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      next();
    });
  })(req, res, next);
};