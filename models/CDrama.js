const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  episodeNumber: Number,
  title: String,
  description: String,
  duration: String,
  thumbnail: String,
  downloadQualities: {
    "480p": { downloadUrl: String, fileSize: String },
    "720p": { downloadUrl: String, fileSize: String },
    "1080p": { downloadUrl: String, fileSize: String }
  },
  streamQualities: {
    "480p": { 
      englishUrl: String,
    },
    "720p": { 
      englishUrl: String,
    },
    "1080p": { 
      englishUrl: String,
    }
  }
});

const seasonSchema = new mongoose.Schema({
  seasonNumber: Number,
  episodes: [episodeSchema]
});

const cDramaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  thumbnail: String,
  genres: [String],
  releaseDate: Date,
  rating: Number,
  type: { type: String, default: 'cDrama' },
  seasons: [seasonSchema],
  tags: [String],
  likes: { type: Number, default: 0 },
  reviews: [{
    userName: String,
    userEmail: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  downloads: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
});

kDramaSchema.index({ title: 'text', description: 'text' });
module.exports = mongoose.model('CDrama', cDramaSchema);