import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  // Accept any request type (e.g., movies, animeMovie, feature, suggestion, etc.)
  requestType: {
    type: String,
    default: 'content'
  },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Request', requestSchema);