import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AIMentor = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef(null);
    let socket = useRef(null);

    // ✅ Track AI response dynamically while streaming
    const currentAIMessageRef = useRef(null); 

    // ✅ Function to Load Previous Chat History
    const loadChatHistory = async () => {
        if (!user?._id) return; // ✅ Ensure user is logged in
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/ai-mentor?userId=${user._id}`);
            const previousMessages = response.data.map(chat => ([
                { id: `user-${chat._id}`, text: chat.prompt, sender: "User" },
                { id: `ai-${chat._id}`, text: chat.response, sender: "AI", isStreaming: false }
            ])).flat();
            
            setMessages(previousMessages); // ✅ Load messages into state
        } catch (error) {
            console.error("❌ Error fetching chat history:", error);
        }
    };

    // ✅ WebSocket Connection (Wrapped in useCallback)
    const connectWebSocket = useCallback(() => {
        if (socket.current) {
            socket.current.close(); // ✅ Close existing connection before reconnecting
        }

        socket.current = new WebSocket("ws://127.0.0.1:8000/ws/ai/mentor");

        socket.current.onopen = () => {
            console.log("✅ WebSocket connected");
        };

        let tempMessage = ""; // ✅ Store AI response before appending

        socket.current.onmessage = (event) => {
            const chunk = event.data;
            console.log("📩 Received chunk:", chunk); // ✅ Debugging log

            if (chunk === "[END]") {
                console.log("✅ Full AI Response:", tempMessage); // ✅ Debugging full response
                
                setMessages(prevMessages => {
                    return prevMessages.map(msg => 
                        msg.id === currentAIMessageRef.current?.id ? 
                        { ...msg, text: tempMessage, isStreaming: false } : msg
                    );
                });

                currentAIMessageRef.current = null; // ✅ Stop AI streaming
                tempMessage = ""; // ✅ Reset temp storage
                setLoading(false);
            } else {
                tempMessage += chunk; // ✅ Accumulate AI response dynamically

                setMessages(prevMessages => {
                    if (currentAIMessageRef.current) {
                        return prevMessages.map(msg => 
                            msg.id === currentAIMessageRef.current?.id ? 
                            { ...msg, text: tempMessage } : msg
                        );
                    } else {
                        const newMessage = { id: `ai-${Date.now()}`, text: tempMessage, sender: "AI", isStreaming: true };
                        currentAIMessageRef.current = newMessage;
                        return [...prevMessages, newMessage];
                    }
                });
            }
        };

        socket.current.onerror = (error) => {
            console.error("❌ WebSocket Error:", error);
        };

        socket.current.onclose = (event) => {
            console.log("⚠️ WebSocket closed, reconnecting...", event.code);
            setTimeout(connectWebSocket, 3000); // ✅ Reconnect WebSocket when closed
        };
    }, []);

    useEffect(() => {
        loadChatHistory();  // ✅ Load previous chat history on mount
        connectWebSocket(); // ✅ Connect WebSocket

        return () => socket.current?.close(); // ✅ Clean up WebSocket on unmount
    }, [connectWebSocket]);

    const sendMessage = () => {
        if (!input.trim()) return;
        if (!user?._id) {
            alert("User ID is required!");
            return;
        }

        const message = { userId: user._id, prompt: input };

        setMessages(prevMessages => [
            ...prevMessages,
            { id: `user-${Date.now()}`, text: input, sender: "User" }
        ]);

        setInput("");
        setLoading(true);
        currentAIMessageRef.current = null; // ✅ Reset AI tracking before receiving new AI response
        socket.current.send(JSON.stringify(message));
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* ✅ Header */}
            <header className="p-4 bg-gray-800 shadow-md text-center text-xl font-semibold">
                AI Mentor Chat
            </header>

            {/* ✅ Chat Container */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => (
                    <div key={msg.id || index} className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-xs md:max-w-sm p-3 rounded-lg 
                            ${msg.sender === "User" ? "bg-blue-600" : "bg-gray-700"} text-white`}>
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* ✅ AI is Typing Indicator */}
                {loading && currentAIMessageRef.current === null && (
                    <div className="flex justify-start">
                        <div className="p-3 bg-gray-700 rounded-lg animate-pulse">Typing...</div>
                    </div>
                )}
            </div>

            {/* ✅ Input Box */}
            <div className="p-4 bg-gray-800 flex items-center">
                <input
                    type="text"
                    className="flex-1 px-4 py-2 bg-gray-700 rounded-lg text-white outline-none"
                    placeholder="Ask something..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="ml-3 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default AIMentor;
