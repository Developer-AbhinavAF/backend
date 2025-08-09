import express from "express";
import CDrama from "../models/CDrama.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 100 } = req.query;
    const query = search ? { title: { $regex: search, $options: "i" } } : {};
    const data = await CDrama.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({ results: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
