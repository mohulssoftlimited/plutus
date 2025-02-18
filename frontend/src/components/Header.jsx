import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { user } = useAuth();

    return (
        <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-400"><Link to="/">PLUTUS</Link></h1>

            <nav>
                <Link to="/" className="px-4 hover:text-blue-300">HOME</Link>
                <Link to="/ai-mentor" className="px-4 hover:text-blue-300">AI MENTOR</Link>
            </nav>

            <div className="flex items-center space-x-4">
                <span className="text-gray-300">Welcome, {user?.username}</span>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                    className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
