import mongoose from "mongoose";

const modApkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, default: "modApk" },
  description: String,
  thumbnail: String,
  fileSize: String,
  rating: Number,
  tags: [String],
  platform: {
    type: String,
    enum: ["android", "ios", "pc"],
    default: "android"
  },
  originalApp: String,
  modFeatures: [String],
  version: String,
  downloadLinks: {
    GoogleDrive: String,
    Mediafire: String,
    Direct: String
  },
  requirements: {
    androidVersion: String,
    iosVersion: String,
    os: String
  }
}, { timestamps: true });

export default mongoose.model("ModApk", modApkSchema);