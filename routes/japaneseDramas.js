import express from "express";
import JapaneseDrama from "../models/JapaneseDrama.js";

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
      JapaneseDrama.find(query).skip(skip).limit(parseInt(limit)),
      JapaneseDrama.countDocuments(query)
    ]);
    res.json({
      results,
      totalItems,
      totalPages: Math.ceil(totalItems / limit)
    });
  } catch (err) {
    console.error("Fetch Error (JapaneseDramas):", err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const drama = await JapaneseDrama.findOne({ slug: req.params.slug });
    if (!drama) return res.status(404).json({ message: "Drama Not Found" });
    res.json(drama);
  } catch (err) {
    console.error("Error fetching drama:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
