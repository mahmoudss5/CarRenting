import axios from "axios";
import { getToken, clearAuth } from "./auth";
import { webSocketService } from "../services/WebSocketService";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally: clear session and redirect to login
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const shouldSkipRedirect = error.config?.skipAuthRedirect;
    if (error.response?.status === 401 && !shouldSkipRedirect) {
      clearAuth();
      webSocketService.disconnect();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
