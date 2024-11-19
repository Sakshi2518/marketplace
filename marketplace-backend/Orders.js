const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the user who ordered
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the user selling the product
  },
  orderDate: {
    type: Date,
    default: Date.now 
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products' // Reference to the product ordered
    },
    deliveryDate: {
      type: Date, // Delivery date specific to this product
      default: null // Initially null, can be updated later
    },
    isDelivered:{
        type: Boolean,
        default: false
    },
    isOrdered:{
      type: Boolean,
      default: false
    }
  }]
});

module.exports = mongoose.model("Order", orderSchema);
