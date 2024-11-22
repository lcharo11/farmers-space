import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatList from '../components/ChatList'; // Update path
import ChatWindow from '../components/ChatWindow'; // Update path
import MessageInput from '../components/MessageInput'; // Update path
import './Community.css';

const socket = io('http://localhost:5000');

const Community = () => {
  const [chats, setChats] = useState([
    { id: 'general', name: 'General Chat', lastMessage: 'Last message...', avatar: 'https://via.placeholder.com/40' },
    // Add more sample chats
  ]);
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/messages')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => console.error('Error fetching messages:', error));

    socket.on('message', newMessage => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = (text) => {
    const message = { user: 'You', text, isOwn: true, avatar: 'https://via.placeholder.com/40', timestamp: new Date().toISOString() };
    fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    }).catch(error => console.error('Error sending message:', error));
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
    // Fetch messages for the selected chat
  };

  return (
    <div className="community">
      <ChatList chats={chats} selectChat={selectChat} selectedChat={selectedChat} />
      <div className="chat-area">
        <ChatWindow messages={messages.filter(msg => msg.chatId === selectedChat.id || selectedChat.id === 'general')} />
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Community;