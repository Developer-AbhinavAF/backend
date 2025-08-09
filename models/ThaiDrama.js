import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});
// ThaiDrama.js, KDrama.js, etc.
const dramaSchema = new mongoose.Schema({
  // Add these required fields
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, default: "thaiDrama" },
  description: String,
  thumbnail: String,
  rating: Number,
  tags: [String],
  releaseDate: Date,
  qualities: {
    "480p": qualitySchema,
    "720p": qualitySchema,
    "1080p": qualitySchema
  },
  seasons: [seasonSchema], // Add season structure
  downloadable: Boolean
}, { timestamps: true });

export default mongoose.model("ThaiDrama", dramaSchema);
