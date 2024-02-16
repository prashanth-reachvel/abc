const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  updatedDate: {
    type: String,
  },
  newTotalQuantity: {
    type: Number,
  },
  totalAddQuantity: {
    type: Number,
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
  source: {
    type: String,
  },
  updatedBy: {
    type: String,
  },
});

const InventoryUpdate = mongoose.model("updates", updateSchema);

module.exports = InventoryUpdate;
