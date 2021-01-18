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
const { findById } = require("../models/Clinic");

const clinicController = {};

clinicController.getSearchCategory = catchAsync(async (req, res, next) => {
  let query = req.body.query;
  let clinicList = await Clinic.find({}).populate("specializations");

  clinicList = clinicList.filter(function (clinic) {
    let specs = clinic.specializations;
    for (let i = 0; i < specs.length; i++) {
      if (specs[i].name == query) return true;
    }
    return false;
  });

  if (!clinicList)
    return next(new AppError(404, "Sepecialization not found", "Query Error"));
  return sendResponse(
    res,
    200,
    true,
    { query, clinicList },
    null,
    "Query success"
  );
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
  const bookingId = req.params.id; //From
  let bookingRelate = await Booking.findOne({
    _id: bookingId,
    status: "Pending",
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
  bookingRelate.status = "Active";
  await bookingRelate.save();
  return sendResponse(res, 200, true, null, null, "Booking has been accepted");
});
clinicController.cancelBookingRequest = catchAsync(async (req, res, next) => {
  const bookingId = req.params.id; //From
  let bookingRelate = await Booking.findOne({
    _id: bookingId,
    status: "Pending",
  });
  if (!bookingRelate) {
    return next(
      new AppError(
        404,
        "Booking request not found",
        "cancel Booking request Error"
      )
    );
  }
  bookingRelate.status = "Cancelled";
  await bookingRelate.save();
  return sendResponse(res, 200, true, null, null, "Booking has been cancelled");
});

//  Clinic can see the list of booking
clinicController.getBookingListUser = catchAsync(async (req, res, next) => {
  let { page, limit, sortBy, ...filter } = { ...req.query };
  const currentUser = req.userId;
  clinicId = await Booking.findById({ clinic: clinic._id });
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  let bookingRelate = await Booking.find({
    from: userId,
    status: "Pending",
  });
  const clinicIDs = bookingRelate.map((bookingRelate) => {
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
  const bookingRequestList = await Promise.all(promises);
  return sendResponse(
    res,
    200,
    true,
    {
      bookings: bookingRequestList,
      totalPages,
    },
    null,
    null
  );
});

module.exports = clinicController;
