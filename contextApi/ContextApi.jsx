import { createContext, useContext, useState, useMemo } from "react";

// Retrieve stored data from localStorage or initialize with default values
const storedData = JSON.parse(localStorage.getItem("USER_DATA")) || { token: null, id: null };

// Create the context
export const ContextApi = createContext();

// Context Provider Component
export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(storedData.token);
  const [id, setUserId] = useState(storedData.id);

  // Function to update user data
  const updateUser = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
    localStorage.setItem("USER_DATA", JSON.stringify({ token: newToken, id: newUserId }));
  };

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({ token, id, setToken, setUserId, updateUser }), [token, id]);

  return (
    <ContextApi.Provider value={value}>
      {children}
    </ContextApi.Provider>
  );
};

// Custom hook to use the context
export const useStoreContext = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error('useStoreContext must be used within a ContextProvider');
  }
  return context;
};