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