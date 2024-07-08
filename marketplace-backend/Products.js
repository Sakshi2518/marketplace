const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  prod_name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  altImages: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  origPrice: {
    type: Number,
    required: true,
  },
  dimensions: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
