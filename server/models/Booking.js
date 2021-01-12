const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Clinic = require("./Clinic");

const bookingSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    // doctor: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
    clinic: { type: Schema.Types.ObjectId, required: true, ref: "Clinic" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Active", "Cancelled", "Done"] },
  },
  {
    timestamps: true,
  }
);
// bookingSchema.statics.calculateBookings = async function (clinicId) {
//   const bookingCount = await this.find({ clinic: clinicId }).countDocuments();
//   await Clinic.findByIdAndUpdate(clinicId, { bookingCount: bookingCount });
// };
// bookingSchema.post("save", async function () {
//   await this.constructors.calculateBookings(this.clinic);
// });
// bookingSchema.pre(/^findOneAnd/, async function (next) {
//   await this.doc.constructor.calculateBookings(this.doc.clinic);
// });

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
