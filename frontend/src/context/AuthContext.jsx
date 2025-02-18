import React, { createContext, useContext, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store authenticated user details

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
