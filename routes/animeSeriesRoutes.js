import express from "express";
import AnimeSeries from "../models/AnimeSeries.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { search = "", page = 1, limit = 100 } = req.query;
  const skip = (page - 1) * limit;
  
  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
    ];
  }

  try {
    const [results, totalItems] = await Promise.all([
      AnimeSeries.find(query).skip(skip).limit(parseInt(limit)),
      AnimeSeries.countDocuments(query)
    ]);
    
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
    const series = await AnimeSeries.findOne({ slug: req.params.slug });
    if (!series) return res.status(404).json({ message: "Series Not Found" });
    res.json(series);
  } catch (err) {
    console.error("Error fetching series:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;