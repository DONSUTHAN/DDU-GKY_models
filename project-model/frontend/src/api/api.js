const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
// This line stores the backend URL, using .env first and localhost fallback second.

export const getSavedAuth = () => {
  // This line creates a function to read login data from localStorage.
  const savedAuth = localStorage.getItem("the_farm_vegi_auth");
  // This line reads saved login data by key name.
  return savedAuth ? JSON.parse(savedAuth) : null;
  // This line converts saved text back into an object or returns null.
};
// This line ends the getSavedAuth function.

export const saveAuth = (authData) => {
  // This line creates a function to save login data.
  localStorage.setItem("the_farm_vegi_auth", JSON.stringify(authData));
  // This line converts login data to text and saves it in localStorage.
};
// This line ends the saveAuth function.

export const removeSavedAuth = () => {
  // This line creates a function to remove login data.
  localStorage.removeItem("the_farm_vegi_auth");
  // This line deletes saved login data from localStorage.
};
// This line ends the removeSavedAuth function.

const request = async (path, options = {}, token = "") => {
  // This line creates one reusable function for all backend API calls.
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  // This line creates default JSON headers and allows custom headers.
  if (token) {
    // This line checks if a token exists.
    headers.Authorization = `Bearer ${token}`;
    // This line adds the token to protected API requests.
  }
  // This line ends the token check.
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  // This line sends the request to the backend.
  const data = await response.json().catch(() => ({}));
  // This line reads JSON response data and avoids crashing on empty responses.
  if (!response.ok) {
    // This line checks if the backend returned an error status.
    throw new Error(data.message || "API request failed");
    // This line creates a normal JavaScript error for the page to show.
  }
  // This line ends the error status check.
  return data;
  // This line sends successful data back to the caller.
};
// This line ends the reusable request function.

export const registerUser = (formData) => {
  // This line creates a helper for registering users.
  return request("/api/auth/register", { method: "POST", body: JSON.stringify(formData) });
  // This line sends register data to the backend.
};
// This line ends the registerUser helper.

export const loginUser = (formData) => {
  // This line creates a helper for logging in users.
  return request("/api/auth/login", { method: "POST", body: JSON.stringify(formData) });
  // This line sends login data to the backend.
};
// This line ends the loginUser helper.

export const getProducts = (searchText = "") => {
  // This line creates a helper for loading products.
  return request(`/api/products?search=${encodeURIComponent(searchText)}`);
  // This line asks the backend for products and safely includes the search text.
};
// This line ends the getProducts helper.

export const createProduct = (productData, token) => {
  // This line creates a helper for adding a product.
  return request("/api/products", { method: "POST", body: JSON.stringify(productData) }, token);
  // This line sends product data with the farmer token.
};
// This line ends the createProduct helper.

export const createOrder = (orderData, token) => {
  // This line creates a helper for placing an order.
  return request("/api/orders", { method: "POST", body: JSON.stringify(orderData) }, token);
  // This line sends order data with the consumer token.
};
// This line ends the createOrder helper.

export const getMyOrders = (token) => {
  // This line creates a helper for loading logged-in user's orders.
  return request("/api/orders/my-orders", {}, token);
  // This line asks the backend for orders with the login token.
};
// This line ends the getMyOrders helper.

export const createReview = (reviewData, token) => {
  // This line creates a helper for adding a review.
  return request("/api/reviews", { method: "POST", body: JSON.stringify(reviewData) }, token);
  // This line sends review data with the consumer token.
};
// This line ends the createReview helper.
