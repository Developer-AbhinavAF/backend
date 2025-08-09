import express from "express";
import KDrama from "../models/KDrama.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { search = "", page = 1, limit = 100 } = req.query;
  
  // Convert to numbers
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
    ];
  }

  try {
    const results = await KDrama.find(query)
      .skip(skip)
      .limit(limitNum);
      
    const totalItems = await KDrama.countDocuments(query);

    res.json({
      results,
      totalItems,
      totalPages: Math.ceil(totalItems / limitNum),
      currentPage: pageNum
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
