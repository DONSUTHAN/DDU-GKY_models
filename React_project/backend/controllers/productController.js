const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      farmer: req.user.id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("farmer", "name email");

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {createProduct,getProducts};