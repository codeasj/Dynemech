const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: "string",
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Category", categorySchema);
