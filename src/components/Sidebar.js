import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰
      </button>
      {!isCollapsed && (
        <div className="sidebar-content">
          <h2>Farmers Space</h2>
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/marketplace">Marketplace</Link></li>
              <li><Link to="/news">News & Updates</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/resources">Resources</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Sidebar;