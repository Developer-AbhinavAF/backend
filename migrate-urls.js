import mongoose from "mongoose";
import Media from "./models/Movie.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = "mongodb://localhost:27017/multiverseDB";

async function migrateUrls() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Movies and Anime Movies
    await Media.updateMany(
      { $or: [{ type: "movie" }, { type: "animeMovie" }] },
      [
        {
          $set: {
            "qualities.480p.englishUrl": "$qualities.480p.embedUrl",
            "qualities.480p.hindiUrl": "$qualities.480p.embedUrl",
            "qualities.720p.englishUrl": "$qualities.720p.embedUrl",
            "qualities.720p.hindiUrl": "$qualities.720p.embedUrl",
            "qualities.1080p.englishUrl": "$qualities.1080p.embedUrl",
            "qualities.1080p.hindiUrl": "$qualities.1080p.embedUrl"
          }
        },
        {
          $unset: [
            "qualities.480p.embedUrl",
            "qualities.480p.languages",
            "qualities.720p.embedUrl",
            "qualities.720p.languages",
            "qualities.1080p.embedUrl",
            "qualities.1080p.languages"
          ]
        }
      ]
    );

    // AnimeSeries & WebSeries (Manual iteration)
    const seriesDocs = await Media.find({ $or: [{ type: "animeSeries" }, { type: "webSeries" }] });

    for (const doc of seriesDocs) {
      for (const season of doc.seasons || []) {
        for (const episode of season.episodes || []) {
          for (const quality of ["480p", "720p", "1080p"]) {
            const q = episode.qualities?.[quality];
            if (q && q.embedUrl) {
              q.englishUrl = q.embedUrl;
              q.hindiUrl = q.embedUrl;
              delete q.embedUrl;
              delete q.languages;
            }
          }
        }
      }
      await doc.save();
    }

    console.log("URL migration successful!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrateUrls();
