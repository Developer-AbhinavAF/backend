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
router.post('/', async (req, res) => {
  const { mediaId, slug, type, liked } = req.body;
  
  if (!models[type]) {
    return res.status(400).json({ message: 'Invalid media type' });
  }

  try {
    const media = await models[type].findOne({ 
      $or: [{ _id: mediaId }, { slug: slug }] 
    });
    
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    if (liked) {
      media.likes += 1;
    } else if (media.likes > 0) {
      media.likes -= 1;
    }

    const updatedMedia = await media.save();
    res.json({ 
      likes: updatedMedia.likes,
      mediaId: updatedMedia._id,
      slug: updatedMedia.slug
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;