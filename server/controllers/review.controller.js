const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Clinic = require("../models/Clinic");
const Review = require("../models/Review");
const reviewController = {};

reviewController.createNewReview = catchAsync(async (req, res, next) => {
  const clinicId = req.params.id;

  const { userId, content, rating } = req.body;
  console.log("chekc urser id", userId);
  const clinic = await Clinic.findById(clinicId);

  if (!clinic)
    return next(
      new AppError(404, "Clinic not found", "Create new Review Error")
    );
  let review = await Review.create({
    user: userId,
    clinic: clinicId,
    content,
    rating,
  });
  review = await review.populate("clinic").populate("user").execPopulate();
  return sendResponse(
    res,
    200,
    true,
    review,
    null,
    "Create new review successful"
  );
});

reviewController.getReviewsOfClinic = catchAsync(async (req, res, next) => {
  const clinicId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const clinic = await Clinic.findById(clinicId);
  if (!clinic)
    return next(new AppError(404, "clinic not found", "get reviews Error"));
  const totalReviews = await Review.countDocuments({ clinic: clinicId });
  const totalPages = Math.ceil(totalReviews / limit);
  const offset = limit * (page - 1);
  const reviews = await Review.find({ clinic: clinicId })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);
  return sendResponse(res, 200, true, { reviews, totalPages }, null, "");
});

reviewController.getRandomReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({})
    .populate("user", ["name", "avatarUrl"])
    .populate("clinic", ["name", "address"]);
  if (!reviews)
    return next(
      new AppError(400, "Reviews not found ", "get random review error")
    );
  return sendResponse(
    res,
    200,
    true,
    reviews,
    null,
    "get random reviews sucessful"
  );
});

reviewController.updateSingleReview = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const reviewId = req.params.id;
  const { content } = req.body;
  const review = await Review.findOneAndUpdate(
    { _id: reviewId },
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
  const review = await Review.findOneAndDelete({
    _id: reviewId,
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
