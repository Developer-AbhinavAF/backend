const express = require('express');
const router = express.Router();
const JapaneseDrama = require('../models/JapaneseDrama');

// GET all Japanese dramas with pagination
router.get('/', async (req, res) => {
  const { search } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const query = search ? { $text: { $search: search } } : {};

  try {
    const japaneseDramas = await JapaneseDrama.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await JapaneseDrama.countDocuments(query);

    res.json({
      japaneseDramas,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single Japanese drama by slug
router.get('/:slug', async (req, res) => {
  try {
    const japaneseDrama = await JapaneseDrama.findOne({ slug: req.params.slug });
    if (!japaneseDrama) return res.status(404).json({ message: 'Japanese drama not found' });
    res.json(japaneseDrama);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;