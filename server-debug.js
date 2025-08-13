// server-debug.js
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// MongoDB connect
const MONGO_URI = "mongodb+srv://multiverseDB:W5HXJPLrbGe32Rdg@mern-cluster.zxbyya5.mongodb.net/gameverse";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connect error:", err));

// Helper to load routes with debug logs
const loadRoute = async (pathName, mountPath) => {
  try {
    const route = (await import(pathName)).default;
    app.use(mountPath, route);
    console.log(`✅ Mounted: ${mountPath} from ${pathName}`);
  } catch (err) {
    console.error(`❌ Failed to load ${mountPath} from ${pathName}`, err.message);
  }
};

// Wrap all route loads in an async function
async function init() {
  await loadRoute("./routes/cDramas.js", "/api/cDramas");
  await loadRoute("./routes/kDramas.js", "/api/kDramas");
  await loadRoute("./routes/japaneseDramas.js", "/api/japaneseDramas");
  await loadRoute("./routes/thaiDramas.js", "/api/thaiDramas");
  await loadRoute("./routes/movieRoutes.js", "/api/movies");
  await loadRoute("./routes/animeMovieRoutes.js", "/api/animeMovie");
  await loadRoute("./routes/animeSeriesRoutes.js", "/api/animeSeries");
  await loadRoute("./routes/webSeriesRoutes.js", "/api/webSeries");
  await loadRoute("./routes/likes.js", "/api/likes");
  await loadRoute("./routes/requests.js", "/api/requests");
  await loadRoute("./routes/downloads.js", "/api/downloads");
  await loadRoute("./routes/reviews.js", "/api/reviews");

  // Route existence test
  app.use((req, res) => {
    console.log(`⚠️ No route matched for: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: "Endpoint not found" });
  });

  const PORT = 5000;
  app.listen(PORT, () => console.log(`🚀 Debug server running on port ${PORT}`));
}

// Start app
init();
