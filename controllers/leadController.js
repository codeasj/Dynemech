const Lead = require("../models/leadModel");
const LeadAssignment = require("../models/leadAssignmentModel");
const path = require("path");

//add leads
exports.createLead = async (req, res) => {
  try {
    const {
      customerId,
      campaignId,
      requiredSpecification,
      leadSource,
      firstContactDate,
      Status,
      comments,
      sku,
      pricing,
      addedBy,
      updatedBy,
    } = req.body;

    const basePhotoUrl = path.dirname(__dirname) + "/uploads";
    console.log(req.files);

    const docs =
      req.files && req.files.quotationpdfUrl
        ? req.files.quotationpdfUrl.map((doc) => `${doc.path}`)
        : [];

    const photos =
      req.files && req.files.photos
        ? `${basePhotoUrl}/${req.files.photos[0].filename}`
        : "";
 
    
    console.log(JSON.stringify(docs));
    console.log(photos);

    const response = await Lead.create({
      customerId,
      campaignId,
      requiredSpecification,
      leadSource,
      firstContactDate,
      Status,
      comments,
      sku,
      pricing,
      addedBy,
      updatedBy,
      photos,
      quotationpdfUrl: docs,
    });

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

//get lead
exports.getLead = async (req, res) => {
  try {
    const leads = await Lead.find({});
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

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      customerId,
      campaignId,
      requiredSpecification,
      leadSource,
      firstContactDate,
      Status,
      comments,
      sku,
      pricing,
      addedBy,
      updatedBy,
    } = req.body;

    const basePhotoUrl = path.dirname(__dirname) + "/uploads";
    console.log(req.files);

    const docs =
      req.files && req.files.quotationpdfUrl
        ? req.files.quotationpdfUrl.map((doc) => `${doc.path}`)
        : [];

    const photos =
      req.files && req.files.photos
        ? `${basePhotoUrl}/${req.files.photos[0].filename}`
        : "";

    console.log(docs);
    console.log(photos);

    const resp = await Lead.findByIdAndUpdate(
      { _id: id },
      {
        customerId,
        campaignId,
        requiredSpecification,
        leadSource,
        firstContactDate,
        Status,
        comments,
        sku,
        pricing,
        addedBy,
        updatedBy,
        updatedAt: Date.now(),
        addedAt: Date.now(),
        photos,
        quotationpdfUrl: docs,
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

delete Controller;
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const dltd = await Lead.findByIdAndDelete(id);
    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Lead data deleted succesfully",
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

exports.getAssignedLeads = async (req, res) => {
  try {
    const leadAssignments = await LeadAssignment.find({});

    if (leadAssignments.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No assigned leads found",
      });
    }

    const leadIds = leadAssignments.map((item) => item.leadId);
    const leads = await Lead.find({ _id: { $in: leadIds } });

    if (leads.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No leads found for the assigned IDs",
      });
    }

    console.log(leads); // Logging the fetched leads

    return res.status(200).json({
      success: true,
      data: leads,
      message: "Assigned leads fetched successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
      message: err.message,
    });
  }
};
