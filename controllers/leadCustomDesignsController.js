const LeadCustom = require("../models/leadCustomDesignsModel");
const Lead = require("../models/leadModel");
//add LeadCustom
exports.createLeadCustom = async (req, res) => {
  try {
    const { leadId, Comments, addedBy, status } = req.body;

    //console.log(req.body);
    //conole.log(req.files);
    //console.log(status);
    const documents = req.files.map((doc) => doc.filename);

    // if (req.body.status == "Approved") {
    //   console.log("asd");
    // }

    const response = await LeadCustom.create({
      leadId,
      Comments,
      addedBy,
      status,
      photoUrl: documents,
    });

    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: err.message,
    });
  }
};
