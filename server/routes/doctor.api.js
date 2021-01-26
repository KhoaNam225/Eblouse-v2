const express = require("express");
const { route } = require("./auth.api");
const { body, param } = require("express-validator");
const router = express.Router();
const validators = require("../middlewares/validator");
const doctorController = require("../controllers/doctor.controller");

/**
 * @route GET api/doctors/:id
 * @description Get single doctor
 * @access Public
 */

// router.get(
//   "/:id",
//   validators.validate([param("id").exists().custom(validators.checkObjectId)]),
//   doctorController.getSingleDoctor
// );
/**
 * @route GET api/doctors/
 * @description Get list doctor
 * @access Public
 */

// router.get("/", doctorController.getListDoctor);

module.exports = router;
