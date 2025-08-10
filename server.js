// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// CORS - read from env or fallback
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000,https://multiverse-frontend-tau.vercel.app")
  .split(",")
  .map(s => s.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// DB connect (non-fatal if missing)
const uri = process.env.MONGO_URI;
if (uri) {
  // Pehle ye hoga
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Ab bas simple likho
  mongoose.connect(uri)
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.error(err));

} else {
  console.warn("⚠️  MONGO_URI not provided. Starting without DB (dev mode).");
}

// Import routers AFTER express app created
import moviesRouter from "./routes/movieRoutes.js";
import animeMovieRouter from "./routes/animeMovieRoutes.js";
import animeSeriesRouter from "./routes/animeSeriesRoutes.js";
import webSeriesRouter from "./routes/webSeriesRoutes.js";
import kDramasRouter from "./routes/kDramas.js";
import cDramasRouter from "./routes/cDramas.js";
import thaiDramasRouter from "./routes/thaiDramas.js";
import japaneseDramasRouter from "./routes/japaneseDramas.js";

app.use("/api/movies", moviesRouter);
app.use("/api/animeMovie", animeMovieRouter);
app.use("/api/animeSeries", animeSeriesRouter);
app.use("/api/webSeries", webSeriesRouter);
app.use("/api/kDramas", kDramasRouter);
app.use("/api/cDramas", cDramasRouter);
app.use("/api/thaiDramas", thaiDramasRouter);
app.use("/api/japaneseDramas", japaneseDramasRouter);

// health
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// 404
app.use((req, res) => res.status(404).json({ error: "Endpoint not found" }));

// error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server listening on port ${PORT}`));
