const mongoose = require("mongoose");

const leadCustomDesignsSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },
  photosUrl: {
    type: String,
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
  addedAt: {
    type: Date.now(),
    required: true,
    default: Date.now(),
  },
  addedBy: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Added", "Approved"],
  },
});
