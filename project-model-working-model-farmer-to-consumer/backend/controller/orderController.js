const Order = require("../Models/OrderModel");

const Product = require("../Models/ProductModel");

const createOrder = async (req, res) => {
  // This line creates the controller for placing an order.
  try {
    const { productId, quantity, address, phone, paymentMethod } = req.body;
    // This line reads order details from the frontend request body.

    const product = await Product.findById(productId);
    // This line finds the product the consumer wants to buy.

    if (!product) {
      // This line checks if the product does not exist.
      return res.status(404).json({ message: "Product not found" });
    }
    // This line ends the product-not-found check.
    if (product.quantity < Number(quantity)) {
      // This line checks if the requested quantity is more than available stock.
      return res.status(400).json({ message: "Not enough stock available" });
    }
    // This line ends the stock check.

    const totalPrice = product.price * Number(quantity);
    // This line calculates the order total price.
    const order = await Order.create({
      // This line starts creating a new order document.
      product: product._id,
      // This line connects the order to the selected product.
      consumer: req.user._id,
      // This line connects the order to the logged-in consumer.
      farmer: product.farmer,
      // This line connects the order to the farmer who owns the product.
      quantity,
      totalPrice,
      address,
      phone,
      paymentMethod
      // these lines save those things.

    });
    product.quantity = product.quantity - Number(quantity);
    // This line reduces product stock after the order is created.

    await product.save();
    // This line saves the new product stock in MongoDB.
    res.status(201).json(order);
    // This line sends the created order to the frontend.

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// This line ends the createOrder controller.

const getMyOrders = async (req, res) => {
  // This line creates the controller for showing a user's orders.
  try {
    const filter = req.user.role === "farmer" ? { farmer: req.user._id } : { consumer: req.user._id };
    // This line chooses farmer orders or consumer orders based on the logged-in role.
    const orders = await Order.find(filter)
      // This line starts the order database query.
      .populate("product", "name price image")
      // This line adds product name, price, and image to each order.
      .populate("consumer", "name phone")
      // This line adds consumer name and phone to each order.
      .populate("farmer", "name phone")
      // This line adds farmer name and phone to each order.
      .sort({ createdAt: -1 });
    // This line shows newest orders first.
    res.json(orders);
    // This line sends the orders to the frontend.
  } catch (error) {
    res.status(500).json({ message: error.message });
    // This line sends the error message to the frontend.
  }
};
// This line ends the getMyOrders controller.

const updateOrderStatus = async (req, res) => {
  // This line creates the controller for changing an order status.
  try {
    const order = await Order.findOneAndUpdate(
      // This line starts finding and updating one order.
      { _id: req.params.id, farmer: req.user._id },
      // This line only allows the farmer owner to update the order.
      { status: req.body.status },
      // This line sets the new status from the frontend.
      { new: true, runValidators: true }
      // This line returns the updated order and checks schema rules.
    );
    // This line ends the findOneAndUpdate call.
    if (!order) {
      // This line checks if no matching order was found.
      return res.status(404).json({ message: "Order not found" });
      // This line sends a not-found error to the frontend.
    }
    // This line ends the missing-order check.
    res.json(order);
    // This line sends the updated order to the frontend.
  } catch (error) {
    res.status(500).json({ message: error.message });
    // This line sends the error message to the frontend.
  }
};
// This line ends the updateOrderStatus controller.

module.exports = { createOrder, getMyOrders, updateOrderStatus };
// This line exports order controllers for order routes.
