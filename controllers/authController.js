const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const VerificationRequest = require("../models/verificationRequestModel");
const { generateToken } = require("../utils/generateToken");
const PasswordResetRequest = require("../models/passwordResetModel");
const validate = require("../utils/validate");
module.exports.registerUserWithEmail = async (req, res, next) => {
  try {
    const { email, password, usertype } = req.body;
    console.log({ body: req.body });
    let userExists = await User.exists({ email });
    if (userExists) throw new Error("user already exists");

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,

      password: passwordHash,
      usertype: usertype || "user",
    });

    const request = await VerificationRequest.create({
      email: req.body.email,
    });
   

    res.status(200).json({
      status: "success",
      message: "verification link sent to email",
      verificationId: request._id, // TODO: remove
    });
  } catch (err) {
    next(err);
  }
};



module.exports.loginUserEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select(
      "-createdAt -updatedAt -__v"
    );
    if (!user) throw new Error("incorrect email");
    console.log({ password, user });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("incorrect password");

   

    const accessToken = generateToken(user);
    console.log(accessToken);
    return res.status(200).json({
      status: "success",
      isVerified: true,
      message: "login successful",
      accessToken,
      user,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.generateResetPasswordRequest = async (req, res) => {
  const errors = validate(req);
  if (errors) return res.status(400).json({ status: "error", errors });
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "User Does Not Exist" });
    }
    const resetPasswordRequest = await PasswordResetRequest.create({
      user,
    });
    const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password/${resetPasswordRequest._id}`;
    console.log({ resetPasswordLink });
    res.status(200).json({
      status: "success",
      message: "Reset Password Link Sent",
      requestId: resetPasswordRequest._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports.resetPassword = async (req, res) => {
  const errors = validate(req);
  if (errors) return res.status(400).json({ status: "error", errors });

  const { password, requestId } = req.body;
  try {
    const request = await PasswordResetRequest.findById(requestId);
    if (!request) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid Request" });
    }
    if (request.isUsed) {
      return res
        .status(400)
        .json({ status: "error", message: "Link Already Used" });
    }
    const isLinkExpired =
      Date.now().valueOf() - request.createdAt.valueOf() > 1000 * 60 * 10;
    if (isLinkExpired) {
      return res.status(400).json({ status: "error", message: "Link Expired" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      request.user._id,
      { password: hash },
      { new: true }
    );
    request.isUsed = true;
    await request.save();

    res.status(200).json({
      status: "success",
      message: "Password Reset Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};
