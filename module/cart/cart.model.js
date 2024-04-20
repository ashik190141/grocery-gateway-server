const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cart", cartSchema);
