const Category = require("../models/categoryModel");

//add category
exports.createCategory = async (req, res) => {
  try {
    const { name, createdBy } = req.body;
    const response = await Category.create({
      name,
      createdBy,
    });
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};

//get category
exports.getCategory = async (req, res) => {
  try {
    const ctgry = await Category.find({});
    res.status(200).json({
      success: true,
      data: ctgry,
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

//update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, createdBy } = req.body;
    const ctgry = await Category.findByIdAndUpdate(
      { _id: id },
      {
        name,
        createdAt: Date.now(),
        createdBy,
      }
    );

    if (!ctgry) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: ctgry,
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

//delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    dltd = await Category.findByIdAndDelete({ _id: id });

    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Category data deleted succesfully",
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
