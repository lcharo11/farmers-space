import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar'; // Import the AdminSidebar component
import './AdminPanel.css';

function AdminPanel() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
    image: null,
  });
  const [notification, setNotification] = useState({
    message: '',
    recipient: '',
  });
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleNotificationChange = (e) => {
    const { name, value } = e.target;
    setNotification({ ...notification, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:5000/api/products',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage('Product added successfully!');
      setError('');
      setProduct({
        name: '',
        price: '',
        category: '',
        description: '',
        stock: '',
        image: null,
      });
      console.log('Product submitted:', response.data);
    } catch (error) {
      setError(`Error submitting product. ${error.response?.data?.details || 'Please try again.'}`);
      setMessage('');
      console.error('Error:', error);
    }
  };

  const handleSubmitNotification = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:5000/api/notifications',
        notification,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Notification sent successfully!');
      setError('');
      setNotification({
        message: '',
        recipient: '',
      });
      console.log('Notification sent:', response.data);
    } catch (error) {
      setError(`Error sending notification. ${error.response?.data?.details || 'Please try again.'}`);
      setMessage('');
      console.error('Error:', error);
    }
  };

  const handleConfirmOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: 'Confirmed' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Order confirmed:', response.data);
      fetchOrders();
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <div className="admin-panel-container">
      <AdminSidebar />
      <div className="admin-panel-content">
        <h1>Admin Panel</h1>

        {/* Dashboard Overview */}
        <div className="dashboard">
          <h2>Dashboard</h2>
          <p>Summary of activities</p>
        </div>

        {/* Add Product Section */}
        <div className="section">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmitProduct}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleProductChange}
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleProductChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={product.category}
              onChange={handleProductChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleProductChange}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={product.stock}
              onChange={handleProductChange}
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
            />
            <button type="submit">Add Product</button>
          </form>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>

        {/* Send Notification Section */}
        <div className="section">
          <h2>Send Notification</h2>
          <form onSubmit={handleSubmitNotification}>
            <textarea
              name="message"
              placeholder="Notification Message"
              value={notification.message}
              onChange={handleNotificationChange}
              required
            />
            <input
              type="text"
              name="recipient"
              placeholder="Recipient User ID"
              value={notification.recipient}
              onChange={handleNotificationChange}
              required
            />
            <button type="submit">Send Notification</button>
          </form>
        </div>

        {/* View and Confirm Orders Section */}
        <div className="section">
          <h2>Orders</h2>
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                <p>Product: {order.product.name}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Status: {order.status}</p>
                <p>User: {order.user.email}</p>
                {order.status === 'Pending' && (
                  <button onClick={() => handleConfirmOrder(order._id)}>
                    Confirm Order
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;