const LeadAssignment = require("../models/leadAssignmentModel");

//add lead assignment
exports.createLeadAssignment = async (req, res) => {
  try {
    const { leadId, userId, leadRoleId, addedBy } = req.body;
    console.log(req.body);
    console.log(req.files);

    const response = await LeadAssignment.create({
      leadId,
      userId,
      leadRoleId,
      addedBy,
    });
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry created succesfully",
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

//get lead assignment
exports.getLeadAssignment = async (req, res) => {
  try {
    const leads = await LeadAssignment.find({});
    res.status(200).json({
      success: true,
      data: leads,
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

//update lead Assignment
exports.updateLeadAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { leadId, userId, leadRoleId, createdBy } = req.body;
    const leads = await LeadAssignment.findByIdAndUpdate(
      { _id: id },
      { leadId, userId, leadRoleId, createdAt: Date.now(), createdBy }
    );

    if (!leads) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: leads,
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

//delete lead Assignment
exports.deleteLeadAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    dltd = await LeadAssignment.findByIdAndDelete({ _id: id });

    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Lead Assignment data deleted succesfully",
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
