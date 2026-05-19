import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getMyProducts,
  getProducts,
  updateProduct
} from "../controllers/productController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const productValidation = [
  body("name").trim().notEmpty().withMessage("Product name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be zero or more"),
  body("quantityAvailable").isFloat({ min: 0 }).withMessage("Quantity must be zero or more"),
  body("location").trim().notEmpty().withMessage("Location is required")
];

router.get("/", getProducts);
router.get("/mine", protect, authorize("farmer", "admin"), getMyProducts);
router.post("/", protect, authorize("farmer", "admin"), productValidation, validate, createProduct);
router.patch("/:id", protect, authorize("farmer", "admin"), updateProduct);
router.delete("/:id", protect, authorize("farmer", "admin"), deleteProduct);

export default router;
