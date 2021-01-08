const express = require("express");
const router = express.Router();

// // userApi
// const userApi = require("./user.api");
// router.use("/users", userApi);

// // doctorApi
// const doctorApi = require("./doctor.api");
// router.use("/doctors", doctorApi);

// // bookingApi
// const bookingApi = require("./booking.api");
// router.use("/bookings", bookingApi);

// auth api

// clinicApi;
const clinicApi = require("./clinic.api");
router.use("/clinic", clinicApi);

// reviewApi;
const reviewApi = require("./review.api");
router.use("/review", reviewApi);

module.exports = router;
