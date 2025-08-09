import mongoose from "mongoose";

const mediaItemSchema = new mongoose.Schema({
  title: String,
  slug: String,
  type: String,
  thumbnail: String
});

const updateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: String,
  link: String,
  mediaItems: [mediaItemSchema]
});

export default mongoose.model('Update', updateSchema);