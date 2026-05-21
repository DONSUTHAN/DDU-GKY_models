const Review = require("../Models/ReviewModel");

const Product = require("../Models/ProductModel");

const createReview = async (req, res) => {
  // This line creates the controller for adding a review.
  try {
    const { productId, rating, comment } = req.body;
    // This line reads review details from the frontend request body.
    const product = await Product.findById(productId);
    // This line checks if the reviewed product exists.
    if (!product) {
      // This line checks if no product was found.
      return res.status(404).json({ message: "Product not found" });
      // This line sends a not-found error to the frontend.
    }
    // This line ends the product-not-found check.
    const review = await Review.create({
      // This line starts creating a new review document.
      product: product._id,
      // This line connects the review to the selected product.
      user: req.user._id,
      // This line connects the review to the logged-in consumer.
      rating,
      // This line saves the star rating.
      comment
      // This line saves the written review comment.
    });
    // This line ends the review creation object.
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// This line ends the createReview controller.

const getProductReviews = async (req, res) => {
  // This line creates the controller for getting product reviews.
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate("user", "name").sort({ createdAt: -1 });
    // This line finds reviews for one product, adds user names, and sorts newest first.
    res.json(reviews);
    // This line sends reviews to the frontend.
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// This line ends the getProductReviews controller.

module.exports = { createReview, getProductReviews };
// This line exports review controllers for review routes.
