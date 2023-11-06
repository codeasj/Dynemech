const mongoose = require("mongoose");
const verificationRequestSchema = new mongoose.Schema(
  {
    email: {
      type: String, // <phone number> or <email address>
      required: true,
    },

    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const VerificationRequest = mongoose.model(
  "VerificationRequest",
  verificationRequestSchema
);
module.exports = VerificationRequest;
