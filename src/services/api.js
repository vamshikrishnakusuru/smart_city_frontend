import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "";

const TOKEN_KEY = "token";
const AUTH_KEY = "auth";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getStoredAuth() {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setStoredAuth(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_KEY);
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  const isAuthRoute = config.url?.startsWith("/api/auth/");

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      clearStoredAuth();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export function extractApiData(response) {
  return response.data?.data;
}

export function extractApiMessage(error, fallbackMessage) {
  const response = error?.response;

  if (!response) {
    return "Unable to reach the server. Please confirm the backend is running.";
  }

  if (response?.status === 400 && response.data?.errors) {
    const firstError = Object.values(response.data.errors)[0];
    return firstError || response.data.message || fallbackMessage;
  }

  return response?.data?.message || fallbackMessage;
}

export default api;
