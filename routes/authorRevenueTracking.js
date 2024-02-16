const express = require('express');
const revenueTracking = require('../controllers/authorRevenueTracking');
const router = express.Router();

router.get('/revenue',revenueTracking.revenueTracking);

module.exports = router;
