const express = require('express');
const router = express.Router({mergeParams: true});
const userController = require("../controllers/userController.js");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require('passport');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post("/signup", wrapAsync(userController.signup));

router.post("/login", passport.authenticate('local'), userController.login);

router.get("/logout", userController.logout);

router.get("/isauth", isAuthenticated, (req, res) => {
  const { _id, username, email, phoneNo, cartData } = req.user;
  res.json({
    success: true,
    user: { id: _id, username, email, phoneNo, cartData }
  });
});


module.exports = router;