const mongoose = rewuire("mongoose");

const leadAssignmentSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  leadRoleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Leadrole",
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  addedBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("LeadAssignment", leadAssignmentSchema);
