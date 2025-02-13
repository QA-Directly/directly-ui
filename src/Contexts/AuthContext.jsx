import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: "https://directly-core.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const AuthContext = createContext(null);

// Add local storage keys
const AUTH_STATUS_KEY = "auth_status";
const USER_DATA_KEY = "user_data";
const TOKEN_REFRESH_INTERVAL = 25 * 60 * 1000; // 25 minutes in milliseconds

export const AuthProvider = ({ children }) => {
  // Initialize state from local storage
  const [authenticated, setAuthenticated] = useState(() => {
    const stored = localStorage.getItem(AUTH_STATUS_KEY);
    return stored ? JSON.parse(stored) : false;
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_DATA_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(null);

  // Persist authentication state to local storage
  useEffect(() => {
    if (authenticated) {
      localStorage.setItem(AUTH_STATUS_KEY, JSON.stringify(authenticated));
    } else {
      localStorage.removeItem(AUTH_STATUS_KEY);
    }
  }, [authenticated]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_DATA_KEY);
    }
  }, [user]);

  // Handle token refresh
  const refreshToken = async () => {
    // Skip token refresh for admin user
    if (user?.email === "admin@directly.com") {
      return true;
    }

    try {
      const response = await axiosInstance.post("/auth/refresh");
      if (response.data?.user) {
        setUser(response.data.user);
      }
      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      if (error.response?.status === 401) {
        setAuthenticated(false);
        setUser(null);
        clearRefreshInterval();
      }
      return false;
    }
  };

  const clearRefreshInterval = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    }
  };

  // Set up token refresh interval when authenticated
  useEffect(() => {
    // Skip refresh interval for admin user
    if (authenticated && user?.email !== "admin@directly.com") {
      // Initial refresh
      refreshToken();

      // Set up periodic refresh
      const interval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
      setRefreshInterval(interval);
    } else {
      clearRefreshInterval();
    }

    return () => clearRefreshInterval();
  }, [authenticated, user]);

  // Check auth status on mount and after window focus
  useEffect(() => {
    const checkAuth = async () => {
      if (!authenticated) {
        setIsLoading(false);
        return;
      }

      // Skip auth check for admin user
      if (user?.email === "admin@directly.com") {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/auth/profile");
        if (response.data) {
          setAuthenticated(true);
          setUser(response.data);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setAuthenticated(false);
          setUser(null);
        }
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const handleFocus = () => {
      if (authenticated && user?.email !== "admin@directly.com") {
        checkAuth();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [authenticated, user]);

  const login = async (email, password) => {
    setIsLoggingIn(true);
    setIsLoading(true);

    try {
      // Handle admin login
      if (email === "admin@directly.com" && password === "admin") {
        const adminUser = {
          email: "admin@directly.com",
          role: "admin",
          name: "Admin User",
          isAdmin: true,
        };
        setAuthenticated(true);
        setUser(adminUser);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(adminUser));
        localStorage.setItem(AUTH_STATUS_KEY, "true");
        return { user: adminUser };
      }

      // Normal user login
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.data) {
        const profileResponse = await axiosInstance.get("/auth/profile");

        if (profileResponse.data) {
          setAuthenticated(true);
          setUser(profileResponse.data);
          return response.data;
        }
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    // Skip server logout for admin user
    if (user?.email !== "admin@directly.com") {
      try {
        await axiosInstance.post("/auth/logout");
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    // Clear auth state regardless of user type
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem(AUTH_STATUS_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  };

  // Enhanced axios interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Skip token refresh for admin user
      if (user?.email === "admin@directly.com") {
        return Promise.reject(error);
      }

      if (
        error.response?.status === 401 &&
        !isLoggingIn &&
        !originalRequest.url?.includes("/auth/refresh") &&
        !originalRequest._retry &&
        authenticated
      ) {
        originalRequest._retry = true;

        try {
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          if (refreshError.response?.status === 401) {
            setAuthenticated(false);
            setUser(null);
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        login,
        logout,
        axiosInstance,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
