import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { AppError } from "../utils/AppError.js";

export async function createOrder(req, res, next) {
  try {
    const { items, deliveryAddress, phone } = req.body;
    const productIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds }, isAvailable: true });

    if (products.length !== productIds.length) {
      throw new AppError("One or more products are unavailable", 400);
    }

    const orderItems = items.map((item) => {
      const product = products.find((entry) => entry._id.equals(item.product));

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      if (product.quantityAvailable < item.quantity) {
        throw new AppError(`${product.name} does not have enough stock`, 400);
      }

      return {
        product: product._id,
        farmer: product.farmer,
        name: product.name,
        quantity: item.quantity,
        unit: product.unit,
        price: product.price
      };
    });

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      consumer: req.user._id,
      items: orderItems,
      deliveryAddress,
      phone,
      totalAmount
    });

    await Promise.all(
      orderItems.map((item) =>
        Product.findByIdAndUpdate(item.product, {
          $inc: { quantityAvailable: -item.quantity }
        })
      )
    );

    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
}

export async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ consumer: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    next(error);
  }
}

export async function getFarmerOrders(req, res, next) {
  try {
    const orders = await Order.find({ "items.farmer": req.user._id })
      .populate("consumer", "name email phone")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    next(error);
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    const ownsOrderItem = order.items.some((item) => item.farmer.equals(req.user._id));

    if (!ownsOrderItem && req.user.role !== "admin") {
      throw new AppError("You can only update orders for your own produce", 403);
    }

    order.status = req.body.status;
    await order.save();

    res.json({ order });
  } catch (error) {
    next(error);
  }
}
