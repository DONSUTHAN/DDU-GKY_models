import { Router } from "express";
import { body } from "express-validator";
import {
  createOrder,
  getFarmerOrders,
  getMyOrders,
  updateOrderStatus
} from "../controllers/orderController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.use(protect);

router.post(
  "/",
  authorize("consumer", "admin"),
  [
    body("items").isArray({ min: 1 }).withMessage("Order items are required"),
    body("items.*.product").isMongoId().withMessage("Valid product id is required"),
    body("items.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("deliveryAddress").trim().notEmpty().withMessage("Delivery address is required"),
    body("phone").trim().notEmpty().withMessage("Phone is required")
  ],
  validate,
  createOrder
);

router.get("/my-orders", authorize("consumer", "admin"), getMyOrders);
router.get("/farmer-orders", authorize("farmer", "admin"), getFarmerOrders);
router.patch("/:id/status", authorize("farmer", "admin"), updateOrderStatus);

export default router;
