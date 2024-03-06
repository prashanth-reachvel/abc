const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  schoolName: String,
  schoolId: String,
  inventory: String,
  title: String,
  description: String,
  quantity: Number,
  selectedFile: String,
  date: Date,
  status: String,
});

const RequestModel = mongoose.model("request", RequestSchema);
module.exports = RequestModel;
