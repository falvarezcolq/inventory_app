const { Router } = require("express");
let router = Router();

const Reviews = require("../models/reviews.js");

// GET all reviews
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Reviews.findAll({ where: { active: true } });
    const serializedReviews = reviews.map(review => serialize(review));
    res.status(200).json({ code: 1, message: "OK", content: serializedReviews });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// Serialize review data
function serialize(review) {
  return {
    review_id: review.review_id,
    title: review.title,
    content: review.content,
    created_at: review.created_at,
    updated_at: review.updated_at,
  };
}

// GET a specific review by ID
router.get("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Reviews.findOne({
      where: {
        review_id: id
      }
    });
    if (review) {
      res.status(200).json({ code: 1, message: "OK", content: review });
    } else {
      res.status(404).json({ code: 0, message: "Review not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// CREATE a new review
router.post("/reviews", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newReview = await Reviews.create({
      title,
      content,
    });
    res.status(201).json({ code: 1, message: "Review created successfully", content: newReview });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// UPDATE a review
router.put("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedReview = await Reviews.update(
      { title, content },
      {
        where: {
          review_id: id
        }
      }
    );
    if (updatedReview[0] === 1) {
      res.status(200).json({ code: 1, message: "Review updated successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Review not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

// DELETE a review
router.delete("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Reviews.destroy({
      where: {
        review_id: id
      }
    });
    if (deletedReview === 1) {
      res.status(200).json({ code: 1, message: "Review deleted successfully", content: "" });
    } else {
      res.status(404).json({ code: 0, message: "Review not found", content: "" });
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Error en consulta", content: "" });
  }
});

module.exports = router;