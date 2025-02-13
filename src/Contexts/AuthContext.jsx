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
const USER_PROFILE_KEY = "user_profile";
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

  // New state for detailed user profile
  const [userProfile, setUserProfile] = useState(() => {
    const stored = localStorage.getItem(USER_PROFILE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(null);

  // Persist states to local storage
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

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile));
    } else {
      localStorage.removeItem(USER_PROFILE_KEY);
    }
  }, [userProfile]);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    if (!authenticated || user?.email === "admin@directly.com") {
      return;
    }

    try {
      const response = await axiosInstance.get("/auth/profile");
      if (response.data) {
        setUserProfile(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      if (error.response?.status === 401) {
        setAuthenticated(false);
        setUser(null);
        setUserProfile(null);
      }
    }
  };

  // Handle token refresh
  const refreshToken = async () => {
    if (user?.email === "admin@directly.com") {
      return true;
    }

    try {
      const response = await axiosInstance.post("/auth/refresh");
      if (response.data?.user) {
        setUser(response.data.user);
        // Refresh profile data after token refresh
        await fetchUserProfile();
      }
      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      if (error.response?.status === 401) {
        setAuthenticated(false);
        setUser(null);
        setUserProfile(null);
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
    if (authenticated && user?.email !== "admin@directly.com") {
      refreshToken();
      const interval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
      setRefreshInterval(interval);
    } else {
      clearRefreshInterval();
    }

    return () => clearRefreshInterval();
  }, [authenticated, user]);

  // Check auth status and fetch profile on mount and after window focus
  useEffect(() => {
    const checkAuthAndProfile = async () => {
      if (!authenticated) {
        setIsLoading(false);
        return;
      }

      if (user?.email === "admin@directly.com") {
        setIsLoading(false);
        return;
      }

      try {
        await fetchUserProfile();
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndProfile();

    const handleFocus = () => {
      if (authenticated && user?.email !== "admin@directly.com") {
        checkAuthAndProfile();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [authenticated, user]);

  const login = async (email, password) => {
    setIsLoggingIn(true);
    setIsLoading(true);

    try {
      if (email === "admin@directly.com" && password === "admin") {
        const adminUser = {
          email: "admin@directly.com",
          role: "admin",
          name: "Admin User",
          isAdmin: true,
        };
        setAuthenticated(true);
        setUser(adminUser);
        setUserProfile(adminUser);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(adminUser));
        localStorage.setItem(AUTH_STATUS_KEY, "true");
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(adminUser));
        return { user: adminUser };
      }

      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.data) {
        setAuthenticated(true);
        setUser(response.data.user);
        await fetchUserProfile();
        return response.data;
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setAuthenticated(false);
      setUser(null);
      setUserProfile(null);
      throw error;
    } finally {
      setIsLoading(false);
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    if (user?.email !== "admin@directly.com") {
      try {
        await axiosInstance.post("/auth/logout");
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    setAuthenticated(false);
    setUser(null);
    setUserProfile(null);
    localStorage.removeItem(AUTH_STATUS_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(USER_PROFILE_KEY);
  };

  // Enhanced axios interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

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
            setUserProfile(null);
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
        userProfile,
        login,
        logout,
        axiosInstance,
        isLoading,
        refreshProfile: fetchUserProfile, // Expose profile refresh function
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
