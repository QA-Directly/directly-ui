import React, { createContext, useContext, useState } from "react";
import { providersData } from "../utils/ProvidersData";

const ProviderContext = createContext();

export function useProvider() {
  return useContext(ProviderContext);
}

export function ProviderContextProvider({ children }) {
  const [providers] = useState(providersData);

  const getProviderById = (id) => {
    return providers.find((provider) => provider.id === id);
  };

  const getProviderByName = (name) => {
    return providers.find((provider) => provider.name === name);
  };

  const value = {
    providers,
    getProviderById,
    getProviderByName,
  };

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
}
