import axios from "axios";
import { getCsrfToken } from "../utils/csrf";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default api;
