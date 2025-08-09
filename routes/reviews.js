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

// POST add review
router.post('/:collection/:slug', async (req, res) => {
  const { collection, slug } = req.params;
  const { userName, userEmail, rating, comment } = req.body;

  if (!models[collection]) {
    return res.status(400).json({ message: 'Invalid collection' });
  }

  try {
    const media = await models[collection].findOne({ slug });
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    media.reviews.push({
      userName,
      userEmail,
      rating,
      comment
    });

    // Update average rating
    const totalReviews = media.reviews.length;
    const totalRating = media.reviews.reduce((sum, review) => sum + review.rating, 0);
    media.rating = totalRating / totalReviews;

    const updatedMedia = await media.save();
    res.status(201).json(updatedMedia.reviews.slice(-1)[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;