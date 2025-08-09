import express from "express";
const router = express.Router();
import Update from "../models/Update.js";

// GET all updates
router.get('/', async (req, res) => {
  try {
    const updates = await Update.find().sort({ date: -1 });
    res.json(updates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create an update
router.post('/', async (req, res) => {
  const update = new Update({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    mediaItems: req.body.mediaItems
  });

  try {
    const newUpdate = await update.save();
    res.status(201).json(newUpdate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;