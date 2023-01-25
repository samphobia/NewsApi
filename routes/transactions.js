const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const transactionsController = require("../controller/transactions")

router.post('/transactionOut', transactionsController.transactioOut)