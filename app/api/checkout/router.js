const express = require('express');
const { auth } = require('../../middleware/auth');
const { checkout } = require('./controller');
const router = express.Router();

router.post('/checkouts', auth, checkout);

module.exports = router;
