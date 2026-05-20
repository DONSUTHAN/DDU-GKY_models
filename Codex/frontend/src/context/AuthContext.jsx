import { createContext, useContext, useMemo, useState } from "react";
import { http } from "../api/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("farmdirect_user");
    return saved ? JSON.parse(saved) : null;
  });

  async function login(payload) {
    const { data } = await http.post("/auth/login", payload);
    localStorage.setItem("farmdirect_token", data.token);
    localStorage.setItem("farmdirect_user", JSON.stringify(data.user));
    setUser(data.user);
  }

  async function register(payload) {
    const { data } = await http.post("/auth/register", payload);
    localStorage.setItem("farmdirect_token", data.token);
    localStorage.setItem("farmdirect_user", JSON.stringify(data.user));
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("farmdirect_token");
    localStorage.removeItem("farmdirect_user");
    setUser(null);
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
