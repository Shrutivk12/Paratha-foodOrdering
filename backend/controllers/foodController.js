const Food = require("../models/food.js");
const fs = require('fs');

module.exports.addFood = async (req, res) => {
    try{
        if(!req.file){
            return res.json({success:false, message:"Image is required"})
            // newFood.image = req.file.filename;
            // console.log(req.file);
        }
        let img_filename = `${req.file.filename}`;
        let newFood = new Food({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:img_filename,
        });
    
        await newFood.save();
        res.json({success: true, message: "Food Added"});
    }catch(err){
        res.json({success:false, message:"Adding item failed"})
    }
}

module.exports.showFoodList = async (req, res) => {
    try{
        const foodList = await Food.find({});
        // res.send(foodList);
        res.json({success: true, message: "List fetched", data: foodList});
    }catch(err){
        res.json({success:false, message:"List cannot be fetched"})
    }
}

module.exports.removeFood = async (req, res) => {
    try{
        let food = await Food.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () =>{});
    
        await Food.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food Removed"});
    }catch(err){
        res.json({success:false, message:"Removing item failed"})
    }
}

module.exports.updateInStock = async(req, res) => {
    try {
        const { inStock } = req.body;
        const food = await Food.findByIdAndUpdate(req.params.id, { inStock }, { new: true });
        res.json(food);
    } catch (err) {
        res.status(500).json({ error: "Failed to update stock status" });
    }
}