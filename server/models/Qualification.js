/**
 * Author: Vo Trinh Boi Quyen
 * File name: Qualification.js
 * Last Date Modified: 16 Feb 2021
 * Purpose: Qualification schema for the app
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const qualificationSchema = Schema({
  name: { type: String, required: true },
});

const Qualification = mongoose.model("Qualification", qualificationSchema);

module.exports = Qualification;
