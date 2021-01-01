const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  doctor: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
  clinic: { type: Schema.Types.ObjectId, required: true, ref: "Clinic" },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Active", "Cancelled", "Done"] },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
