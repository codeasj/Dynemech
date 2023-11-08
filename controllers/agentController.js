const Agent = require("../models/agentsModel");
const validate = require("../utils/validate");
const PasswordResetRequest = require("../models/passwordResetModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

//add agent or signup
exports.signup = async (req, res) => {
  try {
    //get data
    const {
      name,
      email,
      password,
      phoneNo,
      description,
      agentType,
      discountPercent,
      addedBy,
    } = req.body;

    //check if user already exist
    const existingUser = await Agent.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Agent already exist",
      });
    }

    //secure Password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
        message: "Error in hashing",
      });
    }

    //create entry for user
    const response = await Agent.create({
      name,
      email,
      password: hashedPassword,
      phoneNo,
      description,
      agentType,
      discountPercent,
      addedBy,
    });
    return res.status(200).json({
      succcess: true,
      data: response,
      message: "Agent Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Agent cannot be registered please try again later",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        success: false,
        message: "Please fill the details carefuly",
      });
    }
    //check for registered user
    let agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(401).json({
        success: false,
        message: "Agent is not registered",
      });
    }
    const payload = {
      email: agent.email,
      id: agent._id,
    };
    //verify password and generate a token
    if (await bcrypt.compare(password, agent.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      agent = agent.toObject();
      agent.token = token;
      agent.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true, //can't access from client side
      };
      res.cookie("token", token, options).status(200).json({
        sucess: true,
        token,
        agent,
        message: "Agent logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "password Incorrrect",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};

// get agent
exports.getAgent = async (req, res) => {
  try {
    const agent = await Agent.find({});
    res.status(200).json({
      success: true,
      data: agent,
      message: "Entire data fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};

// update agent
exports.updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      phoneNo,
      description,
      agentType,
      discountPercent,
      addedBy,
    } = req.body;

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
        message: "Error in hashing",
      });
    }
    const agent = await Agent.findByIdAndUpdate(
      { _id: id },
      {
        name,
        email,
        password: hashedPassword,
        phoneNo,
        description,
        agentType,
        discountPercent,
        addedBy,
        addedAt: Date.now(),
      }
    );

    if (!agent) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: agent,
      message: "Entry updated succesfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server error",
    });
  }
};

//delete agent
exports.deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;
    dltd = await Agent.findByIdAndDelete({ _id: id });

    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Agent data deleted succesfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};


exports.generateResetPasswordReq = async (req, res) => {
  const errors = validate(req);
  if (errors) return res.status(400).json({ status: "error", errors });
  try {
    const { email } = req.body;
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res
        .status(400)
        .json({ status: "error", message: "Agent Does Not Exist" });
    }
    const resetPasswordRequest = await PasswordResetRequest.create({
      agent,
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

exports.resetPasswor = async (req, res) => {
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
    const user = await Agent.findByIdAndUpdate(
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
