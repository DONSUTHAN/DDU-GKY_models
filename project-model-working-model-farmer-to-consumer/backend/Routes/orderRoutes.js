const express = require("express");
// This line imports express so we can create order routes.

const { createOrder, getMyOrders, updateOrderStatus } = require("../controller/orderController");
// This line imports order controller functions.

const { protect, allowRoles } = require("../middleware/authMiddleware");
// This line imports middleware for login and role checking.

const router = express.Router();
// This line creates an express router for order APIs.

router.post("/", protect, allowRoles("consumer"), createOrder);
// This line creates the POST route for consumers to place orders.

router.get("/my-orders", protect, getMyOrders);
// This line creates the GET route for logged-in users to see their orders.

router.patch("/:id/status", protect, allowRoles("farmer"), updateOrderStatus);
// This line creates the PATCH route for farmers to update order status.

module.exports = router;
