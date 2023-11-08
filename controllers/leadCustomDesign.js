const LeadCustom = require("../models/leadCustomDesignsModel");
const Lead = require("../models/leadModel");
//add lead custom design
exports.createLeadCustom = async (req, res) => {
  try {
    const { leadId, comments, addedBy, status } = req.body;

    console.log(req.body);
    console.log(req.files);

    const documents = req.files.map((doc) => doc.path);
    console.log(documents);
    const response = await LeadCustom.create({
      leadId,
      comments,
      addedBy,
      status,
      photoUrl: documents,
    });

    if (status === "Approved") {
      // If status is "Approved," add photoUrl documents to Lead model's photos field
      const lead = await Lead.findById(leadId);

      let existingPhotos = [];
      if (lead && lead.photos && Array.isArray(lead.photos)) {
        existingPhotos = lead.photos;
      }

      const updatedPhotos = existingPhotos.concat(documents);

      // Update Lead model's photos field with existing and new documents
      await Lead.updateOne({ _id: leadId }, { photos: updatedPhotos });
    }

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
    const documents = req.files.map((doc) => doc.path);
    console.log(documents);
    const lead = await LeadCustom.findByIdAndUpdate(
      id,
      {
        leadId,
        photoUrl: documents,
        comments,
        addedBy,
        status,
        createdAt: Date.now(),
      },
      { new: true }
    );

    if (!lead) {
      res.status(400).json({
        success: false,
        message: `Data with id: ${id} not found`,
      });
      return;
    }

    if (status === "Approved") {
      const lead = await Lead.findById(leadId);

      let existingPhotos = [];
      if (lead && lead.photos && Array.isArray(lead.photos)) {
        existingPhotos = lead.photos;
      }

      const updatedPhotos = existingPhotos.concat(documents);

      await Lead.updateOne({ _id: leadId }, { photos: updatedPhotos });
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

//delete Lead Custom
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
      message: "Lead Custom Design data deleted succesfully",
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
