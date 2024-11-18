const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create a new notification
router.post('/', async (req, res) => {
  const { message, recipient } = req.body;
  try {
    const newNotification = new Notification({ message, recipient });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Notification creation failed' });
  }
});

module.exports = router;