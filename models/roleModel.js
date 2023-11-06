const mongoose = require("mongoose");


const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  addUser: {
    type: Boolean,
    required: true,
  },
  updateUser: {
    type: Boolean,
    required: true,
  },
  getUsers: {
    type: Boolean,
    required: true,
  },
  addRole: {
    type: Boolean,
    required: true,
  },
  updateRole: {
    type: Boolean,
    required: true,
  },
  deleteRole: {
    type: Boolean,
    required: true,
  },
  getRole: {
    type: Boolean,
    required: true,
  },
  addVendorType: {
    type: Boolean,
    required: true,
  },
  updateVendorType: {
    type: Boolean,
    required: true,
  },
  getVendorType: {
    type: Boolean,
    required: true,
  },
  deleteVendorType: {
    type: Boolean,
    required: true,
  },
  addRawMaterialCategory: {
    type: Boolean,
    required: true,
  },
  updateRawMaterialCategory: {
    type: Boolean,
    required: true,
  },
  deleteRawMaterialCategory: {
    type: Boolean,
    requred: true,
  },
  getRawMaterialCategory: {
    type: Boolean,
    required: true,
  },
  addVendor: {
    type: Boolean,
    required: true,
  },
  updateVendor: {
    type: Boolean,
    required: true,
  },
  deleteVendor: {
    type: Boolean,
    required: true,
  },
  getVendor: {
    type: Boolean,
    required: true,
  },
  addColor: {
    type: Boolean,
    required: true,
  },
  getColor: {
    type: Boolean,
    required: true,
  },
  updateColor: {
    type: Boolean,
    required: true,
  },
  deleteColor: {
    type: Boolean,
    required: true,
  },
  addRMT: {
    type: Boolean,
    required: true,
  },
  getRMT: {
    type: Boolean,
    required: true,
  },
  deleteRMT: {
    type: Boolean,
    required: true,
  },
  updateRMT: {
    type: Boolean,
    required: true,
  },
  addPO: {
    type: Boolean,
    required: true,
  },
  deletePO: {
    type: Boolean,
    required: true,
  },
  getPO: {
    type: Boolean,
    required: true,
  },
  updatePO: {
    type: Boolean,
    required: true,
  },
  addInventory: {
    type: Boolean,
    required: true,
  },
  deleteInventory: {
    type: Boolean,
    required: true,
  },
  getInventory: {
    type: Boolean,
    required: true,
  },
  addCurrency: {
    type: Boolean,
    required: true,
  },
  getCurrency: {
    type: Boolean,
    required: true,
  },
  updateCurrency: {
    type: Boolean,
    required: true,
  },
  deleteCurrency: {
    type: Boolean,
    required: true,
  },
  addCountry: {
    type: Boolean,
    required: true,
  },
  updateCountry: {
    type: Boolean,
    required: true,
  },
  deleteCountry: {
    type: Boolean,
    required: true,
  },
  getCountry: {
    type: Boolean,
    required: true,
  },
  addDefaultSize: {
    type: Boolean,
    required: true,
  },
  updateDefaultSize: {
    type: Boolean,
    required: true,
  },
  deleteDefaultSize: {
    type: Boolean,
    required: true,
  },
  getDefaultSize: {
    type: Boolean,
    required: true,
  },
  addCustomer: {
    type: Boolean,
    required: true,
  },
  updateCustomer: {
    type: Boolean,
    required: true,
  },
  deleteCustomer: {
    type: Boolean,
    required: true,
  },
  getCustomer: {
    type: Boolean,
    required: true,
  },
  addCostingSheet: {
    type: Boolean,
    required: true,
  },
  updateCostingSheet: {
    type: Boolean,
    required: true,
  },
  deleteCostingSheet: {
    type: Boolean,
    required: true,
  },
  getCostingSheet: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  createdBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Role", roleSchema);
