const Skumodel = require("../models/skuModelsModel");

//add skumodel

exports.createSkumodel = async (req, res) => {
  try {
    const { name, skuId, specification, addedBy } = req.body;

    const response = await Skumodel.create({
      name,
      skuId,
      specification,
      addedBy,
    });

    res.status(200).json({
      success: true,
      data: response,
      message: "Entry created Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: "Internal SErver Error",
      message: err.message,
    });
  }
};

//get skumodel
exports.getSkumodel = async (req, res) => {
  try {
    const skum = await Skumodel.find({});
    res.status(200).json({
      success: true,
      data: skum,
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

//update skumodel
exports.updateSkumodel = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, skuId, specification, addedBy } = req.body;
    console.log(addedBy);
    const resp = await Skumodel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        skuId,
        specification,
        addedAt: Date.now(),
        addedBy,
      },
      { new: true }
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

//delete skuModel
exports.deleteSkumodel = async (req, res) => {
  try {
    const { id } = req.params;

    dltd = await Skumodel.findByIdAndDelete({ _id: id });

    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "SkuModel data deleted succesfully",
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
