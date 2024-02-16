const express = require('express');
const purchaseHistory = require('../controllers/bookPurchaseHistory');

const router = express.Router();

router.get('/purchaseHistory',purchaseHistory.purchaseHistory);
router.post('/addPurchaseHistory',purchaseHistory.addPurchaseHistory);

module.exports = router;
