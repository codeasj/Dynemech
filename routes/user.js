const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/fileUpload");
const { uploadpdf } = require("../middleware/catalogueUpload");

//const { isUser, isAdmin } = require("../middleware/authMiddleware");

//importing controller
const {
  createRole,
  getRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleModelsController");
const {
  createUser,
  updateUser,
  getUser,
} = require("../controllers/userManagmentController");

const {
  registerUserWithEmail,
  loginUserEmail,
  generateResetPasswordRequest,
  resetPassword,
} = require("../controllers/authController");

const {
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

const {
  createCustomer,
  getCustomer,
  updateCustomer,
} = require("../controllers/cutomerController");

const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  createSubcategory,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require("../controllers/subCategoryController");

const {
  createSku,
  getSku,
  updateSku,
  deleteSku,
} = require("../controllers/skuController");

const {
  createSkumodel,
  getSkumodel,
  updateSkumodel,
  deleteSkumodel,
} = require("../controllers/skuModelsControllers");

const {
  createCampaign,
  getCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");

const {
  signup,
  login,
  getAgent,
  updateAgent,
  deleteAgent,
  generateResetPasswordReq,
  resetPasswor,
} = require("../controllers/agentController");

router.post("/addRole", createRole);
router.post("/addUser", upload.single("profilepic"), createUser);
router.post("/register", registerUserWithEmail);
router.post("/login", loginUserEmail);
router.post("/requestResetPassword", generateResetPasswordRequest);
router.post("/addCompany", upload.single("companyLogo"), createCompany);
router.post("/addCustomer", createCustomer);
router.post("/addCategory", createCategory);
router.post(
  "/addSubCategory",
  uploadpdf.array("catalogueUrl"),
  createSubcategory
);
router.post("/addSku", upload.array("photos"), createSku);
router.post("/addSkumodel", createSkumodel);
router.post("/addCampaign", createCampaign);
router.post("/addAgent", signup);
router.post("/loginAgent", login);
router.post("agentForgetPassword", generateResetPasswordReq);

router.get("/getRole", getRole);
router.get("/getUser", getUser);
router.get("/getCompany", getCompany);
router.get("/getCustomer", getCustomer);
router.get("/getCategory", getCategory);
router.get("/getSubcategory", getSubcategory);
router.get("/getSku", getSku);
router.get("/getSkumodel", getSkumodel);
router.get("/getCampaign", getCampaign);
router.get("/getAgent", getAgent);

router.put("/updateRole/:id", upload.single("profilepic"), updateRole);
router.put("/updateUser/:id", updateUser);
router.put("/resetPassword", resetPassword);
router.put("/updateCompany/:id", upload.single("companyLogo"), updateCompany);
router.put("/updateCustomer/:id", updateCustomer);
router.put("/updateCategory/:id", updateCategory);
router.put(
  "/updateSubcategory/:id",
  uploadpdf.array("catalogueUrl"),
  updateSubcategory
);
router.put("/updateSku/:id", upload.array("photos"), updateSku);
router.put("/updateSkumodel/:id", updateSkumodel);
router.put("/updateCampaign/:id", updateCampaign);
router.put("/updateAgent/:id", updateAgent);
router.put("/updateAgent", resetPasswor);

router.delete("/deleteRole/:id", deleteRole);
router.delete("/deleteCompany/:id", deleteCompany);
router.delete("/deleteCategory/:id", deleteCategory);
router.delete("/deleteSubcategory/:id", deleteSubcategory);
router.delete("/deleteSku/:id", deleteSku);
router.delete("/deleteSkumodel/:id", deleteSkumodel);
router.delete("/deleteCampaign/:id", deleteCampaign);
router.delete("/deleteAgent/:id", deleteAgent);

module.exports = router;
