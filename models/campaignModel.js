const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  place: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  addedBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
