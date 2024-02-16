const express = require('express');
const user = require('../controllers/user');
const {signupValidator, loginValidator} = require('../validators/userValidator');

const router = express.Router();

router.post('/signup',signupValidator, user.signup);
router.post('/login',loginValidator, user.login);

module.exports = router;