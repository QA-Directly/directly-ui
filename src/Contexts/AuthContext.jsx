import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("token");

    if (id) {
      setAuthenticated(true);
      setToken(id);
    } else {
      setAuthenticated(false);
      setToken(null);
    }
  }, []);
  const login = (newToken) => {
    localStorage.setItem("token", token);
    setAuthenticated(true);
    setToken(newToken);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    setToken(null);
  };
  return (
    <AuthContext.Provider value={{ authenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
