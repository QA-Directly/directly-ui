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
        const response = await axios.get(
          "https://directly-core.onrender.com/services"
        );
        console.log("API Status:", response.status, "Data:", response.data);

        // Check if response.data exists and is an array
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid data format received from API");
        }

        // Transform the API data to match the expected format
        const transformedData = response.data.map((provider) => ({
          id: provider._id,
          name: provider.businessName,
          service: provider.category,
          starRating: provider.averageRating || 0,
          image: provider.idImage || "",
          description: provider.description || "",
          phone: provider.phoneNumber || "",
          email: provider.email || "",
          location:
            provider.city && provider.state && provider.country
              ? `${provider.city}, ${provider.state}, ${provider.country}`
              : "Location not specified",
          verifiedId: provider.status === "approved",
          reviews: [], // Default empty array for reviews
          gallery: [], // Default empty array for gallery
        }));

        console.log("Transformed Data:", transformedData); // Debug log
        setProviders(transformedData);
      } catch (err) {
        console.error("Fetch Error:", err); // Debug log
        setError(err.message || "Failed to fetch providers");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Helper functions
  const getProviderById = (id) => {
    console.log("Finding provider with ID:", id); // Debug log
    console.log("Available providers:", providers); // Debug log
    return providers.find((provider) => provider.id === id);
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
