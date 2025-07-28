const express = require('express');
const router = express.Router({mergeParams: true});
const orderController = require("../controllers/orderController.js");
const wrapAsync = require("../utils/wrapAsync.js");
const isAuthenticated = require('../middlewares/isAuthenticated.js');

const multer = require('multer');
const {storage} = require('../config/cloud.js');
const upload = multer({ storage });

//user
router.post("/place", isAuthenticated, wrapAsync(orderController.placeOrder));
router.get("/allorders", isAuthenticated, wrapAsync(orderController.getUserOrders));
router.post("/:id/cancel", isAuthenticated, wrapAsync(orderController.cancelOrder));
router.post("/:id/payment", isAuthenticated, upload.single('screenshot'), wrapAsync(orderController.orderPayment));

//admin
router.get("/list", wrapAsync(orderController.getAllOrders));
router.post("/status", wrapAsync(orderController.updateStatus));
router.get('/admin/parathastats', wrapAsync(orderController.getOrderStats));
router.post('/admin/allstatus', wrapAsync(orderController.updateAllStatus));
router.delete('/admin/delete', wrapAsync(orderController.deleteAllOrders));
router.post('/admin/:id/paid', wrapAsync(orderController.markAsPaid));


module.exports = router;