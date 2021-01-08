const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Clinic = require("../models/Clinic");
const Review = require("../models/Review");
const reviewController = {};

reviewController.createNewReview = catchAsync(async (req, res, next) => {
  // const userId = req.params.userId;
  const clinicId = req.params.id;
  const { content } = req.body;
  console.log(content, "huhhihihih");
  const clinic = await Clinic.findById(clinicId);
  console.log("clinic ne:", clinic);
  if (!clinic)
    return next(
      new AppError(404, "Clinic not found", "Create new Review Error")
    );
  let review = await Review.create({
    // user: userId,
    clinic: clinicId,
    content,
  });
  review = await review.populate("clinic").execPopulate();
  return sendResponse(
    res,
    200,
    true,
    review,
    null,
    "Create new review successful"
  );
});

reviewController.updateSingleReview = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const reviewId = req.params.id;
  const { content } = req.body;
  const review = await Review.findOneAndUpdate(
    { _id: reviewId, user: userId },
    { content },
    { new: true }
  );
  if (!review)
    return next(
      new AppError(
        400,
        "Review not found or User not authorized",
        "update Review Error"
      )
    );
  return sendResponse(res, 200, true, review, null, "update successful");
});

reviewController.deleteSingleReview = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const reviewId = req.params.id;
  const review = await Review.findByIdAndDelete({
    _id: reviewId,
    user: userId,
  });
  if (!review)
    return next(
      new AppError(
        400,
        "Review not found or User not authorized",
        "Delete Review Error"
      )
    );
  return sendResponse(res, 200, true, null, null, "Delete successful");
});
module.exports = reviewController;
