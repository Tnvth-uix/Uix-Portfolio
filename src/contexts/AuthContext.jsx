"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [mode, setMode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated from sessionStorage
    const storedMode = sessionStorage.getItem("uix.auth.mode");
    setMode(storedMode);
    setIsLoading(false);
  }, []);

  const setAuthMode = (newMode) => {
    sessionStorage.setItem("uix.auth.mode", newMode);
    setMode(newMode);
  };

  const logout = () => {
    sessionStorage.removeItem("uix.auth.mode");
    setMode(null);
  };

  return (
    <AuthContext.Provider value={{ mode, setAuthMode, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
