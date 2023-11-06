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
  if (!file.originalname.match(/\.(pdf)$/)) {
    return cb(new Error("You can upload only permissible files!"), false);
  }
  cb(null, true);
};

const uploadpdf = multer({ storage, fileFilter });
module.exports = {
  uploadpdf,
};
