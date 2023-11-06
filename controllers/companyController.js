const Company = require("../models/companyModel");

//add customer
exports.createCompany = async (req, res) => {
  try {
    const {
      name,
      addStreet,
      addCity,
      addState,
      addCountry,
      addPincode,
      companySize,
      addedBy,
    } = req.body;

    console.log(req.file);
    const filename = req.file.filename;
    console.log(filename);

    const response = await Company.create({
      name,
      addStreet,
      addCity,
      addState,
      addCountry,
      addPincode,
      companySize,
      addedBy,
      companyLogo: filename,
    });

    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Servor Error",
    });
  }
};

//get company
exports.getCompany = async (req, res) => {
  try {
    const cmpny = await Company.find({});
    res.status(200).json({
      success: true,
      data: cmpny,
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

//updateCompany
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      addStreet,
      addCity,
      addState,
      addCountry,
      addPincode,
      companySize,
      addedBy,
    } = req.body;

    const filename = req.file.filename;
    console.log(filename);

    const resp = await Company.findByIdAndUpdate(
      { _id: id },
      {
        name,
        addStreet,
        addCity,
        addState,
        addCountry,
        addPincode,
        companySize,
        addedBy,
        addedAt: Date.now(),
        companyLogo: filename,
      }
    );
    if (!resp) {
      res.status(404).json({
        success: false,
        message: `Data with id: ${id} not found`,
      });
      return;
    } //send a json responce with a success flag
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

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const dltd = await Company.findByIdAndDelete({ _id: id });
    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "company data deleted succesfully",
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
