import axios from "axios";

// Centralized axios instance with cookies enabled.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export default api;
