const Sku = require("../models/skuModel");

//add sku
exports.createSku = async (req, res) => {
  try {
    const { name, description, subcategoryId, specs, addedBy } = req.body;
    console.log(req.body);
    console.log(req.files);
    const documents = req.files.map((doc) => doc.filename);

    const response = await Sku.create({
      name,
      description,
      specs,
      subcategoryId,
      addedBy,
      photos: documents,
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

//get Sku
exports.getSku = async (req, res) => {
  try {
    const sku = await Sku.find({});
    res.status(200).json({
      success: true,
      data: sku,
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

//update sku
exports.updateSku = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, subcategoryId, specs, addedBy } = req.body;

    const docs = req.files.map((doc) => doc.filename);

    const resp = await Sku.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        subcategoryId,
        specs,
        addedBy,
        addedAt: Date.now(),
        photos: docs,
      }
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

//delete customer
exports.deleteSku = async (req, res) => {
  try {
    const { id } = req.params;

    dltd = await Sku.findByIdAndDelete({ _id: id });

    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Sku data deleted succesfully",
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
