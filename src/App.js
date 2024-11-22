import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import News from './pages/News';
import Community from './pages/Community';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Signup from './components/Signup';
import AdminPanel from './pages/AdminPanel'; // Import AdminPanel
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import Cart from './components/Cart'; // Import Cart
import NotFound from './pages/NotFound'; // Import NotFound
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Track admin status

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Check token
    const adminStatus = localStorage.getItem('isAdmin'); // Check admin status
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(adminStatus === 'true');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} /> 

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}>
                <Marketplace />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}>
                <News />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}>
                <Community />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}>
                <Resources />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin-only Protected Route */}
        <Route
          path="/login/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated && isAdmin}>
              <Layout handleLogout={handleLogout}>
                <AdminPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Cart Route */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout handleLogout={handleLogout}>
                <Cart />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;