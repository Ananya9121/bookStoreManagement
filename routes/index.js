const express = require('express');

const user = require('./user');
const book = require('./book');
const purchaseHistory = require('./bookPurchaseHistory');
const revenueTracking = require('./authorRevenueTracking');
const bookReview = require('./bookReview');

const router = express.Router();
router.use('/user', user);
router.use('/book', book);
router.use('/purchaseHistory', purchaseHistory);
router.use('/revenueTracking', revenueTracking);
router.use('/bookReview', bookReview);


module.exports = router;
