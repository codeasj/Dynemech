const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  contactNumber: {
    type: Number,
  },
  alternateContactNumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  alternateEmail: {
    type: String,
  },
  locationCity: {
    type: String,
  },
  role: {
    type: String,
  },
  note: {
    type: String,
  },
  addedAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  addedBy: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "In Active"],
  },
});

module.exports = mongoose.model("Customer", customerSchema);
