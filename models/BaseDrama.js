// models/BaseDrama.js
import mongoose from "mongoose";

const qualitySchema = new mongoose.Schema({
  downloadUrl: String,
  fileSize: String,
  englishUrl: String,
  hindiUrl: String
}, { _id: false });

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

const reviewSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

export function createDramaModel(name, defaultType) {
  const dramaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, default: defaultType },
    thumbnail: String,
    description: String,
    rating: Number,
    releaseDate: Date,
    tags: [String],
    seasons: [seasonSchema],
    likes: { type: Number, default: 0 },
    reviews: [reviewSchema],
    downloadable: Boolean,
    downloadCount: { type: Number, default: 0 }
  }, { timestamps: true });

  return mongoose.models[name] || mongoose.model(name, dramaSchema);
}
