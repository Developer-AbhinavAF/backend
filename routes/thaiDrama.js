const express = require('express');
const router = express.Router();
const ThaiDrama = require('../models/ThaiDrama');

// GET all Thai dramas with pagination
router.get('/', async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const query = search ? { $text: { $search: search } } : {};

  try {
    const thaiDramas = await ThaiDrama.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await ThaiDrama.countDocuments(query);

    res.json({
      thaiDramas,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single Thai drama by slug
router.get('/:slug', async (req, res) => {
  try {
    const thaiDrama = await ThaiDrama.findOne({ slug: req.params.slug });
    if (!thaiDrama) return res.status(404).json({ message: 'Thai drama not found' });
    res.json(thaiDrama);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;