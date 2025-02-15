import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://directly-core.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const AuthContext = createContext(null);

const AUTH_STATUS_KEY = "auth_status";
const USER_DATA_KEY = "user_data";
const USER_PROFILE_KEY = "user_profile";
const TOKEN_REFRESH_INTERVAL = 25 * 60 * 1000;
const OAUTH_STATE_KEY = "oauth_pending";

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(() => {
    const stored = localStorage.getItem(AUTH_STATUS_KEY);
    return stored ? JSON.parse(stored) : false;
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_DATA_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [userProfile, setUserProfile] = useState(() => {
    const stored = localStorage.getItem(USER_PROFILE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(null);

  // Initial auth check including OAuth return
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if returning from OAuth
        const isReturningFromOAuth =
          localStorage.getItem(OAUTH_STATE_KEY) === "true";

        if (isReturningFromOAuth) {
          localStorage.removeItem(OAUTH_STATE_KEY);
          // Small delay to ensure cookie is set
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        const response = await axiosInstance.get("/auth/profile");
        if (response.data) {
          setAuthenticated(true);
          setUser(response.data);
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error("Auth status check failed:", error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Local storage persistence
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

  const handleLogout = () => {
    setAuthenticated(false);
    setUser(null);
    setUserProfile(null);
    localStorage.removeItem(AUTH_STATUS_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(USER_PROFILE_KEY);
    localStorage.removeItem(OAUTH_STATE_KEY);
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      if (response.data) {
        setUserProfile(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.post("/auth/refresh");
      if (response.data?.user) {
        setUser(response.data.user);
        await fetchUserProfile();
      }
      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
      return false;
    }
  };

  useEffect(() => {
    if (authenticated) {
      const interval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
      setRefreshInterval(interval);
      return () => clearInterval(interval);
    }
  }, [authenticated]);

  const login = async (email, password) => {
    setIsLoggingIn(true);
    setIsLoading(true);

    try {
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
      handleLogout();
      throw error;
    } finally {
      setIsLoading(false);
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
    handleLogout();
  };

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

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
            handleLogout();
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
        refreshProfile: fetchUserProfile,
        isAdmin: userProfile?.role === "admin",
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
