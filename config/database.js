const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connection Succesfull");
    })
    .catch((error) => {
      console.log("Issue in connection");
      console.error(error.message);
      process.exit(1);
    });
};
