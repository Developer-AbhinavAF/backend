import mongoose from "mongoose";
import dotenv from "dotenv";

// Models
import Movie from "./models/Movie.js";
import KDrama from "./models/KDrama.js";
import CDrama from "./models/CDrama.js";
import ThaiDrama from "./models/ThaiDrama.js";
import JapaneseDrama from "./models/JapaneseDrama.js";
import PakistaniDrama from "./models/PakistaniDrama.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://multiverseDB:W5HXJPLrbGe32Rdg@mern-cluster.zxbyya5.mongodb.net/";
const DB_NAME = process.env.DB_NAME || "MultiverseDB";

const sampleQuality = {
  downloadUrl: "https://example.com/sample.mp4",
  fileSize: "1.2 GB",
  englishUrl: "https://example.com/sample-en.m3u8",
  hindiUrl: "https://example.com/sample-hi.m3u8"
};

const docs = {
  Movie: [
    {
      title: "Sample Movie",
      slug: "sample-movie",
      description: "A seeded sample movie.",
      thumbnail: "https://via.placeholder.com/300x170",
      poster: "https://via.placeholder.com/600x900",
      rating: 4.3,
      tags: ["sample", "movie"],
      genres: ["Action", "Drama"],
      qualities: { "720p": sampleQuality }
    }
  ],
  KDrama: [
    {
      title: "Sample K-Drama",
      slug: "sample-kdrama",
      description: "A seeded sample Korean drama.",
      thumbnail: "https://via.placeholder.com/300x170",
      poster: "https://via.placeholder.com/600x900",
      rating: 4.6,
      tags: ["kdrama"],
      genres: ["Romance"],
      qualities: { "720p": sampleQuality }
    }
  ],
  CDrama: [
    {
      title: "Sample C-Drama",
      slug: "sample-cdrama",
      description: "A seeded sample Chinese drama.",
      thumbnail: "https://via.placeholder.com/300x170",
      poster: "https://via.placeholder.com/600x900",
      rating: 4.1,
      tags: ["cdrama"],
      genres: ["Historical"],
      qualities: { "720p": sampleQuality }
    }
  ],
  ThaiDrama: [
    {
      title: "Sample Thai Drama",
      slug: "sample-thaidrama",
      description: "A seeded sample Thai drama.",
      thumbnail: "https://via.placeholder.com/300x170",
      poster: "https://via.placeholder.com/600x900",
      rating: 4.0,
      tags: ["thai"],
      genres: ["Thriller"],
      qualities: { "720p": sampleQuality }
    }
  ],
  JapaneseDrama: [
    {
      title: "Sample Japanese Drama",
      slug: "sample-japanesedrama",
      description: "A seeded sample Japanese drama.",
      thumbnail: "https://via.placeholder.com/300x170",
      poster: "https://via.placeholder.com/600x900",
      rating: 4.2,
      tags: ["japanese"],
      genres: ["Mystery"],
      qualities: { "720p": sampleQuality }
    }
  ],
  PakistaniDrama: [
    {
      title: "Sample Pakistani Drama",
      slug: "sample-pakistanidrama",
      description: "A seeded sample Pakistani drama.",
      thumbnail: "https://via.placeholder.com/300x170",
      poster: "https://via.placeholder.com/600x900",
      rating: 4.4,
      tags: ["pakistani"],
      genres: ["Family"],
      qualities: { "720p": sampleQuality }
    }
  ]
};

async function upsertArray(Model, items) {
  for (const item of items) {
    await Model.updateOne({ slug: item.slug }, { $set: item }, { upsert: true });
  }
}

async function run() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log("Connected to MongoDB (seed)");

    await upsertArray(Movie, docs.Movie);
    console.log("Seeded: movies");

    await upsertArray(KDrama, docs.KDrama);
    console.log("Seeded: kdramas");

    await upsertArray(CDrama, docs.CDrama);
    console.log("Seeded: cdramas");

    await upsertArray(ThaiDrama, docs.ThaiDrama);
    console.log("Seeded: thaidramas");

    await upsertArray(JapaneseDrama, docs.JapaneseDrama);
    console.log("Seeded: japanesedramas");

    await upsertArray(PakistaniDrama, docs.PakistaniDrama);
    console.log("Seeded: pakistanidramas");

    console.log("Seeding complete ✔");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
}

run();
