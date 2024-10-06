import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, image?: string) => Promise<void>;
  updateUser: (updatedData: { name?: string; image?: string }) => Promise<void>; // Add updateUser function here
  logout: () => void;
}

const Backend_URL = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${Backend_URL}/api/users/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } else {
      throw new Error(data.error);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    image?: string
  ) => {
    const response = await fetch(`${Backend_URL}/api/users/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, image }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } else {
      throw new Error(data.error);
    }
  };

  const updateUser = async (updatedData: { name?: string; image?: string }) => {
    if (!user) throw new Error("No user is logged in");

    const response = await fetch(`${Backend_URL}/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    });

    const updatedUser = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } else {
      throw new Error(updatedUser.error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
