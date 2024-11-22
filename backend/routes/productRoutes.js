const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description, stock } = req.body;
    const image = req.file ? req.file.path : null;

    const product = new Product({ name, price, category, description, stock, image });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', details: error.message });
  }
});

module.exports = router;