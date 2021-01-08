const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Clinic = require("./Clinic");

const reviewSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    clinic: { type: Schema.Types.ObjectId, required: true, ref: "Clinic" },
    content: { type: String, required: true },
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },

    // reviewCount: { type: Number },
  },
  { timestamp: true }
);
// This function below is calculating the REVIEWS that CLINIC had.
reviewSchema.statics.calculateReviews = async function (clinicId) {
  const reviewCount = await this.find({ clinic: clinicId }).countDocuments();
  await Clinic.findByIdAndUpdate(clinicId, { reviewCount: reviewCount });
};
//  this function below is calculating the RATING of REVIEWS
reviewSchema.statics.calculateAvgRating = async function (clinicId) {
  // const reviews = await this.find({ clinic: clinicId });
  // let sum = 0;
  // for (let i = 0; i < reviews.length; i++) {
  //   sum += Number.parseInt(reviews[i].rating);
  // }

  // await Clinic.findByIdAndUpdate(clinicId, { ratingSum: sum });
  const stats = await this.aggregate([
    { $match: { clinic: clinicId } },
    {
      $group: {
        _id: "clinic",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log("-".repeat(20));
  console.log(stats);
  console.log("-".repeat(20));

  await Clinic.findByIdAndUpdate(clinicId, { avgRating: stats[0].avgRating });
};

reviewSchema.post("save", async function () {
  await this.constructor.calculateReviews(this.clinic);
  await this.constructor.calculateAvgRating(this.clinic);
});
//  before request for calculate reiew, it needs to go through middlewares like belows
reviewSchema.pre(/^findOneAnd/, async function (next) {
  await this.doc.constructor.calculateReviews(this.doc.blog);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
