const express = require("express");
const cookieParser = require("cookie-parser");
require("express-async-errors");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/product.route");
const authRoutes = require("./routes/auth.route");
const Product = require("./models/Product");

const app = express();
const port = 3001;

connectDB();

app.use(express.static("uploads"));

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  //save the error somewhere.
  console.log(err);
  res.status(500).json({
    message: "something went wrong",
  });
});
app.listen(port, () => {
  console.log(`example app listening to ${port}`);
});
