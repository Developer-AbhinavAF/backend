import mongoose from "mongoose";

const androidGameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, default: "androidGame" },
  description: String,
  thumbnail: String,
  fileSize: String,
  rating: Number,
  tags: [String],
  releaseDate: String,
  developer: String,
  version: String,
  downloadLinks: {
    GoogleDrive: String,
    Mediafire: String,
    Direct: String
  },
  requirements: {
    androidVersion: String,
    ram: String
  }
}, { timestamps: true });

export default mongoose.model("AndroidGames", androidGameSchema);

