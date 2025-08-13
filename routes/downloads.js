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

// Correct model references
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

// POST track download: /api/:collection/:slug/download
router.post('/:collection/:slug/download', async (req, res) => {
  const { collection, slug } = req.params;
  
  if (!models[collection]) {
    return res.status(400).json({ message: 'Invalid collection' });
  }

  try {
    const media = await models[collection].findOne({ slug });
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Initialize downloadCount if missing
    if (typeof media.downloadCount !== 'number') {
      media.downloadCount = 0;
    }
    media.downloadCount += 1;
    await media.save();
    
    res.json({ downloadCount: media.downloadCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;