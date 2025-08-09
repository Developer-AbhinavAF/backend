import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

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
import kDramasRouter from "./routes/kDramas.js";
import cDramasRouter from "./routes/cDramas.js";
import thaiDramasRouter from "./routes/thaiDramas.js";
import japaneseDramasRouter from "./routes/japaneseDramas.js";

const app = express();

// Enhanced CORS configuration
// server.js
// server.js - Updated CORS configuration
const allowedOrigins = [
  'https://multiverse-backend.onrender.com/api/',
  'http://localhost:3000', // Add your actual frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST']
}));


app.use(express.json());
dotenv.config(); // Make sure to call this at the top

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI is not defined in environment variables.");
  process.exit(1);
}
// Connect to MongoDB with better error handling
// server.js
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority'
});

mongoose.connection.on('connecting', () => console.log('Connecting to MongoDB...'));
mongoose.connection.on('connected', () => console.log('MongoDB connected ✅'));
mongoose.connection.on('error', err => console.error('MongoDB connection error:', err));
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));
// Add request logging middleware
// Add this before routes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/animeMovie", animeMovieRoutes);
app.use("/api/animeSeries", animeSeriesRoutes);
app.use("/api/webSeries", webSeriesRoutes);
app.use("/api/updates", updatesRouter);
app.use("/api/requests", requestsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/downloads", downloadsRouter);
app.use("/api/kDramas", kDramasRouter);
app.use("/api/cDramas", cDramasRouter);
app.use("/api/thaiDramas", thaiDramasRouter);
app.use("/api/japaneseDramas", japaneseDramasRouter);

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
// server.js
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url}`, err);
  
  // Standard error response
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

const PORT = 5000;
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
