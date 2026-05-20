const express = require("express");
// This line imports express so we can create product routes.

const { createProduct, getProducts, getProductById } = require("../controller/productController");
// This line imports product controller functions.

const { protect, allowRoles } = require("../middleware/authMiddleware");
// This line imports middleware for login and role checking.

const router = express.Router();
// This line creates an express router for product APIs.

router.get("/", getProducts);
// This line creates the GET route for showing all products.

router.get("/:id", getProductById);
// This line creates the GET route for showing one product by id.

router.post("/", protect, allowRoles("farmer"), createProduct);
// This line creates the POST route for farmers to add products.

module.exports = router;
// This line exports the product router for server.js.
