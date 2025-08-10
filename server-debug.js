import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const loadRoute = async (path, routePath) => {
  try {
    const route = await import(path);
    console.log(`✅ Loaded route: ${routePath}`);
    return route.default;
  } catch (err) {
    console.error(`❌ Failed to load route: ${routePath} from ${path}`, err.message);
    return (req, res) => res.status(500).json({ error: `Route ${routePath} failed to load` });
  }
};

const app = express();
app.use(cors());
app.use(express.json());

const initRoutes = async () => {
  app.use("/api/movies", await loadRoute("./routes/movieRoutes.js", "/api/movies"));
  app.use("/api/animeMovie", await loadRoute("./routes/animeMovieRoutes.js", "/api/animeMovie"));
  app.use("/api/animeSeries", await loadRoute("./routes/animeSeriesRoutes.js", "/api/animeSeries"));
  app.use("/api/webSeries", await loadRoute("./routes/webSeriesRoutes.js", "/api/webSeries"));
  app.use("/api/kDramas", await loadRoute("./routes/kDramas.js", "/api/kDramas"));
  app.use("/api/cDramas", await loadRoute("./routes/cDramas.js", "/api/cDramas"));
  app.use("/api/thaiDramas", await loadRoute("./routes/thaiDramas.js", "/api/thaiDramas"));
  app.use("/api/japaneseDramas", await loadRoute("./routes/japaneseDramas.js", "/api/japaneseDramas"));
  app.use("/api/likes", await loadRoute("./routes/likes.js", "/api/likes"));
  app.use("/api/requests", await loadRoute("./routes/requests.js", "/api/requests"));
  app.use("/api/downloads", await loadRoute("./routes/downloads.js", "/api/downloads"));
  app.use("/api/reviews", await loadRoute("./routes/reviews.js", "/api/reviews"));
};

app.get("/", (req, res) => res.json({ status: "ok" }));

mongoose.connect(
  "mongodb+srv://multiverseDB:W5HXJPLrbGe32Rdg@mern-cluster.zxbyya5.mongodb.net/",
  { dbName: "gameverse" }
).then(() => console.log("MongoDB connected ✅"))
 .catch(err => console.error("MongoDB error ❌:", err));

const PORT = 5000;
initRoutes().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
});
