const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const connectToDB = require("../index");

//End point to get all inventory data
router.get("/", async (req, res) => {
  try {
    const inventory = await Inventory.find({});

    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inventory data" });
  }
});

module.exports = router;
