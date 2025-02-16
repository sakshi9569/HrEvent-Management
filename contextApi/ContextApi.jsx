import React, { createContext, useContext, useState, useEffect } from "react";

const storedData = JSON.parse(localStorage.getItem("USER_DATA")) || { token: null, id: null };

export const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(storedData.token);
  const [id, setUserId] = useState(storedData.id);

  useEffect(() => {
    localStorage.setItem("USER_DATA", JSON.stringify({ token, id }));
  }, [token, id]);

  const updateUser = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("role");
    localStorage.removeItem("USER_DATA");
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("id");
  };

  return (
    <ContextApi.Provider value={{ token, id, setToken, setUserId, updateUser, logout }}>
      {children}
    </ContextApi.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error('useStoreContext must be used within a ContextProvider');
  }
  return context;
};
