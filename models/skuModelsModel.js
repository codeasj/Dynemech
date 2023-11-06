const mongoose = require("mongoose");
const skuModelsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  skuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sku",
  },
  specification: [
    {
      specname: {
        type: String,
        required: true,
      },

      specvalue: {
        type: String,
        required: true,
      },
    },
  ],
  addedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Skumodel", skuModelsSchema);
