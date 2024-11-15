const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json({
    data: products,
  });
};
// const addProducts = async (req, res) => {
//   console.log(req.headers.token);
//   try {
//     var decoded = jwt.verify(req.headers.token, "secret");
//     console.log(decoded);
//     await Product.create(req.body);
//     res.json({
//       message: "product added successfully",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({
//       message: "unauthorized ",
//     });
//   }
// };

// const updateProducts = async (req, res) => {
//   console.log(req.headers.token);
//   try {
//     var decoded = jwt.verify(req.headers.token, "secret");
//     console.log(decoded);
//     await Product.updateOne({ _id: req.params.id }, req.body);
//     res.json({
//       message: "products updated successsfully!",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({
//       message: "unauthorized ",
//     });
//   }
// };

// const deleteProducts = async (req, res) => {
//   console.log(req.headers.token);
//   try {
//     var decoded = jwt.verify(req.headers.token, "secret");
//     console.log(decoded);
//     await Product.deleteOne({ _id: req.params.id });
//     res.json({
//       message: "product deleted successfully",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({
//       message: "unauthorized ",
//     });
//   }
// };

const addProducts = async (req, res) => {
  console.log(req.authUser, req.test);
  await Product.create({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    user: req.authUser._id,
  });
  res.json({
    message: "product added successfully",
  });
};

const updateProducts = async (req, res) => {
  await Product.updateOne({ _id: req.params.id }, req.body);
  res.json({
    message: "products updated successsfully!",
  });
};

const deleteProducts = async (req, res) => {
  await Product.deleteOne({ _id: req.params.id });
  res.json({
    message: "product deleted successfully",
  });
};
const getProductsById = async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });
  if (!product) {
    res.json({
      message: "product not found",
    });
    return;
  }
  res.json({
    message: "product fetched",
    data: product,
  });
};

module.exports = {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
  getProductsById,
};
