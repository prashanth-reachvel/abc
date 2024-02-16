const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  totalAddQuantity: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
  },
  distributed: {
    type: Number,
  },
  reason: {
    type: String,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
