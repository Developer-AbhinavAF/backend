import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// --- Route Imports ---
import movieRoutes from "./routes/movieRoutes.js";
import animeMovieRoutes from "./routes/animeMovieRoutes.js";
import animeSeriesRoutes from "./routes/animeSeriesRoutes.js";
import webSeriesRoutes from "./routes/webSeriesRoutes.js";
import likesRoutes from "./routes/likes.js";
import requestsRoutes from "./routes/requests.js";
import downloadsRoutes from "./routes/downloads.js";
import reviewsRoutes from "./routes/reviews.js";
import updatesRoutes from "./routes/updates.js";
import kDramaRoutes from "./routes/kDramaRoutes.js";
import cDramaRoutes from "./routes/cDramaRoutes.js";
import thaiDramaRoutes from "./routes/thaiDramaRoutes.js";
import japaneseDramaRoutes from "./routes/japaneseDramaRoutes.js";
import pakistaniDramaRoutes from "./routes/pakistaniDramaRoutes.js";

// --- App Init ---
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// --- Routes Mount ---
app.use("/api/movies", movieRoutes);
app.use("/api/animeMovie", animeMovieRoutes);
app.use("/api/animeSeries", animeSeriesRoutes);
// lowercase alias for some clients
app.use("/api/animeseries", animeSeriesRoutes);
app.use("/api/webSeries", webSeriesRoutes);
// lowercase alias for some clients
app.use("/api/webseries", webSeriesRoutes);
// New drama categories
app.use("/api/kDramas", kDramaRoutes);
app.use("/api/cDramas", cDramaRoutes);
app.use("/api/thaiDramas", thaiDramaRoutes);
app.use("/api/japaneseDramas", japaneseDramaRoutes);
app.use("/api/pakistaniDramas", pakistaniDramaRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/downloads", downloadsRoutes);
app.use("/api/reviews", reviewsRoutes);
// Mount under /api as well to support paths: /api/:collection/:slug/review, /api/:collection/:slug/download, /api/:collection/request
app.use("/api", reviewsRoutes);
app.use("/api", downloadsRoutes);
app.use("/api", requestsRoutes);
app.use("/api/updates", updatesRoutes);

// --- API Index ---
app.get("/api", (req, res) => {
  res.json({
    status: "ok",
    message: "API index",
    endpoints: {
      movies: "/api/movies",
      animeMovie: "/api/animeMovie",
      animeSeries: "/api/animeSeries",
      webSeries: "/api/webSeries",
      kDramas: "/api/kDramas",
      cDramas: "/api/cDramas",
      thaiDramas: "/api/thaiDramas",
      japaneseDramas: "/api/japaneseDramas",
      pakistaniDramas: "/api/pakistaniDramas",
      likes: "/api/likes",
      requests: "/api/requests",
      downloads: "/api/:collection/:slug/download",
      reviews: "/api/:collection/:slug/review",
      updates: "/api/updates"
    }
  });
});

// --- Default Health Check ---
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend API is running " });
});

// --- MongoDB Connect ---
mongoose
  .connect(process.env.MONGO_URI || "mongodb+srv://multiverseDB:W5HXJPLrbGe32Rdg@mern-cluster.zxbyya5.mongodb.net/", {
    dbName: process.env.DB_NAME || "SkyVeil",
  })
  .then(() => console.log("MongoDB connected "))
  .catch((err) => console.error("MongoDB connection error :", err));

// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
