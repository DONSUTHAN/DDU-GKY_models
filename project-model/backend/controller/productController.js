const Product = require("../Models/ProductModel");
// This line imports the Product model for product database actions.

const Review = require("../Models/ReviewModel");
// This line imports the Review model so product details can include reviews.

const createProduct = async (req, res) => {
  // This line creates the controller for adding a product.
  try {
    // This line starts a try block for safe error handling.
    const product = await Product.create({
      // This line starts creating a new product document.
      name: req.body.name,
      // This line saves the product name from the frontend.
      price: req.body.price,
      // This line saves the product price from the frontend.
      quantity: req.body.quantity,
      // This line saves the available quantity from the frontend.
      category: req.body.category,
      // This line saves the product category from the frontend.
      location: req.body.location,
      // This line saves the farmer location from the frontend.
      image: req.body.image,
      // This line saves the image URL from the frontend.
      description: req.body.description,
      // This line saves the product description from the frontend.
      farmer: req.user._id
      // This line connects the product to the logged-in farmer.
    });
    // This line ends the product creation object.
    res.status(201).json(product);
    // This line sends the created product back to the frontend.
  } catch (error) {
    // This line catches product creation errors.
    res.status(500).json({ message: error.message });
    // This line sends the error message to the frontend.
  }
};
// This line ends the createProduct controller.

const getProducts = async (req, res) => {
  // This line creates the controller for getting all products.
  try {
    // This line starts a try block for safe error handling.
    const keyword = req.query.search || "";
    // This line reads the search keyword from the URL query.
    const query = {
      // This line starts the MongoDB search query object.
      $or: [
        // This line searches any matching field below.
        { name: { $regex: keyword, $options: "i" } },
        // This line searches product names without caring about uppercase or lowercase.
        { category: { $regex: keyword, $options: "i" } },
        // This line searches product categories without caring about uppercase or lowercase.
        { location: { $regex: keyword, $options: "i" } }
        // This line searches locations without caring about uppercase or lowercase.
      ]
      // This line ends the $or search array.
    };
    // This line ends the query object.
    const products = await Product.find(query).populate("farmer", "name phone").sort({ createdAt: -1 });
    // This line gets products, adds farmer name/phone, and shows newest products first.
    res.json(products);
    // This line sends all matching products to the frontend.
  } catch (error) {
    // This line catches product list errors.
    res.status(500).json({ message: error.message });
    // This line sends the error message to the frontend.
  }
};
// This line ends the getProducts controller.

const getProductById = async (req, res) => {
  // This line creates the controller for getting one product.
  try {
    // This line starts a try block for safe error handling.
    const product = await Product.findById(req.params.id).populate("farmer", "name phone");
    // This line finds one product by id and includes farmer contact details.
    if (!product) {
      // This line checks if the product does not exist.
      return res.status(404).json({ message: "Product not found" });
      // This line sends a not-found error to the frontend.
    }
    // This line ends the product-not-found check.
    const reviews = await Review.find({ product: product._id }).populate("user", "name").sort({ createdAt: -1 });
    // This line gets all reviews for this product with reviewer names.
    res.json({ product, reviews });
    // This line sends the product and reviews to the frontend.
  } catch (error) {
    // This line catches product detail errors.
    res.status(500).json({ message: error.message });
    // This line sends the error message to the frontend.
  }
};
// This line ends the getProductById controller.

module.exports = { createProduct, getProducts, getProductById };
// This line exports product controllers for product routes.
