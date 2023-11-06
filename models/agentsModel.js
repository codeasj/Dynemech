const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
  },
  description: {
    type: String,
  },
  agentType: {
    type: String,
    enum: ["Inhouse", "Field", "Dealer"],
  },
  dicountPercent: {
    type: String,
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  addedBy: {
    type: String,
  },
});

module.exports = mongoose.model("Agent", agentSchema);
