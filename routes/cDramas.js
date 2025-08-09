const express = require('express');
const router = express.Router();
const CDrama = require('../models/CDrama');

// GET all Chinese dramas with pagination
router.get('/', async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const query = search ? { $text: { $search: search } } : {};

  try {
    const cDramas = await CDrama.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await CDrama.countDocuments(query);

    res.json({
      cDramas,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single Chinese drama by slug
router.get('/:slug', async (req, res) => {
  try {
    const cDrama = await CDrama.findOne({ slug: req.params.slug });
    if (!cDrama) return res.status(404).json({ message: 'Chinese drama not found' });
    res.json(cDrama);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;