const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const User = require("../models/User");
const Clinic = require("../models/Clinic");
const bcrypt = require("bcryptjs");

const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }, "+password");
  let clinic = await Clinic.findOne({ email }, "+password");
  if (!user && !clinic)
    return next(new AppError(400, "Invalid credentials", "Login error"));

  let isMatch = false;
  if (user) isMatch = await bcrypt.compare(password, user.password);
  else isMatch = password === clinic.password;

  if (!isMatch) return next(new AppError(400, "Wrong password", "Login error"));

  if (user) {
    const accessToken = await user.generateToken();
    user = user.toJSON();
    user.isAdmin = false;

    return sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Login successful"
    );
  } else {
    const accessToken = await clinic.generateToken();
    clinic = clinic.toJSON();
    clinic.isAdmin = true;

    return sendResponse(
      res,
      200,
      true,
      { user: clinic, accessToken },
      null,
      "Login successful"
    );
  }
});

authController.loginWithFaceBookOrGoogle = catchAsync(
  async (req, res, next) => {
    // allow user to login or create a new account
    // depends on whether email already exists
    let profile = req.user;
    profile.email = profile.email.toLowerCase();
    let user = await User.findOne({ email: profile.email });
    let clinic = await Clinic.findOne({ email: profile.email });

    let returnedUser = null;

    if (user) {
      returnedUser = await User.findByIdAndUpdate(
        user._id,
        { avatarUrl: profile.avatarUrl },
        { new: true }
      );
    } else if (clinic) {
      returnedUser = await Clinic.findById(clinic._id);
    } else {
      let newPassword = "" + Math.floor(Math.random() * 100000000);
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);

      returnedUser = await User.create({
        name: profile.name,
        email: profile.email,
        password: newPassword,
        avatarUrl: profile.avatarUrl,
      });
    }
    const accessToken = await returnedUser.generateToken();
    returnedUser = returnedUser.toJSON();

    if (clinic) returnedUser.isAdmin = true;
    else returnedUser.isAdmin = false;

    return sendResponse(
      res,
      200,
      true,
      { user: returnedUser, accessToken },
      null,
      "Login successful"
    );
  }
);

module.exports = authController;
