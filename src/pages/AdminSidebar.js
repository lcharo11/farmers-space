import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminSidebar.css';

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove authentication token
    navigate('/user-dashboard'); // Redirect to user dashboard
  };

  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/add-product">Add Product</Link>
          </li>
          <li>
            <Link to="/admin/send-notification">Send Notifications</Link>
          </li>
          <li>
            <Link to="/admin/view-orders">View Orders</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminSidebar;