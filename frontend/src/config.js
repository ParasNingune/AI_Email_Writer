// API Configuration
const API_CONFIG = {
  // Change this to your backend URL
  // For local development: http://localhost:8080
  // For production: your deployed backend URL
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
};

export default API_CONFIG;
