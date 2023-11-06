const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  catalogueUrl: [
    {
      type: String,
    },
  ],
  name: {
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

module.exports = mongoose.model("Subcategory", subCategorySchema);
