const express = require('express');
const router = express.Router({mergeParams: true});
const cartController = require("../controllers/cartController.js");
const wrapAsync = require("../utils/wrapAsync.js");
const isAuthenticated = require('../middlewares/isAuthenticated.js');

router.post("/add", isAuthenticated, wrapAsync(cartController.addToCart) );
router.get("/list", isAuthenticated, wrapAsync(cartController.getCartData) );
router.post("/remove", isAuthenticated, wrapAsync(cartController.removeFromCart) );

module.exports = router;