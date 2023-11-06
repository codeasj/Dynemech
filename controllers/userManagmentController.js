const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, roleId, status, email, password, usertype } = req.body;
    console.log(req.file);

    const filename = req.file.filename;
    console.log({ body: req.body });

    let userExists = await User.exists({ email });

    if (userExists) throw new Error("user already exists");

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      roleId,
      status,
      profilepic: filename,
      password: passwordHash,
      usertype: usertype || "user",
    });

    // TODO: create a front-end page to handle verification request

    res.status(200).json({
      status: "success",
      data: user,
      message: "Add user",
      // TODO: remove
    });
  } catch (err) {
    next(err);
  }
};
//To see
module.exports.updateUser = async (req, res, next) => {
  const { name, phone, roleTypeId, status } = req.body;
  try {
    const requestId = req.params.id;
    const filename = req?.file?.filename;
    console.log(requestId);
    const user = await User.findByIdAndUpdate(
      requestId,

      {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(roleTypeId && { roleTypeId }),
        ...(status && { status }),
        ...(filename && { profilepic: filename }),
      },
      {
        new: true,
      }
    );
    if (!user) throw new Error("unauthorised", { cause: { status: 404 } });
    await user.save();
    res.status(200).json({
      status: "success",
      message: "user details updated",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find({});

    if (!user) throw new Error("user not found", { cause: { status: 404 } });
    res.status(200).json({
      status: "success",
      message: "user details fetched",
      user,
    });
  } catch (err) {
    next(err);
  }
};
