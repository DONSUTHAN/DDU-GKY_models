const { Router } = require("express");
// Loads Express Router so product endpoints can be grouped in one file.
const { body } = require("express-validator");
// Loads body validators for product form fields.
const {
  // Starts importing product controller functions.
  createProduct,
  // Handles creating a new product.
  deleteProduct,
  // Handles deleting an existing product.
  getMyProducts,
  // Handles fetching products owned by the current farmer.
  getProducts,
  // Handles fetching public marketplace products.
  updateProduct
  // Handles updating an existing product.
} = require("../controllers/productController");
// Loads all product controller functions.
const { authorize, protect } = require("../middleware/authMiddleware");
// Loads authentication and role-check middleware.
const { validate } = require("../middleware/validate");
// Loads middleware that sends validation errors back to the client.

const router = Router();
// Creates a router for product endpoints.

const productValidation = [
  // Creates reusable validation rules for product creation.
  body("name").trim().notEmpty().withMessage("Product name is required"),
  // Requires the product name field.
  body("description").trim().notEmpty().withMessage("Description is required"),
  // Requires the product description field.
  body("category").trim().notEmpty().withMessage("Category is required"),
  // Requires the product category field.
  body("price").isFloat({ min: 0 }).withMessage("Price must be zero or more"),
  // Requires the price to be zero or a positive number.
  body("quantityAvailable").isFloat({ min: 0 }).withMessage("Quantity must be zero or more"),
  // Requires stock quantity to be zero or a positive number.
  body("location").trim().notEmpty().withMessage("Location is required")
  // Requires the product location field.
];

router.get("/", getProducts);
// Lets anyone view available products in the marketplace.
router.get("/mine", protect, authorize("farmer", "admin"), getMyProducts);
// Lets farmers and admins view their own product listings.
router.post("/", protect, authorize("farmer", "admin"), productValidation, validate, createProduct);
// Lets farmers and admins create a product after validation.
router.patch("/:id", protect, authorize("farmer", "admin"), updateProduct);
// Lets farmers and admins update a product by id.
router.delete("/:id", protect, authorize("farmer", "admin"), deleteProduct);
// Lets farmers and admins delete a product by id.

module.exports = router;
// Exports the router for app.js.
