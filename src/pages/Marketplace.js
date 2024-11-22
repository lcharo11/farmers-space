import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Marketplace.css'; // Assuming you have a separate CSS file for styling

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const cartIconRef = useRef(null);
  const navigate = useNavigate();

  // Sample products for demonstration purposes
  const sampleProducts = [
    {
      _id: '1',
      name: 'Organic Apples',
      description: 'Fresh organic apples from the farm.',
      price: 2.99,
      stock: 50,
      imageUrl: '/images/apples.jpeg',
      category: 'fruits',
    },
    {
      _id: '2',
      name: 'Tomatoes',
      description: 'Ripe and juicy tomatoes.',
      price: 1.99,
      stock: 30,
      imageUrl: '/images/tomatoes.jpeg',
      category: 'vegetables',
    },
    {
      _id: '3',
      name: 'Carrots',
      description: 'Crunchy organic carrots.',
      price: 0.99,
      stock: 20,
      imageUrl: '/images/carrots.jpeg',
      category: 'vegetables',
    },
    {
      _id: '4',
      name: 'Bananas',
      description: 'Sweet and ripe bananas.',
      price: 1.5,
      stock: 100,
      imageUrl: '/images/bananas.jpeg',
      category: 'fruits',
    },
    {
      _id: '5',
      name: 'Cabbage',
      description: 'Fresh and crisp cabbage.',
      price: 1.2,
      stock: 40,
      imageUrl: '/images/cabbage.jpeg',
      category: 'vegetables',
    },
    {
      _id: '6',
      name: 'Kales',
      description: 'Nutritious and fresh kales.',
      price: 1.0,
      stock: 60,
      imageUrl: '/images/kales.jpeg',
      category: 'vegetables',
    },
    {
      _id: '7',
      name: 'Onions',
      description: 'Flavorful onions for cooking.',
      price: 0.8,
      stock: 70,
      imageUrl: '/images/onions.jpeg',
      category: 'vegetables',
    },
    {
      _id: '8',
      name: 'Pineapples',
      description: 'Sweet and juicy pineapples.',
      price: 2.5,
      stock: 20,
      imageUrl: '/images/pineapples.jpeg',
      category: 'fruits',
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulating a fetch from backend with sample products
        // Replace the following line with your actual backend request
        // const response = await axios.get('http://localhost:5000/api/products');
        // setProducts(response.data);
        
        // Using sample products for demonstration
        setProducts(sampleProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  },
);

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

  // Handle dragging of the cart icon
  useEffect(() => {
    const cartIcon = cartIconRef.current;
    const handleDrag = (e) => {
      e.preventDefault();
      cartIcon.style.left = `${e.clientX - 25}px`;
      cartIcon.style.top = `${e.clientY - 25}px`;
    };

    const handleMouseDown = (e) => {
      cartIcon.addEventListener('mousemove', handleDrag);
    };

    const handleMouseUp = () => {
      cartIcon.removeEventListener('mousemove', handleDrag);
    };

    cartIcon.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      cartIcon.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const navigateToCart = () => {
    navigate('/cart', { state: { cart } });
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
                src={product.imageUrl || '/images/default-product.jpg'} // Fallback image
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

      {/* Cart Icon */}
      <div
        id="cart-icon"
        ref={cartIconRef}
        className="cart-icon"
        onClick={navigateToCart}
        draggable="true"
      >
        🛒
      </div>
    </div>
  );
};

export default Marketplace;