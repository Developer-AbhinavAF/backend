import express from "express";
const router = express.Router();
import Request from "../models/Request.js";

// POST create a request
router.post('/', async (req, res) => {
  const request = new Request({
    name: req.body.name,
    email: req.body.email,
    requestType: req.body.requestType,
    message: req.body.message
  });

  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;