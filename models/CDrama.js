import mongoose from "mongoose";

const qualitySchema = new mongoose.Schema({
  downloadUrl: String,
  fileSize: String,
  hindiUrl: String
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

// Episode schema with qualities
const episodeSchema = new mongoose.Schema({
  episodeNumber: { type: Number, required: true },
  title: { type: String, required: true },
  duration: String,
  downloadQualities: {
    "480p": { type: qualitySchema, default: undefined },
    "720p": { type: qualitySchema, default: undefined },
    "1080p": { type: qualitySchema, default: undefined }
  },
  streamQualities: {
    "480p": { type: qualitySchema, default: undefined },
    "720p": { type: qualitySchema, default: undefined },
    "1080p": { type: qualitySchema, default: undefined }
  }
}, { _id: false });

// Season schema
const seasonSchema = new mongoose.Schema({
  seasonNumber: { type: Number, required: true },
  episodes: { type: [episodeSchema], default: [] }
}, { _id: false });

const cDramaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, default: "cDramas" },
  description: String,
  thumbnail: String,
  poster: String,
  rating: { type: Number, default: null },
  tags: [String],
  releaseDate: Date,
  status: { type: String, enum: ["Ongoing", "Completed", "Hiatus", "Upcoming"], default: "Ongoing" },
  totalEpisodes: { type: Number, default: 0 },
  studio: String,
  seasons: { type: [seasonSchema], default: [] },
  reviews: [reviewSchema],
  downloadCount: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("CDrama", cDramaSchema);
