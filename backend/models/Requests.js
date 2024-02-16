const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  schoolName: String,
  schoolId: String,
  inventory: String,
  title: String,
  description: String,
  quantity: Number,
  selectedFile: String,
  date: String,
  status: String,
});

module.exports = mongoose.model("request", requestSchema);
