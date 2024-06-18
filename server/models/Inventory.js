//Mongodb Schema for Inventory data
const mongoose = require("mongoose");
const InventorySchema = new mongoose.Schema(
  {
    condition: String,
    description: String,
    title: String,
    brand: String,
    price: String,
    product_type: String,
    custom_label_0: String, //model
    timestamp: Date,
  },
  { collection: "Inventory" }
);

module.exports = mongoose.model("Inventory", InventorySchema);
