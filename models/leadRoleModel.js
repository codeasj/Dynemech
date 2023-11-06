const mongoose = require("mongoose");

const leadRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },

  sentIntroMail: {
    type: Boolean,
  },
  addDesigns: {
    type: Boolean,
  },
  addQuotation: {
    type: Boolean,
  },
  addPricing: {
    type: Boolean,
  },
  addSku: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Leadrole", leadRoleSchema);
