const express = require("express");
const { route } = require("./booking.api");
const { body, param } = require("express-validator");
const router = express.Router();
const clinicController = require("../controllers/clinic.controller");
const validators = require("../middlewares/validator");

/**
 * @route GET api/booking/:id
 * @description Get single booking
 * @access Login required
 */

// router.get(
//   "/:id",
//   validators.validate([param("id").exists().custom(validators.checkObjectId)]),
//   clinicController.getSingleBooking
// );

/**
 * @route GET api/booking?page=1&limit=10
 * @description Get bookings with limit, page
 * @access Login required
 */

router.get("/", clinicController.getBookingListUser);

/**
 * @route POST api/booking/:id
 * @description Create a new booking for a booking
 * @access Login required
 */
// router.post(
//   "/booking/:id",
//   // authMiddleware.loginRequired,
//   validators.validate([
//     param("id").exists().isString().custom(validators.checkObjectId),
//     body("content", "Missing content").exists().notEmpty(),
//   ]),
//   clinicController.createNewBooking
// );

/**
 * @route POST api/booking/add/:id
 * @description Send a booking request to a clinic
 * @access Login required
 */
// router.post(
//   "/add/:id",
//   authMiddleware.loginRequired,
//   validators.validate([
//     param("id").exists().isString().custom(validators.checkObjectId),
//   ]),
//   userController.sendBookingRequest
// );

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
  ]),
  clinicController.acceptBookingRequest
);
/**
 * @route PUT api/booking/:id
 * @description Update a booking, user can cancel this booking
 * @access Login required
 */
router.post(
  "/manage/:id",
  // authMiddleware.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  clinicController.cancelBookingRequest
);

module.exports = router;
