const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  user: String,
  message: String,
  avatar: String, // Add avatar field
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;