import React from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.isOwn ? 'own' : ''}`}>
          <div className="message-content">
            <img src={msg.avatar} alt={msg.user} className="avatar" />
            <div className="message-text">
              <strong>{msg.user}</strong>
              <p>{msg.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;