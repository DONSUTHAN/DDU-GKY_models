import { Product } from "../models/Product.js";
import { AppError } from "../utils/AppError.js";

export async function getProducts(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const filter = { isAvailable: true };

    if (req.query.category) {
      filter.category = new RegExp(req.query.category, "i");
    }

    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("farmer", "name phone location")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter)
    ]);

    res.json({
      products,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyProducts(req, res, next) {
  try {
    const products = await Product.find({ farmer: req.user._id }).sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const product = await Product.create({
      ...req.body,
      farmer: req.user._id
    });

    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (!product.farmer.equals(req.user._id) && req.user.role !== "admin") {
      throw new AppError("You can only update your own products", 403);
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({ product });
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (!product.farmer.equals(req.user._id) && req.user.role !== "admin") {
      throw new AppError("You can only delete your own products", 403);
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
}
