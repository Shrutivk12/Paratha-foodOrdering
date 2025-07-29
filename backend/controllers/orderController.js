const User = require("../models/user.js");
const Order = require("../models/order.js");
const Food = require("../models/food.js");
const { cloudinary } = require('../config/cloud.js');
const {sendMail} = require('../config/mailer.js');

//client side

module.exports.placeOrder = async (req, res) => {
    console.log(req.user);
    try{
        const {items, totalAmount} = req.body;
        const order = new Order({user: req.user._id, items, totalAmount});
        await order.save();
        await User.findByIdAndUpdate(req.user._id, { cartData: {} });
        res.json({ success: true, message: "Order Placed", order });
    }catch(err){
        res.json({ success: false, message: err });
    }
}

module.exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("items.itemId").sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (err) {
        console.error("Fetch user orders error:", err);
        res.json({ success: false, message: "Failed to fetch orders" });
    }
}

module.exports.cancelOrder = async(req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status !== 'Preparing') {
      return res.status(400).json({ message: "Order cannot be cancelled now" });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel order" });
  }
}

module.exports.orderPayment = async(req, res) =>{ 
  try {
    const { id } = req.params;
    const screenshotUrl = req.file.path;

    await Order.findByIdAndUpdate(id, {
      paymentScreenshot: screenshotUrl
    });

    res.json({ success: true, screenshot: screenshotUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
}

//Admin side

module.exports.getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find({}).populate("user").populate("items.itemId").sort({createdAt: -1});
        res.json({ success: true, data: orders });
    }catch (err) {
        console.error("Fetch user orders error:", err);
        res.json({ success: false, message: "Failed to fetch orders" });
    }
}

module.exports.updateStatus = async (req, res) =>{
    try{
        await Order.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Status updated"});
    }catch(err){
        console.log(err);
        res.json({success: false, message: "Error"});
    }
}

module.exports.getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      { $match: { status: "Preparing" } },
      { $unwind: "$items" },  // break items[] into individual docs
      {
        $group: {
          _id: "$items.itemId",              // group by itemId (Food ID)
          totalOrdered: { $sum: "$items.quantity" }
        }
      },
      {
        $lookup: {
          from: "foods",             
          localField: "_id",
          foreignField: "_id",
          as: "foodDetails"
        }
      },
      { $unwind: "$foodDetails" },
      {
        $project: {
          _id: 0,
          foodName: "$foodDetails.name",
          totalOrdered: 1
        }
      }
    ]);

    res.json({success: true, data: stats});
  } catch (err) {
    console.error(err);
    res.status(500).json({success:false, message: err.message || "Something went wrong" });
  }
}

module.exports.updateAllStatus = async(req, res) => {
  const { status } = req.body;
  if (!['Preparing', 'Out for delivery', 'Delivered'].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  try{
    const updated = await Order.updateMany(
      { status: { $ne: 'Cancelled' } }, 
      { $set: { status } }
    );

    const updatedOrders = await Order.find({ status }).populate('user');
    
    const emailPromises = [];
    for (const order of updatedOrders) {
      const userEmail = order.user?.email;
      if (!userEmail) continue;

      if (status === 'Out for delivery') {
        emailPromises.push(
          sendMail(userEmail, 'Out of delivery', 'Your order is out for delivery 🚚')
        );
      } else if (status === 'Delivered') {
        emailPromises.push(
          sendMail(userEmail, 'Order Delivered', 'Your order has been delivered ✅')
        );
      }
    }
    try{
      await Promise.all(emailPromises);
    }catch(err){
      console.log(err);
    }

    res.json({success: true, message: `All orders marked as '${status}'`, updated: updated.modifiedCount });
  }catch(err){
    res.json({success:false, message: err.message || "Status update failed"});
  }
}

module.exports.deleteAllOrders = async(req, res) => {
  try {
    const ordersToDelete = await Order.find({
      $or: [
        { payment: true },
        { status: "Cancelled" }
      ]
    });

    for (const order of ordersToDelete) {
      if (order.paymentScreenshot) {
        const publicId = extractPublicId(order.paymentScreenshot);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }
    }

    const result = await Order.deleteMany({
      $or: [
        { payment: true },
        { status: "Cancelled" }
      ]
    });

    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete orders" });
  }
}

function extractPublicId(url) {
  try {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const publicId = filename.split('.')[0]; 
    return `payment_screenshots/${publicId}`;
  } catch (err) {
    return null;
  }
}

module.exports.markAsPaid = async(req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findById(id);

    if (!updatedOrder) {
      return res.json({ success: false, message: "Order not found" });
    }
    if (!updatedOrder.paymentScreenshot) {
      return res.json({ success: false, message: "Payment screenshot not uploaded yet" });
    }

    updatedOrder.payment = true;
    await updatedOrder.save();

    res.json({ success: true, message: "Order marked as paid", order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}