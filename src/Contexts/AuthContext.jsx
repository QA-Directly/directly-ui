import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: "https://directly-core.onrender.com",
  withCredentials: true, // Ensure cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check if the user is authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/profile");
        if (response.data) {
          setAuthenticated(true);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of outcome
      }
    };
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    console.log("Starting login attempt");
    setIsLoading(true);
    setIsLoggingIn(true);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.data) {
        console.log("Response Data: ", response.data);
        setUser(response.data); // Store user data

        // Verify session immediately
        try {
          const profileResponse = await axiosInstance.get("/auth/profile");
          console.log("Profile Response:", profileResponse.data); // Debug log
          if (profileResponse.data) {
            setAuthenticated(true);
            setUser((prevUser) => ({ ...prevUser, ...profileResponse.data }));
            return response.data;
          }
        } catch (error) {
          console.error(
            "Profile verification failed:",
            error.response?.data || error.message
          );
          throw new Error("Session verification failed");
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
  // Logout function
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Clear auth state even if logout API fails
      setAuthenticated(false);
      setUser(null);
    }
  };

  // Add a single response interceptor for handling refresh and auth errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized errors
      if (
        error.response?.status === 401 &&
        !isLoggingIn && // Avoid infinite loops during login
        !originalRequest.url?.includes("/auth/refresh") && // Prevent retrying refresh endpoint
        !originalRequest._retry && // Prevent retrying the same request multiple times
        authenticated // Only attempt refresh if we think we're authenticated
      ) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await axiosInstance.post("/auth/refresh");

          if (refreshResponse.status === 200) {
            // Retry the original request with fresh tokens
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          setAuthenticated(false);
          setUser(null);
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
