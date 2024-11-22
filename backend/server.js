const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan'); // For logging HTTP requests
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// Initialize the app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Log HTTP requests

// Configure CORS with specific options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only these HTTP methods
  credentials: true, // Allow cookies or authentication credentials
};
app.use(cors(corsOptions)); // Use configured CORS

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const orderRoutes = require('./routes/orderRoutes');
const messageRoutes = require('./routes/messageRoutes'); // Import message routes

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process on connection failure
  });

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/products', productRoutes); // Product management
app.use('/api/notifications', notificationRoutes); // Notifications
app.use('/api/orders', orderRoutes); // Orders
app.use('/api/messages', messageRoutes); // Message routes for community interactions

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (data) => {
    // Assuming Message is a Mongoose model
    const newMessage = new Message(data);
    await newMessage.save();
    io.emit('message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    message: 'Internal Server Error',
    details: err.message,
  });
});

// Fallback for Undefined Routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));