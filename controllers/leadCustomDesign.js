const LeadCustom = require("../models/leadCustomDesignsModel");

//add lead custom design
exports.createLeadCustom = async (req, res) => {
  try {
    const { leadId, photoUrl, comments, addedBy, status } = req.body;

    console.log(req.body);
    console.log(req.files);
    const documents = req.files.map((doc) => doc.filename);

    const response = await LeadCustom.create({
      leadId,
      photoUrl: documents,
      comments,
      addedBy,
      status,
    });
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created Succcessfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: "Internal server Error",
      message: err.message,
    });
  }
};

//get leadCustomDesign
exports.getLeadCustom = async (req, res) => {
  try {
    const lead = await LeadCustom.find({});
    res.status(200).json({
      success: true,
      data: lead,
      message: "Entry Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server error",
    });
  }
};

//update lead Custom design
exports.updateLeadCustom = async (req, res) => {
  try {
    const { id } = req.params;
    const { leadId, photoUrl, comments, addedBy, status } = req.body;

    const lead = await LeadCustom.findByIdAndUpdate(
      { _id: id },
      {
        leadId,
        photoUrl,
        comments,
        addedBy,
        status,
        createdAt: Date.now(),
      }
    );

    if (!lead) {
      res.status(400).json({
        success: false,
        message: `Data with id: ${id} not found`,
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: lead,
      message: "Entry updated successfully",
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

//delete defaut size
exports.deleteLeadCustom = async (req, res) => {
  try {
    const { id } = req.params;
    dltd = await LeadCustom.findByIdAndDelete({ _id: id });

    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "LeadCustom Design data deleted succesfully",
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
