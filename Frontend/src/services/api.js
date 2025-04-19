import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Optional: If ever using cookies/sessions in future
  // withCredentials: true,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Token fetch error:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add a response interceptor (for global error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout or redirect if 401 token expired
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized — possibly expired token.");
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
