const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clinicSchema = Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  startWorkingTime: { type: String, required: true },
  endWorkingTime: { type: String, required: true },
  languages: [
    {
      type: String,
      enum: ["Vietnamese", "English", "Chinese", "Korean"],
    },
  ],
  registerNumber: { type: String, required: true },
  statement: { type: String, required: true },
  images: [{ type: String, required: true }],
  specializations: [
    { type: Schema.Types.ObjectId, required: true, ref: "Specialization" },
  ],
  services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  doctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
  avgRating: { type: Number, default: 0 },
});

const Clinic = mongoose.model("Clinic", clinicSchema);
module.exports = Clinic;
