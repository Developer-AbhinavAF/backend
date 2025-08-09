import express from "express";
import ThaiDrama from "../models/ThaiDrama.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 100 } = req.query;
    const query = search ? { title: { $regex: search, $options: "i" } } : {};
    const data = await ThaiDrama.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({ results: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
