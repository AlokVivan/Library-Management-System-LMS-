import axios from "axios";

// Ensure your .env file has:
// VITE_API_BASE_URL=https://bookify-0wch.onrender.com/api
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("Using API Base URL:", BASE_URL); // Verify this shows the correct URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000, // 8 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Only try to get token if localStorage is available (handles SSR)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors differently from HTTP errors
    if (error.code === "ECONNREFUSED") {
      console.error("Connection refused - is the backend running?");
    } else if (error.response) {
      // Server responded with error status
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url
      });
      
      if (error.response.status === 401) {
        // Handle unauthorized (token expired)
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;