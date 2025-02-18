import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/api"; // Replace with actual API function

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(""); // Clear errors

        try {
            const data = await registerUser(email, username, password); // Call signup API
            console.log("Signup successful:", data);
            navigate("/login"); // Redirect to login page after signup
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.detail || "Signup failed, please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">Sign Up</h2>

                {errorMessage && (
                    <p className="mb-4 text-red-500 text-center bg-red-800 p-2 rounded-lg">
                        {errorMessage}
                    </p>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-gray-400">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                {/* ✅ Login Link */}
                <p className="mt-4 text-center text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-all">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
