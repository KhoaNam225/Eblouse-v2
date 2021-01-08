const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Booking = require("../models/Booking");
const userController = {};

// userController.register = catchAsync(async (req, res, next) => {
//   let { name, email, avatarUrl, password } = req.body;
//   let user = await User.findOne({ email });
//   if (user)
//     return next(new AppError(409, "User already exists", "Register Error"));

//   const salt = await bcrypt.genSalt(10);
//   password = await bcrypt.hash(password, salt);
//   user = await User.create({
//     name,
//     email,
//     password,
//     avatarUrl,
//   });
//   const accessToken = await user.generateToken();

//   return sendResponse(res, 200, true, { user }, null, "Create user successful");
// });

//  user can send the booking to clinic
userController.sendBookingRequest = catchAsync(async (req, res, next) => {
  const userId = req.userId; // from
  const toClinicId = req.params.id; //To

  const user = await User.findById(toClinicId);
  if (!user) {
    return next(
      new AppError(400, "User not found", "send Booking request Error")
    );
  }

  let bookingRelate = await Booking.findOne({
    from: userId,
    to: toClinicId,
  });
  if (!bookingRelate) {
    await Booking.create({
      from: userId,
      to: toClinicId,
      status: "pending",
    });
    return sendResponse(res, 200, true, null, null, "Request has been sent ");
  } else {
    switch (friendship.status) {
      case "pending":
        if (bookingRelate.from.equals(userId)) {
          return next(
            new AppError(
              400,
              "You have already send a booking to this clinic",
              "Sent booking error"
            )
          );
        }
        break;
      case "active":
        return next(
          new AppError(
            400,
            "Users already booked an appointment",
            "booking accerpted Error"
          )
        );
        break;
      case "cancelled":
      case "done":
        bookingRelate.from = userId;
        bookingRelate.to = toClinicId;
        bookingRelate.status = "requesting";
        await bookingRelate.save();
        return sendResponse(
          res,
          200,
          true,
          null,
          { bookingRelate },
          "request has been sent "
        );
        break;
      default:
        break;
    }
  }
});

//  clinic
module.exports = userController;
