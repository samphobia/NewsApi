const express = require('express');

const router = express.Router();

const transactionsController = require("../controllers/transactions")

/**
 * @swagger
 * tags:
 *  name: Transactions
 *  description: Transactions microservices
 */

/**
 * @swagger
 * /transaction/transactionOut:
 *  post:
 *    summary: transfer Funds
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *              transactionTo:
 *                type: string
 *              amount:
 *                type: string
 *    tags: [Transactions]
 *    responses: 
 *      200:
 *        description: Transfer successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      400:
 *        description: Transfer Declined
 * 
 */

router.post('/transactionOut', transactionsController.transactionOut)

module.exports = router;