const express = require("express");
const { route } = reuqire("./auth.api");
const { body, param } = require("express-validator");
const router = express.Router();
const bookController = require("../controllers/booking.controller");
const validators = require("../middlewares/validator");

/**
 * @route GET api/booking/:id
 * @description Get single booking
 * @access Login required
 */

router.get(
  "/:id",
  validators.validate([param("id").exists().custom(validators.checkObjectId)]),
  bookController.getSingleBooking
);

/**
 * @route GET api/booking?page=1&limit=10
 * @description Get bookings with limit, page
 * @access Login required
 */

router.get("/", bookController.getListOfBooking);

/**
 * @route POST api/booking/:id
 * @description Create a new booking for a clinic
 * @access Login required
 */
router.post(
  "/booking/:id",
  // authMiddleware.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("content", "Missing content").exists().notEmpty(),
  ]),
  bookController.createNewBooking
);
/**
 * @route PUT api/booking/:id
 * @description Update a booking, user can cancel this booking
 * @access Login required
 */
router.put(
  "/:id",
  // authMiddleware.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("content", "Missing content").exists().notEmpty(),
  ]),
  bookController.cancelBooking
);

module.exports = router;
