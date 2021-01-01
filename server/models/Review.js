const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    clinic: { type: Schema.Types.ObjectId, required: true, ref: "Clinic" },
    content: { type: String, required: true },
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
  },
  { timestamp: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
