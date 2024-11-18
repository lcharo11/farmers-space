import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from React Router
import './Dashboard.css';

const images = [
  "/one.jpg",   // Path relative to public folder
  "/two.jpg",
  "/three.jpg",
  "/four.jpg"
];

function Dashboard() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Farmers Space</h1>
        <p>Empowering farmers with resources, community, and opportunities.</p>
      </header>
      <div className="images-container">
        <img src={images[currentImageIndex]} alt="Slideshow" className="header-image show" />
      </div>
      <div className="stats-container">
        <div className="stat-card">
          <h2>1200</h2>
          <p>Active Users</p>
        </div>
        <div className="stat-card">
          <h2>350</h2>
          <p>Products Listed</p>
        </div>
        <div className="stat-card">
          <h2>85%</h2>
          <p>User Satisfaction</p>
        </div>
      </div>
      <div className="cards-container">
        <div className="card" onClick={() => navigate('/marketplace')}>
          <div className="card-content">
            <i className="fas fa-shopping-cart icon"></i>
            <h2>Marketplace</h2>
            <p>Explore a wide range of products to enhance your farming needs.</p>
          </div>
        </div>
        <div className="card" onClick={() => navigate('/news')}>
          <div className="card-content">
            <i className="fas fa-newspaper icon"></i>
            <h2>News & Updates</h2>
            <p>Stay updated with the latest trends and news in agriculture.</p>
          </div>
        </div>
        <div className="card" onClick={() => navigate('/community')}>
          <div className="card-content">
            <i className="fas fa-users icon"></i>
            <h2>Community</h2>
            <p>Connect with fellow farmers, share insights, and support each other.</p>
          </div>
        </div>
        <div className="card" onClick={() => navigate('/resources')}>
          <div className="card-content">
            <i className="fas fa-book icon"></i>
            <h2>Resources</h2>
            <p>Access educational materials and resources for better farming.</p>
          </div>
        </div>
      </div>
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          <li>User JohnDoe listed a new product: Organic Tomatoes</li>
          <li>JaneSmith commented on your post in Community</li>
          <li>New update available: Farmers Space v1.5</li>
        </ul>
      </div>
      <div className="notifications">
        <h2>Notifications</h2>
        <ul>
          <li>Reminder: Check your crop health report</li>
          <li>New message from Support Team</li>
          <li>Upcoming event: Webinar on Sustainable Farming</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;