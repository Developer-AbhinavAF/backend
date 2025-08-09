const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  requestType: { 
    type: String,
    enum: ['content', 'feature', 'suggestion'],
    default: 'content'
  },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);