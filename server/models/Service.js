const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = Schema({
  name: { type: String, required: true },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
