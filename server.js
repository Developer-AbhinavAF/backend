import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import all routes
import movieRoutes from "./routes/movieRoutes.js";
import animeMovieRoutes from "./routes/animeMovieRoutes.js";
import animeSeriesRoutes from "./routes/animeSeriesRoutes.js";
import webSeriesRoutes from "./routes/webSeriesRoutes.js";
import updatesRouter from "./routes/updates.js";
import requestsRouter from "./routes/requests.js";
import likesRouter from "./routes/likes.js";
import reviewsRouter from "./routes/reviews.js";
import downloadsRouter from "./routes/downloads.js";
// ... existing imports ...

// Corrected import paths (case-sensitive)
import kDramasRouter from "./routes/kDramas.js";
import cDramasRouter from "./routes/cDramas.js";
import thaiDramasRouter from "./routes/thaiDramas.js";
import japaneseDramasRouter from "./routes/japaneseDramas.js";

// ... express setup ...

// Register all routes
app.use("/api/movies", movieRoutes);
app.use("/api/animeMovie", animeMovieRoutes);
app.use("/api/animeSeries", animeSeriesRoutes);
app.use("/api/webSeries", webSeriesRoutes);
app.use("/api/updates", updatesRouter);
app.use("/api/requests", requestsRouter);
app.use("/api/likes", likesRouter);  // Fixed registration
app.use("/api/reviews", reviewsRouter);
app.use("/api/downloads", downloadsRouter);
app.use("/api/kDramas", kDramasRouter);
app.use("/api/cDramas", cDramasRouter);
app.use("/api/thaiDramas", thaiDramasRouter);
app.use("/api/japaneseDramas", japaneseDramasRouter);

// ... rest of server.js ...

const app = express();

// Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://multiverse-frontend-tau.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

// Connect to MongoDB with better error handling
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

// Handle shutdown gracefully
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});