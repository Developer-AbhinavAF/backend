const express = require('express');
const router = express.Router();
const KDrama = require('../models/KDrama');

// GET all kDramas with pagination
router.get('/', async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const query = search ? { $text: { $search: search } } : {};

  try {
    const kDramas = await KDrama.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await KDrama.countDocuments(query);

    res.json({
      kDramas,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single kDrama by slug
router.get('/:slug', async (req, res) => {
  try {
    const kDrama = await KDrama.findOne({ slug: req.params.slug });
    if (!kDrama) return res.status(404).json({ message: 'kDrama not found' });
    res.json(kDrama);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;