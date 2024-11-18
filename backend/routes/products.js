const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/products');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Add Product Route with image upload
router.post('/', upload.single('image'), async (req, res) => {
  const { name, price, category, description, stock } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newProduct = new Product({ name, price, category, description, stock, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Product creation failed' });
  }
});

module.exports = router;