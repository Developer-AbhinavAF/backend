import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  mediaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    required: true
  },
  slug: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['movie', 'game', 'anime', 'web']
  },
  liked: {
    type: Boolean,
    default: true
  },
  userIp: {
    type: String,
    required: true
  }
}, { 
  timestamps: true,
  expires: 60 * 60 * 24 * 30 // Automatically delete after 30 days
});

export default mongoose.model('Like', likeSchema);