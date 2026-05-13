const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      customer: req.user.id,
      products: req.body.products,
      totalPrice: req.body.totalPrice
    });
    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({customer: req.user.id}).populate("products.product");

    res.json(orders);

  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = { createOrder, getMyOrders};