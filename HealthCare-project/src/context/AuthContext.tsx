
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  userType: "patient" | "dentist";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: "patient" | "dentist") => Promise<boolean>;
  register: (name: string, email: string, password: string, userType: "patient" | "dentist") => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

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
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("dental_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // In a real application, this would be an API call
  const login = async (email: string, password: string, userType: "patient" | "dentist"): Promise<boolean> => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, just check if email contains the word "dentist"
      if ((userType === "dentist" && !email.includes("dentist")) || 
          (userType === "patient" && email.includes("dentist"))) {
        toast.error("Invalid email for this user type");
        return false;
      }

      if (email && password) {
        const mockUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          name: email.split("@")[0],
          email,
          userType
        };
        
        setUser(mockUser);
        localStorage.setItem("dental_user", JSON.stringify(mockUser));
        toast.success(`Welcome back, ${mockUser.name}!`);
        return true;
      } else {
        toast.error("Invalid credentials");
        return false;
      }
    } catch (error) {
      toast.error("Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, userType: "patient" | "dentist"): Promise<boolean> => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes
      if (!email || !password || !name) {
        toast.error("All fields are required");
        return false;
      }
      
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        userType
      };
      
      setUser(mockUser);
      localStorage.setItem("dental_user", JSON.stringify(mockUser));
      toast.success(`Welcome, ${mockUser.name}!`);
      return true;
    } catch (error) {
      toast.error("Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dental_user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
