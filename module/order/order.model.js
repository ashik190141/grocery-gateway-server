const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const orderSchema = mongoose.Schema({
  email: {
    type: String,
  },
  data: {
    type: [orderItemSchema],
  },
  totalPrice:{
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("order", orderSchema);
