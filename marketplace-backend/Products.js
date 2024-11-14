
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
 
  prod_name: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  altImages: {
    type: [String],
    required: true
  },
 
  price: {
    type: Number,
    required: true
  },
  origPrice: {
    type: Number,
    required: true
  },
  dimensions: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  seller: { 
    userId : {type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' }, // Reference to the seller
    phoneNo : {
      type: String
    }

} });

const Products = mongoose.model('Product', ProductSchema);

module.exports = Products;
