import express from "express";
import ThaiDrama from "../models/ThaiDrama.js";

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
      ThaiDrama.find(query).skip(skip).limit(parseInt(limit)),
      ThaiDrama.countDocuments(query)
    ]);
    
    res.json({
      results,
      totalItems,
      totalPages: Math.ceil(totalItems / limit)
    });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;