import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css';

function ProductForm() {
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    description: '',
    stock: 0,
    category: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', productData);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="number" name="stock" placeholder="Stock" onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} />
      <input type="text" name="image" placeholder="Image URL" onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;