const express = require("express");
const { route } = require("./auth.api");
const { body, param } = require("express-validator");
const router = express.Router();
const clinicController = require("../controllers/clinic.controller");
const validators = require("../middlewares/validator");

/**
 * @route GET api/clinic?q=:category
 * @description Get clinics with query
 * @access Public
 */

router.post(
  "/search",
  validators.validate([body("query", "No query").exists().notEmpty()]),
  clinicController.getSearchCategory
);

/**
 * @route GET api/clinic?page=1&limit=10&q=:category
 * @description Get clinics with limit, page and query
 * @access Public
 */

router.get("/", clinicController.getListOfClinic);

/**
 * @route GET api/clinic/:id
 * @description Get single clinic
 * @access Public
 */

router.get(
  "/:id",
  validators.validate([param("id").exists().custom(validators.checkObjectId)]),
  clinicController.getSingleClinic
);

module.exports = router;
