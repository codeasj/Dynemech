const Role = require("../models/roleModel");

//add role
exports.createRole = async (req, res) => {
  try {
    //fetch data
    const {
      name,
      addUser,
      updateUser,
      getUsers,
      addRole,
      updateRole,
      deleteRole,
      getRole,
      addVendorType,
      updateVendorType,
      getVendorType,
      deleteVendorType,
      addRawMaterialCategory,
      updateRawMaterialCategory,
      deleteRawMaterialCategory,
      getRawMaterialCategory,
      addVendor,
      updateVendor,
      deleteVendor,
      getVendor,
      addColor,
      getColor,
      updateColor,
      deleteColor,
      addRMT,
      getRMT,
      deleteRMT,
      updateRMT,
      addPO,
      deletePO,
      getPO,
      updatePO,
      addInventory,
      deleteInventory,
      getInventory,
      addCurrency,
      getCurrency,
      updateCurrency,
      deleteCurrency,
      addCountry,
      updateCountry,
      deleteCountry,
      getCountry,
      addDefaultSize,
      updateDefaultSize,
      deleteDefaultSize,
      getDefaultSize,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      getCustomer,
      addCostingSheet,
      updateCostingSheet,
      deleteCostingSheet,
      getCostingSheet,
      createdBy,
    } = req.body;

    const response = await Role.create({
      name,
      addUser,
      updateUser,
      getUsers,
      addRole,
      updateRole,
      deleteRole,
      getRole,
      addVendorType,
      updateVendorType,
      getVendorType,
      deleteVendorType,
      addRawMaterialCategory,
      updateRawMaterialCategory,
      deleteRawMaterialCategory,
      getRawMaterialCategory,
      addVendor,
      updateVendor,
      deleteVendor,
      getVendor,
      addColor,
      getColor,
      updateColor,
      deleteColor,
      addRMT,
      getRMT,
      deleteRMT,
      updateRMT,
      addPO,
      deletePO,
      getPO,
      updatePO,
      addInventory,
      deleteInventory,
      getInventory,
      addCurrency,
      getCurrency,
      updateCurrency,
      deleteCurrency,
      addCountry,
      updateCountry,
      deleteCountry,
      getCountry,
      addDefaultSize,
      updateDefaultSize,
      deleteDefaultSize,
      getDefaultSize,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      getCustomer,
      addCostingSheet,
      updateCostingSheet,
      deleteCostingSheet,
      getCostingSheet,
      createdBy,
    });

    //send a json responce with a success flag
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

//get role
exports.getRole = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.status(200).json({
      success: true,
      data: roles,
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

//update role
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      addUser,
      updateUser,
      getUsers,
      addRole,
      updateRole,
      deleteRole,
      getRole,
      addVendorType,
      updateVendorType,
      getVendorType,
      deleteVendorType,
      addRawMaterialCategory,
      updateRawMaterialCategory,
      deleteRawMaterialCategory,
      getRawMaterialCategory,
      addVendor,
      updateVendor,
      deleteVendor,
      getVendor,
      addColor,
      getColor,
      updateColor,
      deleteColor,
      addRMT,
      getRMT,
      deleteRMT,
      updateRMT,
      addPO,
      deletePO,
      getPO,
      updatePO,
      addInventory,
      deleteInventory,
      getInventory,
      addCurrency,
      getCurrency,
      updateCurrency,
      deleteCurrency,
      addCountry,
      updateCountry,
      deleteCountry,
      getCountry,
      addDefaultSize,
      updateDefaultSize,
      deleteDefaultSize,
      getDefaultSize,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      getCustomer,
      addCostingSheet,
      updateCostingSheet,
      deleteCostingSheet,
      getCostingSheet,
      createdBy,
    } = req.body;

    const roles = await Role.findByIdAndUpdate(
      { _id: id },
      {
        name,
        addUser,
        updateUser,
        getUsers,
        addRole,
        updateRole,
        deleteRole,
        getRole,
        addVendorType,
        updateVendorType,
        getVendorType,
        deleteVendorType,
        addRawMaterialCategory,
        updateRawMaterialCategory,
        deleteRawMaterialCategory,
        getRawMaterialCategory,
        addVendor,
        updateVendor,
        deleteVendor,
        getVendor,
        addColor,
        getColor,
        updateColor,
        deleteColor,
        addRMT,
        getRMT,
        deleteRMT,
        updateRMT,
        addPO,
        deletePO,
        getPO,
        updatePO,
        addInventory,
        deleteInventory,
        getInventory,
        addCurrency,
        getCurrency,
        updateCurrency,
        deleteCurrency,
        addCountry,
        updateCountry,
        deleteCountry,
        getCountry,
        addDefaultSize,
        updateDefaultSize,
        deleteDefaultSize,
        getDefaultSize,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        getCustomer,
        addCostingSheet,
        updateCostingSheet,
        deleteCostingSheet,
        getCostingSheet,
        createdAt: Date.now(),
        createdBy,
      },
      { new: true }
    );

    if (!roles) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: roles,
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

//delete role
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    dltd = await Role.findByIdAndDelete({ _id: id });

    if (!dltd) {
      res.status(400).json({
        success: false,
        message: `Data with id:${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Role model data deleted succesfully",
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
