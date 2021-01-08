const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Clinic = require("../models/Clinic");
const Review = require("../models/Review");
const Doctor = require("../models/Doctor");
const Booking = require("../models/Booking");
const userController = require("./user.controller");
const User = require("../models/User");

const clinicController = {};

//  user can search clinic by query in category
clinicController.getSearchCategory = catchAsync(async (req, res, next) => {
  let { query } = req.query;
  let clinicList = await Clinic.findOne({ query });
  if (!clinicList)
    return next(new AppError(404, "Sepecialization not found", "Query Error"));
  return sendResponse(res, 200, true, { clinicList }, null, "Query success");
});

//  user can get detail of clinic
clinicController.getSingleClinic = catchAsync(async (req, res, next) => {
  let clinic = await Clinic.findById(req.params.id)
    .populate({
      path: "doctors",
      populate: [
        { path: "qualification", model: "Qualification" },
        { path: "specialization", model: "Specialization" },
      ],
    })
    .populate("specializations")
    .populate("services");
  clinic = clinic.toJSON();
  if (!clinic)
    return next(
      new AppError(404, "clinic not found", " Get single clinic Error")
    );
  clinic.reviews = await Review.find({ clinic: clinic._id }).populate("user");
  // console.log("hihihihih", clinic);
  return sendResponse(
    res,
    200,
    true,
    clinic,
    null,
    "get single clinic success"
  );
});

// user can see the clinic list
clinicController.getListOfClinic = catchAsync(async (req, res, next) => {
  let { page, limit } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const totalClinic = await Clinic.countDocuments();
  const totalPages = Math.ceil(totalClinic / limit);
  const offset = limit * (page - 1);

  const clinics = await Clinic.find({}).skip(offset).limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { clinics, totalClinic, totalPages },
    null,
    "get list of Clinic success"
  );
});

//  Clinic can see the booking request
clinicController.acceptBookingRequest = catchAsync(async (req, res, next) => {
  const clinicId = req.clinicId; //To
  const fromUserId = req.params.id; //From
  let bookingRelate = await Booking.findOne({
    from: fromUserId,
    to: clinicId,
    status: "requesting",
  });
  if (!bookingRelate) {
    return next(
      new AppError(
        404,
        "Booking request not found",
        "accept Booking request Error"
      )
    );
  }
  bookingRelate.status = "done";
  await bookingRelate.save();
  return sendResponse(res, 200, true, null, null, "Booking has been accepted");
});
clinicController.cancelBookingRequest = catchAsync(async (req, res, next) => {
  const clinicId = req.clinicId; //To
  const fromUserId = req.params.id; //From
  let bookingRelate = await Booking.findOne({
    from: fromUserId,
    to: clinicId,
    status: "requesting",
  });
  if (!bookingRelate) {
    return next(
      new AppError(
        404,
        "Booking request not found",
        "accept Booking request Error"
      )
    );
  }
  bookingRelate.status = "cancelled";
  await bookingRelate.save();
  return sendResponse(res, 200, true, null, null, "Booking has been cancelled");
});

//  Clinic can see the list of booking
clinicController.getBookingListUser = catchAsync(async (req, res, next) => {
  let { page, litmit, sortBy, ...filter } = { ...req.body };
  const userId = req.userId;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  let bookingRelate = await Booking.find({
    from: userId,
    status: "active",
  });
  const clinicIDs = bookingList.map((bookingRelate) => {
    if (bookingRelate.from._id.equals(userId)) return bookingRelate.to;
    return bookingRelate.from;
  });
  const totalBooking = await User.countDocuments({
    ...filter,
    isDeletedFalse: false,
    _id: { $in: clinicIDs },
  });
  const totalPages = Math.ceil(totalBooking / limit);
  const offset = limit * (page - 1);
  let clinics = await Clinic.find({ ...filter, _id: { $in: clinicIDs } })
    .sort({ ...sortBy, createAt: -1 })
    .skip(offset)
    .limit(limit);
  const promises = users.map(async (user) => {
    let temp = user.toJSON();

    temp.bookingRelate = bookingRelate.find((bookingRelate) => {
      if (bookingRelate.from.equals(user._id)) {
        return { status: bookingRelate.status };
      }
      return false;
    });
    return temp;
  });
  // const promises = clinics.map(async(clinic) => {
  //   let temp2 = clinic.toJSON();
  //   temp2.bookingRelate = bookingList.find((bookingRelate) => {
  //     if(bookingRelate.to.equals(clinic._id)) {
  //       return {status: }
  //     }
  //   })
  // })
  const bookingRequestList = await Promise.all(promises);
  sendResponse(res, 200, true, { clinics });
});
module.exports = clinicController;
