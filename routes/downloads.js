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
// downloads.js
router.post('/:collection/:slug', async (req, res) => {
  try {
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

module.exports = router;