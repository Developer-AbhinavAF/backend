import mongoose from "mongoose";

const pcAppSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, default: "pcApp" },
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
    Mega: String,
    Mediafire: String
  },
  systemRequirements: {
    os: String,
    processor: String,
    memory: String,
    storage: String
  }
}, { timestamps: true });

export default mongoose.model("PCApp", pcAppSchema);