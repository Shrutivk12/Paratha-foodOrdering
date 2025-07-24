const User = require("../models/user.js");
const Food = require("../models/food.js");

module.exports.addToCart = async (req, res) => {
    try{
        let currUser = req.user;
        const cartData = currUser.cartData;
        const food = await Food.findById(req.body.itemId);
        if (!food || !food.inStock) {
            return res.json({success: false, message: "Item is out of stock!" });
        }
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }
        await User.findByIdAndUpdate(req.user._id, {cartData});
        res.json({success: true, message: "Added to cart"});
    }catch (err) {
        console.log(err);
        res.json({success: false, message: "Error"});
    }
}

module.exports.removeFromCart = async (req, res) => {
    try{
        let currUser = req.user;
        const cartData = currUser.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await User.findByIdAndUpdate(req.user._id, {cartData});
        res.json({success: true, message: "Remove from cart"});
    }catch(err){
        console.log(err);
        res.json({success: false, message: "Error"});
    }
}

module.exports.getCartData = async (req, res) => {
    try{
        let currUser = req.user;
        const cartData = currUser.cartData;
        res.json({success: true, message: "cart fetched", cartData});

    }catch(err) {
        console.log(err);
        res.json({success: false, message: "Error"});
    }
}