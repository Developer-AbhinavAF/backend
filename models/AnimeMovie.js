import mongoose from "mongoose";

const qualitySchema = new mongoose.Schema({
  downloadUrl: String,
  fileSize: String,
  englishUrl: String,
  hindiUrl: String
}, { _id: false });

const animeMovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, default: "animeMovie" },
  description: String,
  thumbnail: String,
  poster: String,
  fileSize: String,
  rating: Number,
  tags: [String],
  releaseDate: String,
  duration: String,
  language: String,
  director: String,
  studio: String,
  qualities: {
    "480p": qualitySchema,
    "720p": qualitySchema,
    "1080p": qualitySchema
  },
  downloadCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("AnimeMovie", animeMovieSchema);