const express = require('express');
const Notification = require('../models/Notification');
const router = express.Router();

// Send a notification
router.post('/', async (req, res) => {
  try {
    const { message, recipient } = req.body;

    const notification = new Notification({ message, recipient });
    await notification.save();
    res.status(201).json({ message: 'Notification sent successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification', details: error.message });
  }
});

module.exports = router;