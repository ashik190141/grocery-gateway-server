const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("review", reviewSchema);
