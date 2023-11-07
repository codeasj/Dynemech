const Lead = require("../models/leadModel");
const LeadAssignment = require("../models/leadAssignmentModel");

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
      Comments,
      Sku,
      pricing,
      AddedBy,
      UpdatedBy,
    } = req.body;

    console.log(JSON.stringify(req.body));
    console.log(req.files);
    const docs = req.files.quotationpdfUrl.map((doc) => doc.filename);
    console.log(docs);
    const response = await Lead.create({
      customerId,
      campaignId,
      requiredSpecification,
      leadSource,
      firstContactDate,
      Status,
      comments: Comments,
      sku: Sku,
      pricing,
      AddedBy,
      UpdatedBy,
      photos: req.files.photos[0].filename,
      quotationpdfUrl: docs, //req.files.quotationPdfUrl[0].filename,
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

    const docs = req.files.quotationpdfUrl.map((doc) => doc.filename);
    console.log(docs);

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
        photos: req.files.photos[0].filename,
        quotationpdfUrl: docs, //req.files.quotationPdfUrl[0].filename,
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

//delete Controller
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const dltd = await Lead.findByIdAndDelete({ _id: id });
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

//get assigned leads
exports.getAssignedLeads = async (req, res) => {
  try {
    const ls = await LeadAssignment.find({});
    const lead = await Lead.findOne({
      _id: { $in: ls.map((item) => item._id) },
    });
    console.log(lead);
    return res.status(200).json({
      success: true,
      data: lead,
      message: "Asssigned leads fetched succesfully",
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
