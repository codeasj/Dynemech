const mongoose = require("mongoose");

const passwordResetRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PasswordResetRequest = mongoose.model(
  "PasswordResetRequest",
  passwordResetRequestSchema
);

module.exports = PasswordResetRequest;
