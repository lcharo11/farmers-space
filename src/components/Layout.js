import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleAccountOptions = () => {
    setShowAccountOptions(!showAccountOptions);
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <div className="account-toggle">
          <button className="account-button" onClick={toggleAccountOptions}>
            <img src="/account.png" alt="User Icon" className="user-icon" />
          </button>
          {showAccountOptions && (
            <div className="account-options">
              {isAuthenticated ? (
                <>
                  <Link to="/profile">Profile</Link>
                  <Link to="/about">About Us</Link>
                  <Link to="/contact">Contact Us</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </>
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;