const User = require("../models/user.js");
const Order = require("../models/order.js");
const Food = require("../models/food.js");

module.exports.placeOrder = async (req, res) => {
    try{
        const {items, totalAmount} = req.body;
        const order = new Order({user: req.user._id, items, totalAmount});
        await order.save();
        await User.findByIdAndUpdate(req.user._id, { cartData: {} });
        res.json({ success: true, message: "Order Placed", order });
    }catch(err){
        res.json({ success: false, message: "Failed to create order" });
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

//Listing orders for admin
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
      { $unwind: "$items" },  // break items[] into individual docs
      {
        $group: {
          _id: "$items.itemId",              // group by itemId (Food ID)
          totalOrdered: { $sum: "$items.quantity" }
        }
      },
      {
        $lookup: {
          from: "foods",                     // collection name (check yours)
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
    res.status(500).json({ error: "Something went wrong" });
  }
}