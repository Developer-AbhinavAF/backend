import express from "express";
const router = express.Router();
import KDrama from "../models/KDrama.js";
import CDrama from "../models/CDrama.js";
import JapaneseDrama from "../models/JapaneseDrama.js";
import ThaiDrama from "../models/ThaiDrama.js";

const models = {
  kDramas: KDrama,
  cDramas: CDrama,
  thaiDramas: ThaiDrama,
  japaneseDramas: JapaneseDrama
};

router.post('/:collection/:slug', async (req, res) => {
  const { collection, slug } = req.params;
  const { liked } = req.body;

  if (!models[collection]) {
    return res.status(400).json({ message: 'Invalid collection' });
  }

  try {
    const media = await models[collection].findOne({ slug });
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

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