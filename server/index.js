const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config();
const port = process.env.PORT;
//To connect Mongodb database
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    dbName: "vehicle_inventory",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const inventoryRoutes = require("./routes/inventory");
app.use("/api/inventory", inventoryRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
