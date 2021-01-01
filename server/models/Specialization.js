const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specializationSchema = Schema({
  name: { type: String, required: true },
});

const Specialization = mongoose.model("Specialization", specializationSchema);

module.exports = Specialization;
