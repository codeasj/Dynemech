const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },

  addStreet: {
    type: String,
  },
  addCity: {
    type: String,
  },
  addState: {
    type: String,
  },
  addCountry: {
    type: String,
  },
  addPincode: {
    type: Number,
  },
  companySize: {
    type: String,
    enum: ["0-10", "10-100", "100-10000", ">10000"],
  },
  companyLogo: {
    type: String,
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Company", companySchema);
