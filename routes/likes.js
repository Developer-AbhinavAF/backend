import express from "express";
const router = express.Router();
import Movie from "../models/Movie.js";
import AnimeMovie from "../models/AnimeMovie.js";
import AnimeSeries from "../models/AnimeSeries.js";
import WebSeries from "../models/WebSeries.js";
import KDrama from "../models/KDrama.js";
import CDrama from "../models/CDrama.js";
import ThaiDrama from "../models/ThaiDrama.js";
import JapaneseDrama from "../models/JapaneseDrama.js";
import PakistaniDrama from "../models/PakistaniDrama.js";

// Available models only
const models = {
  movies: Movie,
  animeMovie: AnimeMovie,
  animeSeries: AnimeSeries,
  webSeries: WebSeries,
  kDramas: KDrama,
  cDramas: CDrama,
  thaiDramas: ThaiDrama,
  japaneseDramas: JapaneseDrama,
  pakistaniDramas: PakistaniDrama,
};

// POST update like status
// A. Frontend uses POST /api/likes with body
router.post('/', async (req, res) => {
  try {
    const { slug, type, liked } = req.body || {};
    if (!slug || !type) {
      return res.status(400).json({ message: 'slug and type are required' });
    }

    // Best-effort: if a matching model exists, update a transient likeCount field if present.
    const collection = type === 'movie' ? 'movies' : type; // allow 'movie' -> 'movies'
    const Model = models[collection];
    if (Model) {
      const media = await Model.findOne({ slug });
      if (media) {
        if (typeof media.likeCount !== 'number') media.likeCount = 0;
        media.likeCount = Math.max(0, media.likeCount + (liked ? 1 : -1));
        await media.save().catch(() => {}); // ignore save failures silently
        return res.json({ likeCount: media.likeCount });
      }
    }

    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// B. Backward-compatible: POST /api/likes/:collection/:slug
router.post('/:collection/:slug', async (req, res) => {
  const { collection, slug } = req.params;
  const { liked } = req.body || {};

  const Model = models[collection];
  if (!Model) {
    return res.status(400).json({ message: 'Invalid collection' });
  }

  try {
    const media = await Model.findOne({ slug });
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    if (typeof media.likeCount !== 'number') media.likeCount = 0;
    media.likeCount = Math.max(0, media.likeCount + (liked ? 1 : -1));
    await media.save();
    res.json({ likeCount: media.likeCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;