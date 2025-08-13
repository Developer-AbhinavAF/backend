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

// POST add review at /:collection/:slug/review
router.post('/:collection/:slug/review', async (req, res) => {
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

    if (!Array.isArray(media.reviews)) media.reviews = [];
    media.reviews.push({
      userName,
      userEmail,
      rating: Number(rating),
      comment
    });

    // Update average rating
    const totalReviews = media.reviews.length || 1;
    const totalRating = media.reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0);
    media.rating = Number((totalRating / totalReviews).toFixed(1));

    const updatedMedia = await media.save();
    res.status(201).json(updatedMedia.reviews.slice(-1)[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;