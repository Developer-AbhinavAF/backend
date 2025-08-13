import mongoose from "mongoose";

const qualitySchema = new mongoose.Schema({
  downloadUrl: String,
  fileSize: String,
  englishUrl: String,
  hindiUrl: String
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const pakistaniDramaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  thumbnail: String,
  poster: String,
  rating: Number,
  tags: [String],
  releaseDate: Date,
  duration: String,
  language: String,
  director: String,
  studio: String,
  genres: [String],
  cast: [String],
  qualities: {
    "480p": qualitySchema,
    "720p": qualitySchema,
    "1080p": qualitySchema
  },
  reviews: [reviewSchema],
  downloadCount: { type: Number, default: 0 },
  type: { type: String, default: "pakistaniDramas" }
}, { timestamps: true });

export default mongoose.model("PakistaniDrama", pakistaniDramaSchema);
