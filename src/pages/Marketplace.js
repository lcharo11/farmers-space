import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Marketplace.css'; // Assuming you have a separate CSS file for styling

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by category and search term
  const filteredProducts = products.filter(
    (product) =>
      (category === 'all' || product.category === category) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add to cart function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: parseInt(item.quantity) + parseInt(product.quantity || 1) }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: product.quantity || 1 }];
    });
  };

  return (
    <div className="marketplace">
      <h1>Farmers Space Marketplace</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Toggle Button */}
      <div className="category-toggle">
        <button
          onClick={() => setCategory('all')}
          className={category === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button
          onClick={() => setCategory('fruits')}
          className={category === 'fruits' ? 'active' : ''}
        >
          Fruits
        </button>
        <button
          onClick={() => setCategory('vegetables')}
          className={category === 'vegetables' ? 'active' : ''}
        >
          Vegetables
        </button>
        {/* Add more categories as needed */}
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.imageUrl || 'default-image-url.jpg'} // Fallback image
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Stock:</strong> {product.stock} units
                </p>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  defaultValue="1"
                  onChange={(e) => (product.quantity = e.target.value)}
                  className="quantity-input"
                />
                <button
                  onClick={() => addToCart(product)}
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products-message">No products found.</p>
        )}
      </div>

      {/* Cart Information */}
      <div className="cart-info">
        <h2>Cart</h2>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <p>
                {item.name} - Quantity: {item.quantity}
              </p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Marketplace;