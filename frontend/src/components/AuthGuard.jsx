import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Header from "./Header"; // ✅ Import Header

const AuthGuard = () => {
    const { setUser } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const verifyUser = async () => {
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:8000/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    setUser(response.data);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        verifyUser();
    }, [token, setUser]);

    if (isAuthenticated === null) {
        return <div className="text-white text-center">Checking authentication...</div>;
    }

    return isAuthenticated ? (
        <>
            <Header /> {/* ✅ Show Header for Authenticated Routes */}
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default AuthGuard;
