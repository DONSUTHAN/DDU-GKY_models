const { Order } = require("../models/Order");
// Loads the Order model so the controller can create and query orders.
const { Product } = require("../models/Product");
// Loads the Product model so the controller can check stock and prices.
const { AppError } = require("../utils/AppError");
// Loads the custom error class for readable API errors.

async function createOrder(req, res, next) {
  // Handles creating a new order during checkout.
  try {
    // Starts a try block so errors go to the error handler.
    const { items, deliveryAddress, phone } = req.body;
    // Reads the ordered items and delivery details from the request body.
    const productIds = items.map((item) => item.product);
    // Creates an array of product ids from the order items.
    const products = await Product.find({ _id: { $in: productIds }, isAvailable: true });
    // Finds all available products that match the requested product ids.

    if (products.length !== productIds.length) {
      // Checks whether every requested product was found.
      throw new AppError("One or more products are unavailable", 400);
      // Rejects the order when a product is missing or unavailable.
    }

    const orderItems = items.map((item) => {
      // Converts request items into saved order item objects.
      const product = products.find((entry) => entry._id.equals(item.product));
      // Finds the full product record for this order item.

      if (!product) {
        // Checks whether this item has a matching product.
        throw new AppError("Product not found", 404);
        // Sends a not found error when the product is missing.
      }

      if (product.quantityAvailable < item.quantity) {
        // Checks whether enough stock exists for the requested quantity.
        throw new AppError(`${product.name} does not have enough stock`, 400);
        // Rejects the order when the requested stock is too high.
      }

      return {
        // Returns the item format stored inside the order.
        product: product._id,
        // Stores the product id.
        farmer: product.farmer,
        // Stores the farmer id so farmer order views are easy.
        name: product.name,
        // Stores the product name at checkout time.
        quantity: item.quantity,
        // Stores the quantity ordered by the consumer.
        unit: product.unit,
        // Stores the product unit at checkout time.
        price: product.price
        // Stores the product price at checkout time.
      };
    });

    const totalAmount = orderItems.reduce(
      // Calculates the full order total.
      (sum, item) => sum + item.price * item.quantity,
      // Adds each line item's price times quantity.
      0
      // Starts the total at zero.
    );

    const order = await Order.create({
      // Creates the order document in MongoDB.
      consumer: req.user._id,
      // Stores the logged-in consumer as the order owner.
      items: orderItems,
      // Stores the prepared order items.
      deliveryAddress,
      // Stores the delivery address.
      phone,
      // Stores the delivery phone number.
      totalAmount
      // Stores the calculated order total.
    });

    await Promise.all(
      // Updates product stock for all ordered items at the same time.
      orderItems.map((item) =>
        // Creates one stock update operation for each ordered item.
        Product.findByIdAndUpdate(item.product, {
          // Finds the product being ordered and updates it.
          $inc: { quantityAvailable: -item.quantity }
          // Decreases available stock by the ordered quantity.
        })
      )
    );

    res.status(201).json({ order });
    // Sends the created order with a 201 Created status.
  } catch (error) {
    // Catches validation, stock, or database errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

async function getMyOrders(req, res, next) {
  // Handles fetching orders placed by the current consumer.
  try {
    // Starts a try block so errors go to the error handler.
    const orders = await Order.find({ consumer: req.user._id })
      // Finds orders where the consumer is the logged-in user.
      .populate("items.product")
      // Adds full product details to each order item.
      .sort({ createdAt: -1 });
      // Shows newest orders first.

    res.json({ orders });
    // Sends the consumer's orders to the frontend.
  } catch (error) {
    // Catches order query errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

async function getFarmerOrders(req, res, next) {
  // Handles fetching orders that include the current farmer's products.
  try {
    // Starts a try block so errors go to the error handler.
    const orders = await Order.find({ "items.farmer": req.user._id })
      // Finds orders containing at least one item from the logged-in farmer.
      .populate("consumer", "name email phone")
      // Adds selected consumer contact details to each order.
      .sort({ createdAt: -1 });
      // Shows newest orders first.

    res.json({ orders });
    // Sends the farmer's related orders to the frontend.
  } catch (error) {
    // Catches order query errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

async function updateOrderStatus(req, res, next) {
  // Handles changing the status of an order.
  try {
    // Starts a try block so errors go to the error handler.
    const order = await Order.findById(req.params.id);
    // Finds the order using the id from the route parameter.

    if (!order) {
      // Checks whether the order exists.
      throw new AppError("Order not found", 404);
      // Sends a 404 error when no order is found.
    }

    const ownsOrderItem = order.items.some((item) => item.farmer.equals(req.user._id));
    // Checks whether this farmer owns at least one item in the order.

    if (!ownsOrderItem && req.user.role !== "admin") {
      // Allows the update only for related farmers or admins.
      throw new AppError("You can only update orders for your own produce", 403);
      // Sends a forbidden error when the user cannot update this order.
    }

    order.status = req.body.status;
    // Updates the order status from the request body.
    await order.save();
    // Saves the changed order to MongoDB.

    res.json({ order });
    // Sends the updated order to the frontend.
  } catch (error) {
    // Catches lookup, permission, validation, or database errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

module.exports = {
  // Starts exporting order controller functions.
  createOrder,
  // Exports the create order controller.
  getFarmerOrders,
  // Exports the farmer order list controller.
  getMyOrders,
  // Exports the consumer order list controller.
  updateOrderStatus
  // Exports the update order status controller.
};
