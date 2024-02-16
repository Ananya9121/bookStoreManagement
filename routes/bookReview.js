const express = require('express');
const review = require('../controllers/bookReview');

const router = express.Router();

router.get('/bookReview',review.reviewBook);
router.post('/getAllReview',review.getAllReviews);

module.exports = router;
