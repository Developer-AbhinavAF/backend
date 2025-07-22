import mongoose from "mongoose";

const pcGameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, default: "pcGame" },
  description: String,
  thumbnail: String,
  poster: String,
  fileSize: String,
  rating: Number,
  tags: [String],
  releaseDate: String,
  developer: String,
  publisher: String,
  downloadLinks: {
    GoogleDrive: String,
    Mega: String,
    Mediafire: String,
    Torrent: String
  },
  systemRequirements: {
    minimum: {
      os: String,
      processor: String,
      memory: String,
      graphics: String,
      storage: String
    },
    recommended: {
      os: String,
      processor: String,
      memory: String,
      graphics: String,
      storage: String
    }
  }
}, { timestamps: true });

export default mongoose.model("PCGame", pcGameSchema);