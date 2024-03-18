import React, { useState, useEffect } from 'react';
import './ChatBot.css'; // Import your CSS file for styling
import img1 from '../images/icons8-chat-96.png';

export default function ChatBot() {
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // Add event listener to listen for Escape key press
    const handleEscapeKeyPress = (event) => {
      if (event.keyCode === 27) {
        setShowChat(false);
        setChatMessages([]); // Clear chat messages
      }
    };

    // Add event listener when component mounts
    document.addEventListener('keydown', handleEscapeKeyPress);

    // Cleanup: remove event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const toggleChat = () => {
    setShowChat(!showChat);
    if (!showChat) {
      setChatMessages([]); // Clear chat messages when closing the chat window
    }
  };

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSend = () => {
    if (userMessage.trim() !== '') {
      const newChatMessages = [...chatMessages, { sender: 'user', message: userMessage }];
      setChatMessages(newChatMessages);
      setUserMessage('');
      
      // Simulate bot response after a short delay (for demonstration purposes)
      setTimeout(() => {
        const botResponse = { sender: 'bot', message: "How can I help you?" };
        setChatMessages([...newChatMessages, botResponse]);
      }, 1000); // Adjust delay as needed
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot icon */}
      <div className="chatbot-icon" onClick={toggleChat}>
        <img src={img1} alt="My Image" />
      </div>

      {/* Chat window */}
      {showChat && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <h3>Chatbot</h3>
            <button className="close-button" onClick={toggleChat}>Close</button>
          </div>
          
          {/* Body - Messages */}
          <div className="chat-body">
            {chatMessages.map((chat, index) => (
              <div key={index} className={`message ${chat.sender}`}>
                {chat.message}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={userMessage}
              onChange={handleInputChange}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
