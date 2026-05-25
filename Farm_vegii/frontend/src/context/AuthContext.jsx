import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

// Context provider to manage login state across the whole app.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch current user once when app starts.
  const checkAuth = async () => {
    try {
      const { data } = await api.get("/api/auth/me");
      setUser(data.user);
      setIsAuthenticated(Boolean(data.isAuthenticated));
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Login API call.
  const login = async (payload) => {
    const { data } = await api.post("/api/auth/login", payload);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  // Register API call.
  const register = async (payload) => {
    const { data } = await api.post("/api/auth/register", payload);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  // Logout API call.
  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook so components can consume auth quickly.
export const useAuth = () => useContext(AuthContext);
