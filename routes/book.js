const express = require('express');

const router = express.Router();

const books = require('../controllers/book');
const adminAuth = require('../middlewares/adminAuth');
const auth = require('../middlewares/userAuth');


const { validateBookData } = require('../validators/bookValidator');

router.post('/createBook',validateBookData,auth,adminAuth, books.createBook);
router.patch('/updateBook',auth,adminAuth, books.updateBook);
router.delete('/delete',auth,adminAuth, books.deleteBook);
router.get("/getAllBooks",books.getAllBooks);
router.get("/getBookById",books.getBookById);
router.post("/purchaseBook",books.purchaseBook);
router.patch("/updateSellCountOnPurchase",books.updateSellCountOnPurchase);
router.post("/searchBook",books.searchBook);
router.post("/filterBook",books.filterBook);

module.exports = router;