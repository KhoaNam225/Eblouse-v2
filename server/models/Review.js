const mongoose = require("mongoose");
const Clinic = require("./Clinic");
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

reviewSchema.statics.calculateReviews = async function (clinicId) {
  const reviewCount = await this.find({ clinic: clinicId }).countDocuments();

  await Clinic.findByIdAndUpdate(clinicId, { reviewCount: reviewCount });
};

reviewSchema.statics.calculateRatingSum = async function (clinicId) {
  const reviews = await this.find({ clinic: clinicId });
  let sum = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += Number.parseInt(reviews[i].rating);
  }

  await Clinic.findByIdAndUpdate(clinicId, { ratingSum: sum });
};

reviewSchema.post("save", async function () {
  await this.constructor.calculateReviews(this.clinic);
  await this.constructor.calculateRatingSum(this.clinic);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
