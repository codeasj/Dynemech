const Leadrole = require("../models/leadRoleModel");

//add lead role
exports.createLeadRole = async (req, res) => {
  try {
    const {
      name,
      sentIntroMail,
      addDesigns,
      addQuotation,
      addPricing,
      addSku,
    } = req.body;
    console.log(req.body);
    const response = await Leadrole.create({
      name,
      sentIntroMail,
      addDesigns,
      addQuotation,
      addPricing,
      addSku,
    });
    res.status(200).json({
      sucess: true,
      data: response,
      message: "Entry created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: error.message,
    });
  }
};

//get leadRole
exports.getLeadRole = async (req, res) => {
  try {
    const lead = await Leadrole.find({});
    res.status(200).json({
      success: true,
      data: lead,
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

//update lead role
exports.updateLeadRole = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      sentIntroMail,
      addDesigns,
      addQuotation,
      addPricing,
      addSku,
    } = req.body;
    const lead = await Leadrole.findByIdAndUpdate(
      { _id: id },
      {
        name,
        sentIntroMail,
        addDesigns,
        addQuotation,
        addPricing,
        addSku,
      },
      { new: true }
    );

    if (!lead) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: lead,
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

//deleteleadrole
exports.deleteLeadRole = async (req, res) => {
  try {
    const { id } = req.params;
    dltd = await Leadrole.findByIdAndDelete({ _id: id });

    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "LeadRole data deleted succesfully",
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
