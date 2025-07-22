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

const animeSeriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, default: "animeSeries" },
  description: String,
  thumbnail: String,
  poster: String,
  rating: Number,
  tags: [String],
  releaseDate: String,
  status: String,
  totalEpisodes: Number,
  studio: String,
  seasons: [seasonSchema],
  downloadable: Boolean
}, { timestamps: true });

export default mongoose.model("AnimeSeries", animeSeriesSchema);