import mongoose from "mongoose";

const androidAppSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, default: "androidApp" },
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
    androidVersion: String
  }
}, { timestamps: true });

export default mongoose.model("AndroidApp", androidAppSchema);