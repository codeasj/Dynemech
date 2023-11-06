const mongoose = require("mongoose");

const skuSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
  photos: [
    {
      type: String,
    },
  ],
  specs: [
    {
      type: String,
    },
  ],
  addedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  addedBy: {
    type: String,
  },
});

module.exports = mongoose.model("Sku", skuSchema);
