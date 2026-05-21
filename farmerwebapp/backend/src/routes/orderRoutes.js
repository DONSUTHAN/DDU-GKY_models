const { Router } = require("express");
// Loads Express Router so order endpoints can be grouped in one file.
const { body } = require("express-validator");
// Loads body validators for checkout data.
const {
  // Starts importing order controller functions.
  createOrder,
  // Handles placing a new order.
  getFarmerOrders,
  // Handles viewing orders that include a farmer's products.
  getMyOrders,
  // Handles viewing the current consumer's orders.
  updateOrderStatus
  // Handles changing an order status.
} = require("../controllers/orderController");
// Loads all order controller functions.
const { authorize, protect } = require("../middleware/authMiddleware");
// Loads authentication and role-check middleware.
const { validate } = require("../middleware/validate");
// Loads middleware that sends validation errors back to the client.

const router = Router();
// Creates a router for order endpoints.

router.use(protect);
// Requires a valid JWT for every route in this file.

router.post(
  // Defines a POST route.
  "/",
  // Sets the order creation endpoint to /api/orders.
  authorize("consumer", "admin"),
  // Allows only consumers and admins to place orders.
  [
    // Starts validation rules for creating an order.
    body("items").isArray({ min: 1 }).withMessage("Order items are required"),
    // Requires at least one item in the order.
    body("items.*.product").isMongoId().withMessage("Valid product id is required"),
    // Requires every item to include a valid product id.
    body("items.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    // Requires every item quantity to be at least one.
    body("deliveryAddress").trim().notEmpty().withMessage("Delivery address is required"),
    // Requires the delivery address field.
    body("phone").trim().notEmpty().withMessage("Phone is required")
    // Requires the phone field.
  ],
  validate,
  // Stops the request when validation fails.
  createOrder
  // Runs the order creation controller when validation passes.
);

router.get("/my-orders", authorize("consumer", "admin"), getMyOrders);
// Lets consumers and admins view the current consumer's orders.
router.get("/farmer-orders", authorize("farmer", "admin"), getFarmerOrders);
// Lets farmers and admins view orders containing their products.
router.patch("/:id/status", authorize("farmer", "admin"), updateOrderStatus);
// Lets farmers and admins update the status of an order.

module.exports = router;
// Exports the router for app.js.
