const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const connectToDB = require("../index");

//Endpoint to get Inventory data based filter values
router.get("/filter", async (req, res) => {
  const { brand, duration } = req.query;

  let filter = {};
  if (brand) {
    filter.brand = brand;
  }

  if (duration) {
    const now = new Date();
    let startDate;

    switch (duration) {
      case "last_month":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        break;
      case "this_month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        console.log("start", startDate);
        break;
      case "last_3_months":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 3,
          now.getDate()
        );
        break;
      case "last_6_months":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 6,
          now.getDate()
        );
        break;
      case "this_year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case "last_year":
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        break;
      default:
        startDate = null;
    }

    if (startDate) {
      filter.convertedDate = { $gte: startDate };
      console.log("date", filter.convertedDate);
    }
  }
  console.log(filter);
  try {
    const inventory = await Inventory.aggregate([
      {
        $addFields: {
          convertedDate: { $toDate: "$timestamp" }, // Replace "timestampField" with the actual field name containing the timestamp
        },
      },
      {
        $match: filter,
      },
    ]);
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//End point to get all inventory data
router.get("/all", async (req, res) => {
  try {
    const inventory = await Inventory.find({});

    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inventory data" });
  }
});

module.exports = router;
