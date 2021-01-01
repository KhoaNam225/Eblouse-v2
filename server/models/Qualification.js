const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const qualificationSchema = Schema({
  name: { type: String, required: true },
});

const Qualification = mongoose.model("Qualification", qualificationSchema);

module.exports = Qualification;
