import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import AuthGuard from './components/AuthGuard';

import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import AuthGuard from "./components/AuthGuard";

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Community from './pages/Community';
import AIMentor from './pages/AIMentor';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';
// import { ToastContainer } from "react-toastify";

/**
 * Main application component that handles routing.
 */
const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route element={<AuthGuard />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/ai-mentor" element={<AIMentor />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
