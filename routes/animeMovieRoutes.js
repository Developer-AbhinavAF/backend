import express from "express";
import AnimeMovie from "../models/AnimeMovie.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { search } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const query = {};
  if (search) query.title = { $regex: search, $options: "i" };

  try {
    const results = await AnimeMovie.find(query).skip(skip).limit(limit);
    const totalItems = await AnimeMovie.countDocuments(query);

    res.json({
      results,
      totalItems,
      totalPages: Math.ceil(totalItems / limit)
    });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const movie = await AnimeMovie.findOne({ slug: req.params.slug });
    if (!movie) return res.status(404).json({ message: "Movie Not Found" });
    res.json(movie);
  } catch (err) {
    console.error("Error fetching movie:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;