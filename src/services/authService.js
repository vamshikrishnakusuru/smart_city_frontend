import api, {
  clearStoredAuth,
  clearToken,
  extractApiData,
  getStoredAuth,
  getToken,
  setStoredAuth,
  setToken,
} from "./api";

function normalizeUser(user) {
  return {
    ...user,
    role: user.role?.toLowerCase(),
  };
}

function persistAuth(authResponse) {
  const user = normalizeUser(authResponse.user);
  setToken(authResponse.token);
  setStoredAuth(user);
  return user;
}

export async function loginUser(credentials) {
  const response = await api.post("/api/auth/login", credentials);
  const authResponse = extractApiData(response);
  const user = persistAuth(authResponse);
  return { user, token: authResponse.token };
}

export async function registerUser(payload) {
  const response = await api.post("/api/auth/register", {
    ...payload,
    role: payload.role.toUpperCase(),
  });
  const authResponse = extractApiData(response);
  const user = persistAuth(authResponse);
  return { user, token: authResponse.token };
}

export function logoutUser() {
  clearToken();
  clearStoredAuth();
}

export function getCurrentUser() {
  return getStoredAuth();
}

export function hasToken() {
  return Boolean(getToken());
}
