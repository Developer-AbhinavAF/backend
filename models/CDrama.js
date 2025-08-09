import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});
const dramaSchema = new mongoose.Schema({
  title: String,
  slug: String,
  type: String,
  thumbnail: String,
  description: String,
  rating: Number,
  releaseDate: Date,
  tags: [String],
  qualities: mongoose.Schema.Types.Mixed,
  seasons: mongoose.Schema.Types.Mixed,
  likes: Number,
  reviews: [reviewSchema]
}, { timestamps: true });

export default mongoose.model("CDrama", dramaSchema);
