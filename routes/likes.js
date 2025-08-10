import express from "express";
const router = express.Router();
import mongoose from "mongoose";

// Correct model references
const models = {
  movies: mongoose.model('Movie'),
  animeMovie: mongoose.model('AnimeMovie'),
  animeSeries: mongoose.model('AnimeSeries'),
  webSeries: mongoose.model('WebSeries'),
  kDramas: mongoose.model('KDrama'),
  cDramas: mongoose.model('CDrama'),
  thaiDramas: mongoose.model('ThaiDrama'),
  japaneseDramas: mongoose.model('JapaneseDrama')
};

// POST update like status
// Update the POST handler:
router.post('/:collection/:slug', async (req, res) => {
  const { collection, slug } = req.params;
  const { liked } = req.body;

  if (!models[collection]) {
    return res.status(400).json({ message: 'Invalid collection' });
  }

  try {
    const media = await models[collection].findOne({ slug });
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

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