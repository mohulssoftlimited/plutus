import React, { useState } from 'react';

/**
 * ChatInterface component for AI Mentor chat functionality.
 * @param {Array} messages - Array of chat messages.
 * @param {string} inputPlaceholder - Placeholder text for the input field.
 */
const ChatInterface = ({ messages, inputPlaceholder }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        // Logic to send the message
        setInput('');
    };

    return (
        <div className="chat-interface border p-4 rounded-lg">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={inputPlaceholder}
                className="border p-2 rounded"
            />
            <button onClick={handleSend} className="bg-primary text-white py-2 px-4 rounded">Send</button>
        </div>
    );
};

export default ChatInterface;
