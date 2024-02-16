const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema({
  inventory: String,
  quantity: Number,
  date: Date,
  reason: String,
  source: String,
});

module.exports = mongoose.model("update", updateSchema);
