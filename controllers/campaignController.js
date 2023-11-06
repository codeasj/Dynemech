const Campaign = require("../models/campaignModel");

//add campaign
exports.createCampaign = async (req, res) => {
  try {
    const { name, place, startDate, endDate, addedBy } = req.body;
    const response = await Campaign.create({
      name,
      place,
      startDate,
      endDate,
      addedBy,
    });
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.mesage,
    });
  }
};

//get Campaign
exports.getCampaign = async (req, res) => {
  try {
    const cmpgn = await Campaign.find({});
    res.status(200).json({
      success: true,
      data: cmpgn,
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

//updateCampaign
exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, place, startDate, endDate, addedBy } = req.body;

    const resp = await Campaign.findByIdAndUpdate(id, {
      name,
      place,
      startDate,
      endDate,
      addeedAt: Date.now(),
      addedBy,
    });
    if (!resp) {
      res.status(404).json({
        success: false,
        message: `Data with id: ${id} not found`,
      });
      return;
    }
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

//delete Campaign

exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const dltd = await Campaign.findByIdAndDelete({ _id: id });
    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Campaign data deleted succesfully",
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
