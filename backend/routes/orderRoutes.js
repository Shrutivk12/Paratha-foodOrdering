const express = require('express');
const router = express.Router({mergeParams: true});
const orderController = require("../controllers/orderController.js");
const wrapAsync = require("../utils/wrapAsync.js");
const isAuthenticated = require('../middlewares/isAuthenticated.js');

//user
router.post("/place", isAuthenticated, wrapAsync(orderController.placeOrder));
router.get("/allorders", isAuthenticated, wrapAsync(orderController.getUserOrders));
router.post("/:id/cancel", isAuthenticated, wrapAsync(orderController.cancelOrder));

//admin
router.get("/list", wrapAsync(orderController.getAllOrders));
router.post("/status", wrapAsync(orderController.updateStatus));
router.get('/admin/parathastats', wrapAsync(orderController.getOrderStats));
router.post('/admin/allstatus', wrapAsync(orderController.updateAllStatus));
router.delete('/admin/delete', wrapAsync(orderController.deleteAllOrders));


module.exports = router;