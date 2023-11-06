const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "uploads")));

//database conection
console.log("connecting");
require("./config/database").connect();

//route import and mount
app.use("/api/v1", require("./routes/user"));

app.listen(PORT, () => {
  console.log(`Server started succesfully at ${PORT}`);
});
