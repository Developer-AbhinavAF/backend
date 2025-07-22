import express from "express";
import Movie from "../models/Movie.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Email configuration (replace with your actual email credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.get("/", async (req, res) => {
  const { search } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const query = {};
  if (search) query.title = { $regex: search, $options: "i" };

  try {
    const results = await Movie.find(query).skip(skip).limit(limit);
    const totalItems = await Movie.countDocuments(query);

    res.json({
      results,
      totalItems,
      totalPages: Math.ceil(totalItems / limit)
    });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const movie = await Movie.findOne({ slug: req.params.slug });
    if (!movie) return res.status(404).json({ message: "Movie Not Found" });
    
    // Increment view count
    movie.views = (movie.views || 0) + 1;
    await movie.save();
    
    res.json(movie);
  } catch (err) {
    console.error("Error fetching movie:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/:slug/review", async (req, res) => {
  try {
    const { slug } = req.params;
    const { userName, userEmail, rating, comment } = req.body;

    const movie = await Movie.findOne({ slug });
    if (!movie) return res.status(404).json({ message: "Movie Not Found" });

    // Add new review
    movie.reviews.push({
      userName,
      userEmail,
      rating,
      comment
    });

    await movie.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Review for ${movie.title}`,
      text: `User: ${userName} (${userEmail})\nRating: ${rating}/5\nComment: ${comment}\n\nMovie: ${movie.title}`
    };

    transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/request", async (req, res) => {
  try {
    const { name, email, requestType, message } = req.body;

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Content Request: ${requestType}`,
      text: `From: ${name} (${email})\nRequest Type: ${requestType}\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Request submitted successfully" });
  } catch (err) {
    console.error("Error submitting request:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Track downloads
router.post("/:slug/download", async (req, res) => {
  try {
    const { slug } = req.params;
    const { quality } = req.body;

    const movie = await Movie.findOne({ slug });
    if (!movie) return res.status(404).json({ message: "Movie Not Found" });

    // Increment download count
    movie.downloadCount = (movie.downloadCount || 0) + 1;
    
    // Track specific quality download if provided
    if (quality && movie.qualities[quality]) {
      movie.qualities[quality].downloadCount = 
        (movie.qualities[quality].downloadCount || 0) + 1;
    }

    await movie.save();
    res.status(200).json({ message: "Download tracked" });
  } catch (err) {
    console.error("Error tracking download:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;