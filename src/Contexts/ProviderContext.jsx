import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProviderContext = createContext();

export function useProvider() {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error(
      "useProvider must be used within a ProviderContextProvider"
    );
  }
  return context;
}

export function ProviderContextProvider({ children }) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        // Configure axios to include credentials (cookies)
        axios.defaults.withCredentials = true;

        const response = await axios.get(
          "https://directly-core.onrender.com/services"
        );

        // Check if response.data exists and is an array
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid data format received from API");
        }

        // Fetch reviews for each provider
        const providersWithReviews = await Promise.all(
          response.data.map(async (provider) => {
            try {
              const reviewUrl = `https://directly-core.onrender.com/review/service/${provider._id}`;
              // console.log(
              //   `[Review Debug] Fetching reviews for service ${provider._id}`
              // );

              const reviewResponse = await axios.get(reviewUrl, {
                withCredentials: true, // Ensure cookies are sent with this request
              });

              if (reviewResponse.data && Array.isArray(reviewResponse.data)) {
                // console.log(
                //   `[Review Debug] Got ${reviewResponse.data.length} reviews for service ${provider._id}`
                // );

                return {
                  ...provider,
                  reviews: reviewResponse.data,
                };
              } else {
                console.warn(
                  `[Review Debug] Unexpected review data format for ${provider._id}`
                );
                return {
                  ...provider,
                  reviews: [],
                };
              }
            } catch (reviewErr) {
              console.error(
                `[Review Debug] Error fetching reviews for service ${provider._id}:`,
                reviewErr.message
              );

              if (reviewErr.response && reviewErr.response.status === 401) {
                console.error(
                  `[Review Debug] Authentication failed. Please ensure you're logged in and your session is valid.`
                );
              }

              return {
                ...provider,
                reviews: [],
              };
            }
          })
        );

        setProviders(providersWithReviews);
        console.log(providersWithReviews);

      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message || "Failed to fetch providers");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Helper functions
  const getProviderById = (id) => {
    return providers.find((provider) => provider._id === id);
  };

  const getProviderByName = (name) => {
    return providers.find((provider) => provider.name === name);
  };

  const value = {
    providers,
    loading,
    error,
    getProviderById,
    getProviderByName,
  };

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
}
