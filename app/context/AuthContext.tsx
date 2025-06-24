"use client";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { decodeJWT } from "../utils/jwt";

type User = {
  id: number;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded) {
        setUser({ id: decoded.id, role: decoded.role });
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    const decoded = decodeJWT(token);
    if (decoded) {
      setUser({ id: decoded.id, role: decoded.role });
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
