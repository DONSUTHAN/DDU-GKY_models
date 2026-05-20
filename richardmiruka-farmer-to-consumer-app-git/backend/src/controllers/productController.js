const { Product } = require("../models/Product");
// Loads the Product model so the controller can query and save products.
const { AppError } = require("../utils/AppError");
// Loads the custom error class for readable API errors.

async function getProducts(req, res, next) {
  // Handles fetching public marketplace products.
  try {
    // Starts a try block so errors go to the error handler.
    const page = Number(req.query.page) || 1;
    // Reads the page number from the query string or defaults to page 1.
    const limit = Number(req.query.limit) || 12;
    // Reads the page size from the query string or defaults to 12 products.
    const skip = (page - 1) * limit;
    // Calculates how many products to skip for pagination.
    const filter = { isAvailable: true };
    // Starts a MongoDB filter that only returns available products.

    if (req.query.category) {
      // Checks whether the request includes a category filter.
      filter.category = new RegExp(req.query.category, "i");
      // Adds a case-insensitive category search to the filter.
    }

    if (req.query.search) {
      // Checks whether the request includes a text search.
      filter.$text = { $search: req.query.search };
      // Adds a MongoDB text-search filter.
    }

    const [products, total] = await Promise.all([
      // Runs the product query and count query at the same time.
      Product.find(filter)
        // Finds products matching the filter.
        .populate("farmer", "name phone location")
        // Adds selected farmer details to each product.
        .sort({ createdAt: -1 })
        // Shows newest products first.
        .skip(skip)
        // Skips earlier products for pagination.
        .limit(limit),
        // Limits the number of returned products.
      Product.countDocuments(filter)
      // Counts how many products match the same filter.
    ]);

    res.json({
      // Sends the marketplace response as JSON.
      products,
      // Includes the matching product list.
      pagination: {
        // Includes pagination details.
        page,
        // Sends the current page number.
        pages: Math.ceil(total / limit),
        // Sends the total number of pages.
        total
        // Sends the total number of matching products.
      }
    });
  } catch (error) {
    // Catches product query errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

async function getMyProducts(req, res, next) {
  // Handles fetching products owned by the current farmer.
  try {
    // Starts a try block so errors go to the error handler.
    const products = await Product.find({ farmer: req.user._id }).sort({ createdAt: -1 });
    // Finds products where the farmer id matches the logged-in user.
    res.json({ products });
    // Sends the farmer's products to the frontend.
  } catch (error) {
    // Catches product query errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

async function createProduct(req, res, next) {
  // Handles creating a new farmer product.
  try {
    // Starts a try block so errors go to the error handler.
    const product = await Product.create({
      // Creates a product document in MongoDB.
      ...req.body,
      // Copies product fields from the request body.
      farmer: req.user._id
      // Stores the logged-in farmer as the product owner.
    });

    res.status(201).json({ product });
    // Sends the created product with a 201 Created status.
  } catch (error) {
    // Catches validation or database errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

async function updateProduct(req, res, next) {
  // Handles updating an existing product.
  try {
    // Starts a try block so errors go to the error handler.
    const product = await Product.findById(req.params.id);
    // Finds the product using the id from the route parameter.

    if (!product) {
      // Checks whether the product exists.
      throw new AppError("Product not found", 404);
      // Sends a 404 error when no product is found.
    }

    if (!product.farmer.equals(req.user._id) && req.user.role !== "admin") {
      // Checks whether the user owns the product or is an admin.
      throw new AppError("You can only update your own products", 403);
      // Sends a forbidden error when the user cannot update this product.
    }

    Object.assign(product, req.body);
    // Copies updated fields from the request body into the product.
    await product.save();
    // Saves the updated product to MongoDB.

    res.json({ product });
    // Sends the updated product to the frontend.
  } catch (error) {
    // Catches lookup, permission, validation, or database errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

async function deleteProduct(req, res, next) {
  // Handles deleting an existing product.
  try {
    // Starts a try block so errors go to the error handler.
    const product = await Product.findById(req.params.id);
    // Finds the product using the id from the route parameter.

    if (!product) {
      // Checks whether the product exists.
      throw new AppError("Product not found", 404);
      // Sends a 404 error when no product is found.
    }

    if (!product.farmer.equals(req.user._id) && req.user.role !== "admin") {
      // Checks whether the user owns the product or is an admin.
      throw new AppError("You can only delete your own products", 403);
      // Sends a forbidden error when the user cannot delete this product.
    }

    await product.deleteOne();
    // Deletes the product from MongoDB.
    res.json({ message: "Product deleted" });
    // Sends a confirmation message to the frontend.
  } catch (error) {
    // Catches lookup, permission, or database errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

module.exports = {
  // Starts exporting product controller functions.
  createProduct,
  // Exports the create product controller.
  deleteProduct,
  // Exports the delete product controller.
  getMyProducts,
  // Exports the farmer product list controller.
  getProducts,
  // Exports the public product list controller.
  updateProduct
  // Exports the update product controller.
};
