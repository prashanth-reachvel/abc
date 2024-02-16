const mongoose = require("mongoose");

const UpdateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  school: String,
  updatedDate: String,
  reason: String,
  newTotalQuantity: Number,
  updatedBy: String,
  source: String,
  title: String,
});

const UpdateModel = mongoose.model("update", UpdateSchema);
module.exports = UpdateModel;
