import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    const storedData = localStorage.getItem("USER_DATA")
        ? JSON.parse(localStorage.getItem("USER_DATA"))
        : { token: null, id: null };

    const [token, setToken] = useState(storedData.token);
    const [id, setUserId] = useState(storedData.id);

    const updateUser = (newToken, newUserId) => {
        setToken(newToken);
        setUserId(newUserId);
        localStorage.setItem("USER_DATA", JSON.stringify({ token: newToken, id: newUserId }));
    };

    return (
        <ContextApi.Provider value={{ token, id, setToken, setUserId, updateUser }}>
            {children}
        </ContextApi.Provider>
    );
};

export const useStoreContext = () => {
    const context = useContext(ContextApi);
    if (!context) {
        throw new Error("useStoreContext must be used within a ContextProvider");
    }
    return context;
};
