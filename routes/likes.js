import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import KDrama from "../models/KDrama.js";
import CDrama from "../models/CDrama.js";
import JapaneseDrama from "../models/JapaneseDrama.js";
import ThaiDrama from "../models/ThaiDrama.js";

// POST update like status
// likes.js
router.post('/', async (req, res) => {
  try {
    // Initialize likes if missing
    if (typeof media.likes === 'undefined') {
      media.likes = 0;
    }
    
    if (liked) {
      media.likes += 1;
    } else if (media.likes > 0) {
      media.likes -= 1;
    }

    await media.save();
    res.json({ likes: media.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;