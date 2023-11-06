const Customer = require("../models/customerModel");

// add customer
exports.createCustomer = async (req, res) => {
  try {
    //fetch data
    const {
      name,
      companyId,
      contactNumber,
      alternateContactNumber,
      email,
      alternateEmail,
      locationCity,
      role,
      note,
      addedBy,
      status,
    } = req.body;

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const response = await Customer.create({
      name,
      companyId,
      contactNumber,
      alternateContactNumber,
      email,
      alternateEmail,
      locationCity,
      role,
      note,
      addedBy,
      status,
      addedAt: Date.now(),
    });

    //send a json responce with a success flag
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry created succesfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};

//get customer
exports.getCustomer = async (req, res) => {
  try {
    const cstmr = await Customer.find({});
    res.status(200).json({
      success: true,
      data: cstmr,
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

//update the customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      companyId,
      contactNumber,
      alternateContactNumber,
      email,
      alternateEmail,
      locationCity,
      role,
      note,
      addedBy,
      status,
    } = req.body;

    const resp = await Customer.findByIdAndUpdate(
      { _id: id },
      {
        name,
        companyId,
        contactNumber,
        alternateContactNumber,
        email,
        alternateEmail,
        locationCity,
        role,
        note,
        addedBy,
        status,
        addedAt: Date.now(),
      }
    );

    if (!resp) {
      res.status(404).json({
        success: false,
        message: `Data with id: ${id} not found`,
      });
      return;
    }

    //send a json responce with a success flag
    res.status(200).json({
      success: true,
      data: resp,
      message: "Entry updated succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: error.message,
    });
  }
};
