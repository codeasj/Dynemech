const multer = require("multer");
const path = require("path");
const uploadPath = path.join(path.dirname(__dirname), "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    return cb(new Error("You can upload only permissible files!"), false);
  }
  cb(null, true);
};

const photosFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|svg||gif|docx|doc|pdf)$/)) {
    return cb(new Error("You can uplaoad only permissible files!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter });
const uploadFile = multer({ storage, fileFilter: photosFileFilter });
module.exports = {
  upload,
  uploadFile,
  uploadPath,
};
