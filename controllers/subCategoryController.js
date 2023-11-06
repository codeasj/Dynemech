const Subcategory = require("../models/subcategoryModel");
const uploadPath = require("../middleware/catalogueUpload");

//add subcategory
exports.createSubcategory = async (req, res) => {
  try {
    console.log(req.body);
    const { categoryId, name, addedBy } = req.body;
    //console.log(req.body);
    console.log(req.files);

    const documents = req.files.map((doc) => doc.filename);

    const response = await Subcategory.create({
      categoryId,
      name,
      addedBy,
      catalogueUrl: documents,
    });

    res.status(200).json({
      success: true,
      data: response,
      message: "Entry created Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: error.message,
    });
  }
};

//get subcategory
exports.getSubcategory = async (req, res) => {
  try {
    const sctgry = await Subcategory.find({});
    res.status(200).json({
      success: true,
      data: sctgry,
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

//Update subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { categoryId, name, addedBy } = req.body;
    const documents = req.files.map((doc) => doc.filename);
    console.log({ files: req.files });
    console.log({ documents });

    const resp = await Subcategory.findByIdAndUpdate(
      { _id: id },
      {
        categoryId,
        name,
        addedBy,
        addedAt: Date.now(),
        catalogueUrl: documents,
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

//delete Subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const dltd = await Subcategory.findByIdAndDelete({ _id: id });
    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Subcategory data deleted succesfully",
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
