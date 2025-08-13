import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// --- Route Imports ---
import movieRoutes from "./routes/movieRoutes.js";
import animeMovieRoutes from "./routes/animeMovieRoutes.js";
import animeSeriesRoutes from "./routes/animeSeriesRoutes.js";
import webSeriesRoutes from "./routes/webSeriesRoutes.js";
import kDramasRoutes from "./routes/kDramas.js";
import cDramasRoutes from "./routes/cDramas.js";
import thaiDramasRoutes from "./routes/thaiDramas.js";
import japaneseDramasRoutes from "./routes/japaneseDramas.js";
import likesRoutes from "./routes/likes.js";
import requestsRoutes from "./routes/requests.js";
import downloadsRoutes from "./routes/downloads.js";
import reviewsRoutes from "./routes/reviews.js";

// --- App Init ---
const app = express();
app.use(cors());
app.use(express.json());

// --- Routes Mount ---
app.use("/api/movies", movieRoutes);
app.use("/api/animeMovie", animeMovieRoutes);
app.use("/api/animeSeries", animeSeriesRoutes);
app.use("/api/webSeries", webSeriesRoutes);
console.log("✅ kDramas route loaded");
app.use("/api/kDramas", kDramasRoutes);

app.use("/api/cDramas", cDramasRoutes);
app.use("/api/thaiDramas", thaiDramasRoutes);
app.use("/api/japaneseDramas", japaneseDramasRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/downloads", downloadsRoutes);
app.use("/api/reviews", reviewsRoutes);

// --- Default Health Check ---
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend API is running ✅" });
});

router.get("/", async (req, res) => {
  console.log("📥 cDramas hit hua");
  const data = await CDrama.find();
  res.json(data);
});


// --- MongoDB Connect ---
mongoose
  .connect("mongodb+srv://multiverseDB:W5HXJPLrbGe32Rdg@mern-cluster.zxbyya5.mongodb.net/", {
    dbName: "SkyVeil",
  })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error ❌:", err));

// --- Server Start ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
