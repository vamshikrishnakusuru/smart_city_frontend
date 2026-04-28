import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  hasToken,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";
import { extractApiMessage } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasToken()) {
      setUser(getCurrentUser());
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const result = await loginUser(credentials);
      setUser(result.user);
      return result.user;
    } catch (error) {
      throw new Error(extractApiMessage(error, "Login failed"));
    }
  };

  const register = async (payload) => {
    try {
      const result = await registerUser(payload);
      setUser(result.user);
      return result.user;
    } catch (error) {
      throw new Error(extractApiMessage(error, "Registration failed"));
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
