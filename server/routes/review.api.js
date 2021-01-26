const express = require("express");
const { route } = require("./auth.api");
const { body, param } = require("express-validator");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const validators = require("../middlewares/validator");

/**
 * @route POST api/reviews/clinics/:id
 * @description Create a new review for a blog
 * @access Login required
 */
router.post(
  "/clinic/:id",
  // authMiddleware.loginRequired,
  // validators.validate([
  //   param("id").exists().isString().custom(validators.checkObjectId),
  //   body("content", "Missing content").exists().notEmpty(),
  // ]),
  reviewController.createNewReview
);

/**
 * @route GET api/reviews/clinic/:id?page=1&limit=10
 * @description Get reviews of a blog with pagination
 * @access Public
 */
router.get(
  "/clinic/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  reviewController.getReviewsOfClinic
);

/**
 * @route GET api/reviews/clinic/:id?page=1&limit=10
 * @description Get reviews of a blog with pagination
 * @access Public
 */
router.get("/", reviewController.getRandomReview);

/**
 * @route PUT api/reviews/:id
 * @description Update a review
 * @access Login required
 */
router.put(
  "/:id",
  // authMiddleware.loginRequired,
  // validators.validate([
  //   param("id").exists().isString().custom(validators.checkObjectId),
  //   body("content", "Missing content").exists().notEmpty(),
  // ]),
  reviewController.updateSingleReview
);
/**
 * @route DELETE api/reviews/:id
 * @description Delete a review
 * @access Login required
 */
router.delete(
  "/:id",
  // authMiddleware.loginRequired,
  // validators.validate([
  //   param("id").exists().isString().custom(validators.checkObjectId),
  // ]),
  reviewController.deleteSingleReview
);

module.exports = router;
