const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  description: {
    type:String, 
    required: true
  },
  inStock:{
    type: Boolean,
    // required: true
    default: true,
  },
})

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;