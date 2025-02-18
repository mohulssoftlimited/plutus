import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { user } = useAuth();
    const [communities, setCommunities] = useState([]);
    const [joinedCommunities, setJoinedCommunities] = useState([]);
    const [activeTab, setActiveTab] = useState("all"); // "all" or "joined"
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCommunity, setNewCommunity] = useState({ name: "", description: "" });

    // ✅ Fetch all communities
    const fetchCommunities = async () => {
        if (!user?._id) return;
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/communities?userId=${user._id}`);
            setCommunities(response.data);
        } catch (error) {
            console.error("Error fetching communities:", error);
        }
    };

    // ✅ Fetch joined communities for the user
    const fetchJoinedCommunities = async () => {
        if (!user?._id) return;
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/communities/joined?userId=${user._id}`);
            setJoinedCommunities(response.data);
        } catch (error) {
            console.error("Error fetching joined communities:", error);
        }
    };

    // ✅ Handle Join Community with Confirmation
    const handleJoinCommunity = async () => {
        if (!selectedCommunity || !user?._id) return;
        try {
            await axios.post(`http://127.0.0.1:8000/api/communities/${selectedCommunity._id}/join?userId=${user._id}&communityId=${selectedCommunity._id}`, {
                userId: user._id,
                communityId: selectedCommunity._id,
            });
            setShowConfirmModal(false);
            fetchCommunities();
            fetchJoinedCommunities();
        } catch (error) {
            console.error("Error joining community:", error);
        }
    };

    // ✅ Handle Create Community
    const handleCreateCommunity = async () => {
        if (!newCommunity.name.trim() || !newCommunity.description.trim()) return;
        try {
            await axios.post("http://127.0.0.1:8000/api/communities", newCommunity);
            setShowCreateModal(false);
            fetchCommunities();
        } catch (error) {
            console.error("Error creating community:", error);
        }
    };

    useEffect(() => {
        fetchCommunities();
        fetchJoinedCommunities();
    }, [user]);

    return (
        <div className="home-page p-6 bg-gray-900 text-white min-h-screen flex">
            {/* ✅ Communities Section */}
            <div className="w-1/2 border-r border-gray-700 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-blue-400">Communities</h2>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Create Community
                    </button>
                </div>

                {/* ✅ Tab Navigation */}
                <div className="flex border-b border-gray-600 mb-4">
                    <button
                        className={`flex-1 py-2 ${activeTab === "all" ? "border-b-2 border-blue-400 text-blue-400" : "text-gray-400"}`}
                        onClick={() => setActiveTab("all")}
                    >
                        All Communities
                    </button>
                    <button
                        className={`flex-1 py-2 ${activeTab === "joined" ? "border-b-2 border-blue-400 text-blue-400" : "text-gray-400"}`}
                        onClick={() => setActiveTab("joined")}
                    >
                        Joined Communities
                    </button>
                </div>

                {/* ✅ Communities List */}
                <div className="space-y-4">
                    {activeTab === "all"
                        ? communities.map((community) => (
                              <div key={community._id} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between">
                                  <div>
                                      <h3 className="text-lg font-semibold">{community.name}</h3>
                                      <p className="text-gray-400">{community.description}</p>
                                  </div>
                                  <button
                                      className="bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 transition"
                                      onClick={() => {
                                          setSelectedCommunity(community);
                                          setShowConfirmModal(true);
                                      }}
                                  >
                                      Join Now
                                  </button>
                              </div>
                          ))
                        : joinedCommunities.map((community) => (
                              <div key={community._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                                  <h3 className="text-lg font-semibold">{community.name}</h3>
                                  <p className="text-gray-400">{community.description}</p>
                              </div>
                          ))}
                </div>
            </div>

            {/* ✅ Confirm Join Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold text-white">Join Community?</h2>
                        <p className="text-gray-400 mt-2">
                            Are you sure you want to join <span className="font-bold">{selectedCommunity?.name}</span>?
                        </p>
                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleJoinCommunity}
                                className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ Create Community Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold text-white">Create Community</h2>
                        <input
                            type="text"
                            placeholder="Community Name"
                            className="w-full p-2 mt-3 bg-gray-700 rounded-lg outline-none"
                            value={newCommunity.name}
                            onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
                        />
                        <textarea
                            placeholder="Description"
                            className="w-full p-2 mt-3 bg-gray-700 rounded-lg outline-none"
                            rows="3"
                            value={newCommunity.description}
                            onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
                        ></textarea>
                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateCommunity}
                                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
