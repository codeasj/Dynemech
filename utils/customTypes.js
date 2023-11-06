

module.exports.userType = {
  type: String,
  enum: ["superadmin", "staff", "admin", "user"],
  default: "user",
};
