import mongoose from "mongoose";

const iosGameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, default: "iosGame" },
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
    iosVersion: String,
    device: [String]
  }
}, { timestamps: true });

export default mongoose.model("IOSGame", iosGameSchema);