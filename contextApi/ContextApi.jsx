import { createContext, useContext, useState, useMemo } from "react";


const storedData = JSON.parse(localStorage.getItem("USER_DATA")) || { token: null, id: null };

export const ContextApi = createContext();


export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(storedData.token);
  const [id, setUserId] = useState(storedData.id);

  const updateUser = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);

    localStorage.setItem("USER_DATA", JSON.stringify({ token: newToken, id: newUserId }));
  };

  const value = useMemo(() => ({ token, id, setToken, setUserId, updateUser }), [token, id]);

  return (
    <ContextApi.Provider value={value}>
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