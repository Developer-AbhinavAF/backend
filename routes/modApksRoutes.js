import express from "express";
import ModApk from "../models/ModApks.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { search, platform } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const query = {};
  if (search) query.title = { $regex: search, $options: "i" };
  if (platform) query.platform = platform;

  try {
    const results = await ModApk.find(query).skip(skip).limit(limit);
    const totalItems = await ModApk.countDocuments(query);

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
    const mod = await ModApk.findOne({ slug: req.params.slug });
    if (!mod) return res.status(404).json({ message: "Mod Not Found" });
    res.json(mod);
  } catch (err) {
    console.error("Error fetching mod:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;