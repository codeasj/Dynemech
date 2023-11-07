const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
  },
  requiredSpecifications: {
    type: String,
  },
  leadSource: {
    type: String,
    enum: [
      "IndiaMart",
      "JustDial",
      "EmailMarketing",
      "Social",
      "Exhibition",
      "Organic",
    ],
  },
  firstContactDate: {
    type: String,
  },
  Status: {
    type: String,
    enum: [
      "Created",
      "IntroMailSent",
      "AssignedToSales",
      "SkuRequired",
      "Pricing",
      "Design",
      "Quotation",
      "ClosedWon",
      "ClosedLost",
    ],
    required: true,
  },
  comments: [
    {
      text: {
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
    },
  ],
  sku: [
    {
      skuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sku",
      },
      skuModelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skumodel",
      },
      quantity: {
        type: Number,
      },
      pricing: {
        type: String,
      },
    },
  ],
  photos: [
    {
      type: String,
    },
  ],
  pricing: {
    type: String,
  },
  quotationpdfUrl: [
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
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedBy: {
    type: String,
  },
});

module.exports = mongoose.model("Lead", leadSchema);
