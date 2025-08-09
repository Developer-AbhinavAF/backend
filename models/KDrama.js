import mongoose from "mongoose";

// Define qualitySchema if not imported
const qualitySchema = new mongoose.Schema({
  downloadUrl: String,
  fileSize: String,
  englishUrl: String,
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const episodeSchema = new mongoose.Schema({
  episodeNumber: Number,
  title: String,
  duration: String,
  downloadQualities: {
    "480p": qualitySchema,
    "720p": qualitySchema,
    "1080p": qualitySchema
  },
  streamQualities: {
    "480p": qualitySchema,
    "720p": qualitySchema,
    "1080p": qualitySchema
  }
}, { _id: false });

const seasonSchema = new mongoose.Schema({
  seasonNumber: Number,
  episodes: [episodeSchema]
}, { _id: false });
// ThaiDrama.js, KDrama.js, etc.
const dramaSchema = new mongoose.Schema({
  // Add these required fields
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, default: "KDrama" },
  description: String,
  thumbnail: String,
  rating: Number,
  tags: [String],
  releaseDate: Date,
  qualities: {
    "480p": qualitySchema,
    "720p": qualitySchema,
    "1080p": qualitySchema
  },
  seasons: [seasonSchema], // Add season structure
  downloadable: Boolean
}, { timestamps: true });

export default mongoose.model("KDrama", dramaSchema);
