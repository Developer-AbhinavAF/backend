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

// POST track download
// Update the POST handler:
router.post('/:collection/:slug', async (req, res) => {
  const { collection, slug } = req.params;
  
  if (!models[collection]) {
    return res.status(400).json({ message: 'Invalid collection' });
  }

  try {
    const media = await models[collection].findOne({ slug });
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Initialize downloads if missing
    if (typeof media.downloads === 'undefined') {
      media.downloads = 0;
    }
    
    media.downloads += 1;
    await media.save();
    
    res.json({ downloads: media.downloads });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;