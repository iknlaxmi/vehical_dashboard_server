const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3021;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/vehicle_inventory", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const inventoryRoutes = require("./routes/inventory");
app.use("/api/inventory", inventoryRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
