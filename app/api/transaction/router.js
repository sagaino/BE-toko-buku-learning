const express = require("express");
const router = express.Router();
const { auth } = require('../../middleware/auth');
const { getTransactionList, getDetailTransaction } = require("./controller");

router.get("/transactions", auth, getTransactionList);
router.get("/detailtrasactions", auth, getDetailTransaction);

module.exports = router;
