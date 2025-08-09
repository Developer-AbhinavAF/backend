const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
router.post('/:collection/:slug', async (req, res) => {
  const { collection, slug } = req.params;
  const { quality } = req.body;

  if (!models[collection]) {
    return res.status(400).json({ message: 'Invalid collection' });
  }

  try {
    const media = await models[collection].findOne({ slug });
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    media.downloads += 1;
    const updatedMedia = await media.save();
    
    res.json({ 
      downloads: updatedMedia.downloads,
      mediaId: updatedMedia._id,
      slug: updatedMedia.slug
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;