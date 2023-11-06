const mongoose = require("mongoose");
const { userType } = require("../utils/customTypes");
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, sparse: true, required: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  roleTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  status: {
    type: String,
    enum: ["Active", "In Active"],
  },
  profilepic: {
    type: String,
  },
  createdBy: {
    type: String,
  },

  usertype: {
    ...userType,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
