import React from 'react';
import './ChatList.css';

const ChatList = ({ chats, selectChat, selectedChat }) => {
  return (
    <div className="chat-list">
      {chats.map(chat => (
        <div 
          key={chat.id} 
          className={`chat-list-item ${chat.id === selectedChat.id ? 'selected' : ''}`}
          onClick={() => selectChat(chat)}
        >
          <img src={chat.avatar} alt={chat.name} className="avatar" />
          <div className="chat-info">
            <h3 className="chat-name">{chat.name}</h3>
            <p className="chat-last-message">{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;