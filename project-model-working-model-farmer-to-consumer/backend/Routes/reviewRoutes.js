const express = require("express");
// This line imports express so we can create review routes.

const { createReview, getProductReviews } = require("../controller/reviewController");
// This line imports review controller functions.

const { protect, allowRoles } = require("../middleware/authMiddleware");
// This line imports middleware for login and role checking.

const router = express.Router();
// This line creates an express router for review APIs.

router.post("/", protect, allowRoles("consumer"), createReview);
// This line creates the POST route for consumers to add reviews.

router.get("/product/:productId", getProductReviews);
// This line creates the GET route for showing reviews of one product.

module.exports = router;
