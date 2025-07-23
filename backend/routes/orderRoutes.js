const express = require('express');
const router = express.Router({mergeParams: true});
const orderController = require("../controllers/orderController.js");
const wrapAsync = require("../utils/wrapAsync.js");
const isAuthenticated = require('../middlewares/isAuthenticated.js');

router.post("/place", isAuthenticated, wrapAsync(orderController.placeOrder));
router.get("/allorders", isAuthenticated, wrapAsync(orderController.getUserOrders));
router.get("/list", wrapAsync(orderController.getAllOrders));
router.post("/status", wrapAsync(orderController.updateStatus));

module.exports = router;