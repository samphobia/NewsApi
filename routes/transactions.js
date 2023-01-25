const express = require('express');

const router = express.Router();

const transactionsController = require("../controllers/transactions")

router.post('/transactionOut', transactionsController.transactionOut)

module.exports = router;