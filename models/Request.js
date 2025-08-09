import mongoose from "mongoose";

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

export default mongoose.model('Request', requestSchema);