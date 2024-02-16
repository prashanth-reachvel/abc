const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  schoolName: String,
});

const SchoolModel = mongoose.model("schools", SchoolSchema);
module.exports = SchoolModel;
