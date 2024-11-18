const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;