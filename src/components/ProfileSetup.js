import React, { useState } from 'react';
import './ProfileSetup.css';

const ProfileSetup = ({ onSave }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    const profile = { username, email, password, avatar };
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });
      const data = await response.json();
      onSave(data); // Save profile data to parent component state
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <form className="profile-setup" onSubmit={handleSave}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Avatar URL:</label>
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileSetup;