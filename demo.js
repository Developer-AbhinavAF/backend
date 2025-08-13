// seed.js
import mongoose from "mongoose";
import JapaneseDrama from "./models/JapaneseDrama.js";
import CDrama from "./models/CDrama.js";
import KDrama from "./models/KDrama.js";
import ThaiDrama from "./models/ThaiDrama.js";

const MONGO_URI = "mongodb+srv://multiverseDB:W5HXJPLrbGe32Rdg@mern-cluster.zxbyya5.mongodb.net/gameverse";

const makeSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const dramasData = {
  JapaneseDrama: [
    { title: "Japanese Drama 1", description: "Sample JD 1", year: 2024 },
    { title: "Japanese Drama 2", description: "Sample JD 2", year: 2023 }
  ],
  CDrama: [
    { title: "Chinese Drama 1", description: "Sample CD 1", year: 2024 },
    { title: "Chinese Drama 2", description: "Sample CD 2", year: 2022 }
  ],
  KDrama: [
    { title: "Korean Drama 1", description: "Sample KD 1", year: 2024 },
    { title: "Korean Drama 2", description: "Sample KD 2", year: 2021 }
  ],
  ThaiDrama: [
    { title: "Thai Drama 1", description: "Sample TD 1", year: 2024 },
    { title: "Thai Drama 2", description: "Sample TD 2", year: 2020 }
  ]
};

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    await JapaneseDrama.deleteMany({});
    await CDrama.deleteMany({});
    await KDrama.deleteMany({});
    await ThaiDrama.deleteMany({});

    // Add slug automatically
    const withSlug = (items) => items.map(d => ({ ...d, slug: makeSlug(d.title) }));

    await JapaneseDrama.insertMany(withSlug(dramasData.JapaneseDrama));
    await CDrama.insertMany(withSlug(dramasData.CDrama));
    await KDrama.insertMany(withSlug(dramasData.KDrama));
    await ThaiDrama.insertMany(withSlug(dramasData.ThaiDrama));

    console.log("✅ Sample dramas added successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedData();
