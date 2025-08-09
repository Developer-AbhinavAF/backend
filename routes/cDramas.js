import express from "express";
import CDrama from "../models/CDrama.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 100 } = req.query;
    const skip = (page - 1) * limit;
    const query = search ? { title: { $regex: search, $options: "i" } } : {};
    
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
    res.status(500).json({ error: err.message });
  }
});

export default router;
