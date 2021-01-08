// const express = require("express");
// const validators = require("../middlewares/validator");
// const authController = require("../controllers/auth.controller");
// const { body } = require("express-validator");
// const router = express.Router();

// /**
//  * @route POST api/auth/login
//  * @description Login
//  * @access Public
//  */
// router.post(
//   "/login",
//   validators.validate([
//     body("email", "Invalid email").exists().isEmail(),
//     body("password", "Invalid password").exists().notEmpty(),
//   ]),
//   authController.loginWithEmail
// );

// /**
//  * @route POST api/auth/login/facebook
//  * @description Login with facebook
//  * @access Public
//  */

// /**
//  * @route POST api/auth/login/google
//  * @description Login with google
//  * @access Public
//  */
// module.exports = router;
